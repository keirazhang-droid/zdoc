import {afterEach, describe, it, expect, vi} from 'vitest';

async function importCatalog() {
  return import('./catalog.js');
}

afterEach(() => {
  vi.doUnmock('node:fs');
  vi.resetModules();
});

describe('policy catalog', () => {
  it('loads zilliz-cli pilot intents', async () => {
    const {loadTopicPolicies} = await importCatalog();
    const policies = loadTopicPolicies('zilliz-cli');
    expect(policies.length).toBe(4);
    expect(policies.map(p => p.intent_id).sort()).toEqual([
      'zcli_agent_skill_setup',
      'zcli_get_started_in_minutes',
      'zcli_roadmap_feedback',
      'zcli_usage_patterns',
    ]);
  });

  it('loads on-demand-search policy intents', async () => {
    const {loadTopicPolicies} = await importCatalog();
    const policies = loadTopicPolicies('on-demand-search');
    expect(policies.length).toBe(4);
    expect(policies.map(p => p.intent_id).sort()).toEqual([
      'ods_cost_vs_serverless',
      'ods_cost_vs_serving_cluster',
      'ods_fit_infrequent_batch',
      'ods_limitations',
    ]);
  });

  it('loads vector-lakebase policy intents', async () => {
    const {loadTopicPolicies} = await importCatalog();
    const policies = loadTopicPolicies('vector-lakebase');

    expect(policies.length).toBe(4);
    expect(policies.map(p => p.intent_id).sort()).toEqual([
      'vector_database_vs_vector_lakebase_difference',
      'vector_lakebase_best_fit_use_cases',
      'vector_lakebase_definition',
      'vector_lakebase_only_need_vector_db',
    ]);
  });

  it('ensures vector-lakebase fallback responses satisfy must_include', async () => {
    const {loadTopicPolicies} = await importCatalog();
    const policies = loadTopicPolicies('vector-lakebase').filter(policy => policy.fallback_response);

    const normalizeForValidator = (text: string) => text.toLowerCase().replace(/\s+/g, ' ').trim();

    for (const policy of policies) {
      const fallbackResponse = normalizeForValidator(policy.fallback_response!);
      for (const phrase of policy.must_include) {
        expect(fallbackResponse).toContain(normalizeForValidator(phrase));
      }
    }
  });

  it('loads configured trigger_phrases from policy yaml', async () => {
    const {loadTopicPolicies} = await importCatalog();
    const policies = loadTopicPolicies('on-demand-search');
    const limitations = policies.find(p => p.intent_id === 'ods_limitations');

    expect(limitations?.trigger_phrases).toContain('what are the limitations of on-demand search');
  });

  it('loads optional fallback_response from policy yaml', async () => {
    vi.doMock('node:fs', () => ({
      readFileSync: vi.fn(() => `policies:\n  - intent_id: with-fallback\n    fixed_facts: []\n    must_include: []\n    must_not_say: []\n    fallback_response: keep this exact fallback\n    style:\n      language: same as user\n      tone: concise\n`),
    }));

    const {loadTopicPolicies} = await importCatalog();
    const policies = loadTopicPolicies('fallback-topic');

    expect(policies).toHaveLength(1);
    expect(policies[0].fallback_response).toBe('keep this exact fallback');
  });

  it('returns null when intent does not exist', async () => {
    const {loadTopicPolicies, getPolicyByIntent} = await importCatalog();
    loadTopicPolicies('zilliz-cli');
    expect(getPolicyByIntent('zilliz-cli', 'unknown_intent')).toBeNull();
  });

  it('returns policy by intent after load', async () => {
    const {loadTopicPolicies, getPolicyByIntent} = await importCatalog();
    loadTopicPolicies('zilliz-cli');
    const policy = getPolicyByIntent('zilliz-cli', 'zcli_get_started_in_minutes');
    expect(policy?.must_include.length).toBeGreaterThan(0);
  });

  it('returns an empty list when the topic file is missing', async () => {
    vi.doMock('node:fs', () => ({
      readFileSync: vi.fn(() => {
        throw new Error('ENOENT');
      }),
    }));

    const {loadTopicPolicies, getPolicyByIntent} = await importCatalog();
    expect(loadTopicPolicies('missing-topic')).toEqual([]);
    expect(getPolicyByIntent('missing-topic', 'unknown_intent')).toBeNull();
  });

  it('returns an empty list for invalid topic names', async () => {
    const readFileSync = vi.fn();
    vi.doMock('node:fs', () => ({readFileSync}));

    const {loadTopicPolicies, getPolicyByIntent} = await importCatalog();
    expect(loadTopicPolicies('../secret')).toEqual([]);
    expect(getPolicyByIntent('../secret', 'unknown_intent')).toBeNull();
    expect(readFileSync).not.toHaveBeenCalled();
  });

  it('returns an empty list when the yaml shape is invalid', async () => {
    vi.doMock('node:fs', () => ({
      readFileSync: vi.fn(() => `policies:\n  - intent_id: bad\n    must_include: []\n`),
    }));

    const {loadTopicPolicies} = await importCatalog();
    expect(loadTopicPolicies('invalid-shape')).toEqual([]);
  });

  it('clears the cache', async () => {
    const readFileSync = vi.fn(() => `policies:\n  - intent_id: cached\n    fixed_facts: []\n    must_include: []\n    must_not_say: []\n    style:\n      language: same as user\n      tone: concise\n`);
    vi.doMock('node:fs', () => ({readFileSync}));

    const {loadTopicPolicies, clearPolicyCache} = await importCatalog();
    loadTopicPolicies('cached-topic');
    loadTopicPolicies('cached-topic');
    expect(readFileSync).toHaveBeenCalledTimes(1);

    clearPolicyCache();
    loadTopicPolicies('cached-topic');
    expect(readFileSync).toHaveBeenCalledTimes(2);
  });

  it('preserves fallback_response across cached clones', async () => {
    vi.doMock('node:fs', () => ({
      readFileSync: vi.fn(() => `policies:\n  - intent_id: with-fallback\n    fixed_facts: []\n    must_include: []\n    must_not_say: []\n    fallback_response: fallback from cache\n    style:\n      language: same as user\n      tone: concise\n`),
    }));

    const {loadTopicPolicies, getPolicyByIntent} = await importCatalog();
    const policies = loadTopicPolicies('cache-fallback-topic');
    policies[0].fallback_response = 'mutated fallback';

    expect(loadTopicPolicies('cache-fallback-topic')[0].fallback_response).toBe('fallback from cache');
    expect(getPolicyByIntent('cache-fallback-topic', 'with-fallback')?.fallback_response).toBe('fallback from cache');
  });

  it('does not expose mutable cached policy references', async () => {
    const {loadTopicPolicies, getPolicyByIntent} = await importCatalog();
    const policies = loadTopicPolicies('zilliz-cli');
    policies[0].intent_id = 'mutated';
    policies[0].must_include.push('mutated');
    policies.push({
      intent_id: 'extra',
      fixed_facts: [],
      must_include: [],
      must_not_say: [],
      style: {language: 'same as user', tone: 'concise'},
    });

    const reloadedPolicies = loadTopicPolicies('zilliz-cli');
    expect(reloadedPolicies).toHaveLength(4);
    expect(reloadedPolicies.some(policy => policy.intent_id === 'mutated')).toBe(false);
    expect(reloadedPolicies.some(policy => policy.intent_id === 'extra')).toBe(false);

    const policy = getPolicyByIntent('zilliz-cli', 'zcli_get_started_in_minutes');
    policy?.must_include.push('another mutation');

    expect(getPolicyByIntent('zilliz-cli', 'zcli_get_started_in_minutes')?.must_include).not.toContain('another mutation');
  });
});
