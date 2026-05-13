import {describe, expect, it} from 'vitest';
import {buildPolicyFallback} from './fallback.js';
import type {PolicyPayload} from './types.js';

function makePolicy(overrides: Partial<PolicyPayload> = {}): PolicyPayload {
  return {
    intent_id: 'test_intent',
    fixed_facts: ['Fact A'],
    must_include: ['Requirement A'],
    must_not_say: ['Forbidden A'],
    style: {language: 'en', tone: 'concise'},
    ...overrides,
  };
}

describe('buildPolicyFallback', () => {
  it('returns exact fallback_response when provided and non-empty', () => {
    const policy = makePolicy({fallback_response: '  exact fallback text with spaces  '});

    expect(buildPolicyFallback(policy)).toBe('  exact fallback text with spaces  ');
  });

  it('uses deterministic fallback when fallback_response is missing', () => {
    const policy = makePolicy({
      fixed_facts: ['Fact A', 'Fact B'],
      must_include: ['Requirement A', 'Requirement B'],
    });

    expect(buildPolicyFallback(policy)).toBe([
      'Here is the safest verified guidance:',
      '',
      'Verified facts:',
      '- Fact A',
      '- Fact B',
      '',
      'Required guidance:',
      '- Requirement A',
      '- Requirement B',
    ].join('\n'));
  });

  it('uses deterministic fallback when fallback_response is blank', () => {
    const policy = makePolicy({fallback_response: '   '});

    expect(buildPolicyFallback(policy)).toContain('Here is the safest verified guidance:');
  });
});
