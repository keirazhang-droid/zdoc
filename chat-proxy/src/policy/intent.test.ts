import {describe, expect, it} from 'vitest';
import {resolvePolicyIntent} from './intent.js';

describe('resolvePolicyIntent fallback resolver', () => {
  it('returns null for empty queries', () => {
    expect(resolvePolicyIntent('', ['zilliz-cli'])).toBeNull();
    expect(resolvePolicyIntent('   ', ['zilliz-cli'])).toBeNull();
  });

  it('returns null when topics are empty', () => {
    expect(resolvePolicyIntent('how to login zilliz cli', [])).toBeNull();
  });

  it('uses zilliz-cli deterministic fallback patterns', () => {
    expect(resolvePolicyIntent('How do I install zilliz cli and login?', ['zilliz-cli'])).toBe('zcli_get_started_in_minutes');
    expect(resolvePolicyIntent('How do I install zilliz agent skill?', ['zilliz-cli'])).toBe('zcli_agent_skill_setup');
    expect(resolvePolicyIntent('What are common zilliz cli usage patterns?', ['zilliz-cli'])).toBe('zcli_usage_patterns');
    expect(resolvePolicyIntent('Any zilliz cli roadmap and where can I share feedback?', ['zilliz-cli'])).toBe('zcli_roadmap_feedback');
  });

  it('uses on-demand and external lake deterministic fallback patterns', () => {
    expect(resolvePolicyIntent('what are limitations of on-demand search?', ['on-demand-search'])).toBe('ods_limitations');
    expect(resolvePolicyIntent('on-demand search cost vs serverless', ['on-demand-search'])).toBe('ods_cost_vs_serverless');
    expect(resolvePolicyIntent('on-demand search cost vs serving cluster', ['on-demand-search'])).toBe('ods_cost_vs_serving_cluster');
    expect(resolvePolicyIntent('why is on-demand search good for batch workloads?', ['on-demand-search'])).toBe('ods_fit_infrequent_batch');

    expect(resolvePolicyIntent('does external data lake search support iceberg?', ['external-data-lake-search'])).toBe('external_data_lake_search_supported_formats');
    expect(resolvePolicyIntent('when should i call refresh for external collection?', ['external-data-lake-search'])).toBe('external_data_lake_search_sync_updates');
    expect(resolvePolicyIntent('how does external data lake search work?', ['external-data-lake-search'])).toBe('external_data_lake_search_how_it_works');
    expect(resolvePolicyIntent('who is external data lake search best for?', ['external-data-lake-search'])).toBe('external_data_lake_search_best_fit_use_cases');
  });

  it('returns null when no fallback patterns match', () => {
    expect(resolvePolicyIntent('tell me something else', ['zilliz-cli'])).toBeNull();
  });
});
