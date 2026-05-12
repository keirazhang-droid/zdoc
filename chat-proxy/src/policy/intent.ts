import {loadTopicPolicies} from './catalog.js';

const TOPIC_FALLBACKS: Record<string, Array<{intentId: string; pattern: RegExp}>> = {
  'zilliz-cli': [
    {intentId: 'zcli_agent_skill_setup', pattern: /\b(agent\s+skill|skill\s+install|install\s+.*skill)\b/i},
    {intentId: 'zcli_usage_patterns', pattern: /\b(usage\s+patterns?|use\s+cases?|day[-\s]?1|vdbbench|benchmark)\b/i},
    {intentId: 'zcli_roadmap_feedback', pattern: /\b(roadmap|feedback|feature\s+request|submit\s+(a\s+)?ticket)\b/i},
    {intentId: 'zcli_get_started_in_minutes', pattern: /\b(zilliz\s*cli|zilliz\s+login|context\s+set|install\s+.*zilliz|get\s+started)\b/i},
  ],
  'on-demand-search': [
    {intentId: 'ods_limitations', pattern: /\b(limitations?|constraints?|cold\s*start|import\s+only|project\s+admin|8\s*-?\s*256\s*cus?)\b/i},
    {intentId: 'ods_cost_vs_serverless', pattern: /\b(cost|cheaper|savings?)\b[\s\S]*\bserverless\b|\bserverless\b[\s\S]*\b(cost|cheaper|savings?)\b/i},
    {intentId: 'ods_cost_vs_serving_cluster', pattern: /\b(cost|cheaper|savings?)\b[\s\S]*\b(serving\s+cluster|always[-\s]?on|7x24)\b|\b(serving\s+cluster|always[-\s]?on|7x24)\b[\s\S]*\b(cost|cheaper|savings?)\b/i},
    {intentId: 'ods_fit_infrequent_batch', pattern: /\b(infrequent|batch|idle|tb|pb|discovery\s+workloads?)\b/i},
  ],
  'external-data-lake-search': [
    {intentId: 'external_data_lake_search_supported_formats', pattern: /\b(formats?|supported|iceberg|lance|parquet|vortex)\b/i},
    {intentId: 'external_data_lake_search_sync_updates', pattern: /\b(sync|refresh|updates?|incremental)\b/i},
    {intentId: 'external_data_lake_search_how_it_works', pattern: /\b(how\s+.*works?|workflow|steps?)\b/i},
    {intentId: 'external_data_lake_search_best_fit_use_cases', pattern: /\b(best\s*fit|ideal|use\s+cases?|who\s+.*best\s+for)\b/i},
  ],
};

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, ' ');
}

function resolveByConfiguredPhrases(normalizedQuery: string, topic: string): string | null {
  const policies = loadTopicPolicies(topic);
  for (const policy of policies) {
    if (!policy.trigger_phrases?.length) continue;
    if (policy.trigger_phrases.some(phrase => normalizedQuery.includes(normalizeQuery(phrase)))) {
      return policy.intent_id;
    }
  }
  return null;
}

function resolveByFallbackRegex(query: string, topic: string): string | null {
  const fallbacks = TOPIC_FALLBACKS[topic] || [];
  for (const fallback of fallbacks) {
    if (fallback.pattern.test(query)) {
      return fallback.intentId;
    }
  }
  return null;
}

export function resolvePolicyIntent(query: string, topics: string[]): string | null {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery || topics.length === 0) {
    return null;
  }

  for (const topic of topics) {
    const configured = resolveByConfiguredPhrases(normalizedQuery, topic);
    if (configured) {
      return configured;
    }

    const fallback = resolveByFallbackRegex(query, topic);
    if (fallback) {
      return fallback;
    }
  }

  return null;
}
