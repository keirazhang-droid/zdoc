import {describe, expect, it} from 'vitest';
import {resolvePolicyIntent} from './intent.js';

describe('resolvePolicyIntent configured trigger_phrases', () => {
  it('matches configured trigger phrase before fallback', () => {
    const intent = resolvePolicyIntent(
      'How much cost can on-demand search save compared to serverless?',
      ['on-demand-search'],
    );

    expect(intent).toBe('ods_cost_vs_serverless');
  });

  it('honors topic priority while checking configured triggers', () => {
    const query = 'How does external data lake search work?';

    expect(resolvePolicyIntent(query, ['on-demand-search', 'external-data-lake-search']))
      .toBe('external_data_lake_search_how_it_works');
  });

  it('does not resolve intent from topics that are not selected', () => {
    const query = 'How does external data lake search work?';
    expect(resolvePolicyIntent(query, ['zilliz-cli'])).toBeNull();
  });
});
