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
    expect(resolvePolicyIntent('Enable your agent to use Zilliz through the official CLI skill.', ['zilliz-cli'])).toBe('zcli_agent_skill_setup');
    expect(resolvePolicyIntent('What are common zilliz cli usage patterns?', ['zilliz-cli'])).toBe('zcli_usage_patterns');
    expect(resolvePolicyIntent('Any zilliz cli roadmap and where can I share feedback?', ['zilliz-cli'])).toBe('zcli_roadmap_feedback');
  });

  it('uses on-demand and external lake deterministic fallback patterns', () => {
    expect(resolvePolicyIntent('what are limitations of on-demand search?', ['on-demand-search'])).toBe('ods_limitations');
    expect(resolvePolicyIntent('on-demand search cost vs serverless', ['on-demand-search'])).toBe('ods_cost_vs_serverless');
    expect(resolvePolicyIntent('on-demand search cost vs serving cluster', ['on-demand-search'])).toBe('ods_cost_vs_serving_cluster');
    expect(resolvePolicyIntent('why is on-demand search good for batch workloads?', ['on-demand-search'])).toBe('ods_fit_infrequent_batch');

    expect(resolvePolicyIntent('does external data lake search support iceberg?', ['external-data-lake-search'])).toBe('edls_supported_formats');
    expect(resolvePolicyIntent('when should i call refresh for external collection?', ['external-data-lake-search'])).toBe('edls_sync_updates');
    expect(resolvePolicyIntent('how does external data lake search work?', ['external-data-lake-search'])).toBe('edls_how_it_works');
    expect(resolvePolicyIntent('who is external data lake search best for?', ['external-data-lake-search'])).toBe('edls_best_fit_use_cases');
  });

  it('uses vector-lakebase deterministic fallback patterns', () => {
    expect(resolvePolicyIntent('define vector lakebase', ['vector-lakebase'])).toBe('vector_lakebase_definition');
    expect(resolvePolicyIntent('i only need a vector database is vector lakebase a good fit', ['vector-lakebase'])).toBe('vector_lakebase_only_need_vector_db');
    expect(resolvePolicyIntent('difference between vector database and vector lakebase', ['vector-lakebase'])).toBe('vector_database_vs_vector_lakebase_difference');
    expect(resolvePolicyIntent('what are vector lakebase use cases', ['vector-lakebase'])).toBe('vector_lakebase_best_fit_use_cases');
  });

  it('uses backfill deterministic fallback patterns', () => {
    expect(resolvePolicyIntent('For 100 million rows of data, how long does backfill take to complete?', ['backfill-and-schema-iteration'])).toBe('basi-backfill-duration-100m');
    expect(resolvePolicyIntent('When to use backfill vs. upsert', ['backfill-and-schema-iteration'])).toBe('basi-backfill-vs-upsert');
    expect(resolvePolicyIntent('Will backfill affect online read/write serving?', ['backfill-and-schema-iteration'])).toBe('basi-backfill-imapacts');
    expect(resolvePolicyIntent('Does backfill generate additional costs?', ['backfill-and-schema-iteration'])).toBe('basi-backfill-costs');
    expect(resolvePolicyIntent('How can I request access to the backfill feature currently in private preview?', ['backfill-and-schema-iteration'])).toBe('basi-backfill-private-preview');
  });

  it('returns null when no fallback patterns match', () => {
    expect(resolvePolicyIntent('tell me something else', ['zilliz-cli'])).toBeNull();
  });
});
