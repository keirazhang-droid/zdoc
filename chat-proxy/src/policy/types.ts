export interface PolicyStyle {
  language: string;
  tone: string;
}

export interface PolicyPayload {
  intent_id: string;
  fixed_facts: string[];
  must_include: string[];
  must_not_say: string[];
  response_outline?: string[];
  trigger_phrases?: string[];
  fallback_response?: string;
  style: PolicyStyle;
}

export type PolicyValidationViolationType =
  | 'policy_missing_fixed_fact'
  | 'policy_missing_required'
  | 'policy_forbidden_phrase'
  | 'quality_empty'
  | 'quality_too_short'
  | 'quality_low_actionability';

export type PolicyValidationSeverity = 'blocking' | 'advisory';

export interface PolicyValidationViolation {
  type: PolicyValidationViolationType;
  value: string;
  message: string;
  severity: PolicyValidationSeverity;
}

export interface PolicyValidationResult {
  ok: boolean;
  violations: PolicyValidationViolation[];
  blockingViolations: PolicyValidationViolation[];
  advisoryViolations: PolicyValidationViolation[];
}
