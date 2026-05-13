import {describe, it, expect} from 'vitest';
import {buildPolicyFallback} from './fallback.js';
import type {PolicyPayload} from './types.js';
import {validatePolicyResponse} from './validator.js';

const policy: PolicyPayload = {
  intent_id: 'zcli_get_started_in_minutes',
  fixed_facts: ['Use zilliz login as the default auth entry point.'],
  must_include: [
    'How to install',
    'From login, create cluster, create collection, insert, and query: provide one command set example.',
  ],
  must_not_say: ['Use SDK code instead of zilliz CLI for this CLI setup flow'],
  response_outline: ['Installation methods', 'One end-to-end command set'],
  style: {language: 'same as user', tone: 'concise, helpful'},
};

describe('validatePolicyResponse', () => {
  it('passes sufficiently long non-empty responses', () => {
    const text = 'This response is intentionally long enough to satisfy rubric checks while remaining policy-agnostic and not relying on any content-specific requirements.';

    const result = validatePolicyResponse(policy, text);
    expect(result.ok).toBe(true);
    expect(result.violations).toEqual([]);
    expect(result.blockingViolations).toEqual([]);
    expect(result.advisoryViolations).toEqual([]);
  });

  it('fails empty responses as blocking', () => {
    const result = validatePolicyResponse(policy, '   ');
    expect(result.ok).toBe(false);
    expect(result.blockingViolations.some(v => v.type === 'quality_empty')).toBe(true);
    expect(result.advisoryViolations).toEqual([]);
  });

  it('fails too-short responses as blocking', () => {
    const result = validatePolicyResponse(policy, 'Use zilliz CLI.');
    expect(result.ok).toBe(false);
    expect(result.blockingViolations.some(v => v.type === 'quality_too_short')).toBe(true);
    expect(result.advisoryViolations).toEqual([]);
  });

  it('does not perform fixed-fact, required-phrase, or forbidden-phrase content checks', () => {
    const text = 'This response is intentionally long enough to pass rubric checks while omitting required phrases and even mentioning forbidden wording such as Use SDK code instead of zilliz CLI for this CLI setup flow.';

    const result = validatePolicyResponse(policy, text);
    expect(result.ok).toBe(true);
    expect(result.violations.some(v => v.type.startsWith('policy_'))).toBe(false);
  });

  it('builds deterministic fallback with the exact expected output', () => {
    const text = buildPolicyFallback(policy);
    expect(text).toBe([
      'Here is the safest verified guidance:',
      '',
      'Verified facts:',
      '- Use zilliz login as the default auth entry point.',
      '',
      'Required guidance:',
      '- How to install',
      '- From login, create cluster, create collection, insert, and query: provide one command set example.',
    ].join('\n'));
  });

  it('builds deterministic fallback when facts and required guidance are empty', () => {
    const text = buildPolicyFallback({
      ...policy,
      fixed_facts: [],
      must_include: [],
    });
    expect(text).toBe([
      'Here is the safest verified guidance:',
      '',
      'Verified facts:',
      '',
      'Required guidance:',
    ].join('\n'));
  });
});
