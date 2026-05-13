import type {
  PolicyPayload,
  PolicyValidationResult,
  PolicyValidationViolation,
  PolicyValidationViolationType,
} from './types.js';

const BLOCKING_VIOLATION_TYPES = new Set<PolicyValidationViolationType>([
  'quality_empty',
  'quality_too_short',
]);

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function pushViolation(
  violations: PolicyValidationViolation[],
  type: PolicyValidationViolationType,
  value: string,
  message: string,
): void {
  violations.push({
    type,
    value,
    message,
    severity: BLOCKING_VIOLATION_TYPES.has(type) ? 'blocking' : 'advisory',
  });
}

function buildValidationResult(violations: PolicyValidationViolation[]): PolicyValidationResult {
  const blockingViolations = violations.filter(v => v.severity === 'blocking');
  const advisoryViolations = violations.filter(v => v.severity === 'advisory');
  return {
    ok: blockingViolations.length === 0,
    violations,
    blockingViolations,
    advisoryViolations,
  };
}

export function validatePolicyResponse(
  policy: PolicyPayload,
  responseText: string,
): PolicyValidationResult {
  void policy;
  const violations: PolicyValidationViolation[] = [];
  const normalized = normalize(responseText);

  if (!normalized) {
    pushViolation(violations, 'quality_empty', '', 'Response is empty.');
    return buildValidationResult(violations);
  }

  if (normalized.length < 80) {
    pushViolation(
      violations,
      'quality_too_short',
      String(normalized.length),
      'Response is too short to be actionable.',
    );
  }

  return buildValidationResult(violations);
}
