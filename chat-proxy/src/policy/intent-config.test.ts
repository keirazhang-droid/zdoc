import {describe, expect, it, vi} from 'vitest';
import * as catalog from './catalog.js';
import {resolvePolicyIntent} from './intent.js';

describe('resolvePolicyIntent configured trigger_phrases', () => {
  it('matches configured trigger phrase before fallback', () => {
    const intent = resolvePolicyIntent(
      'How much cost can on-demand search save compared to serverless?',
      ['on-demand-search'],
    );

    expect(intent).toBe('ods_cost_vs_serverless');
  });

  it('matches configured trigger phrase for zcli agent skill setup', () => {
    const intent = resolvePolicyIntent(
      'Enable your agent to use Zilliz through the official CLI skill.',
      ['zilliz-cli'],
    );

    expect(intent).toBe('zcli_agent_skill_setup');
  });

  it('maps always-on serving-cluster cost phrasing to serving-cluster intent', () => {
    const intent = resolvePolicyIntent(
      '2. How much cost can on-demand search save compared to always-on serving clusters?',
      ['on-demand-search'],
    );

    expect(intent).toBe('ods_cost_vs_serving_cluster');
  });

  it('honors topic priority while checking configured triggers', () => {
    const query = 'How does external data lake search work?';

    expect(resolvePolicyIntent(query, ['on-demand-search', 'external-data-lake-search']))
      .toBe('edls_how_it_works');
  });

  it('matches configured trigger phrase for vector-lakebase', () => {
    const intent = resolvePolicyIntent('What is a Vector Lakebase?', ['vector-lakebase']);

    expect(intent).toBe('vector_lakebase_definition');
  });

  it('matches hyphenated best-fit phrase for vector-lakebase', () => {
    const intent = resolvePolicyIntent('best-fit use cases for vector lakebase', ['vector-lakebase']);

    expect(intent).toBe('vector_lakebase_best_fit_use_cases');
  });

  it('does not resolve intent from topics that are not selected', () => {
    const query = 'How does external data lake search work?';
    expect(resolvePolicyIntent(query, ['zilliz-cli'])).toBeNull();
  });

  it('uses edls_* fallback IDs when configured trigger phrases are unavailable', () => {
    const loadPoliciesSpy = vi.spyOn(catalog, 'loadTopicPolicies').mockReturnValue([]);

    try {
      expect(resolvePolicyIntent('does external data lake search support iceberg?', ['external-data-lake-search']))
        .toBe('edls_supported_formats');
      expect(resolvePolicyIntent('how does external data lake search work?', ['external-data-lake-search']))
        .toBe('edls_how_it_works');
      expect(resolvePolicyIntent('when should i call refresh for external collection?', ['external-data-lake-search']))
        .toBe('edls_sync_updates');
      expect(resolvePolicyIntent('who is external data lake search best for?', ['external-data-lake-search']))
        .toBe('edls_best_fit_use_cases');
    } finally {
      loadPoliciesSpy.mockRestore();
    }
  });
});
