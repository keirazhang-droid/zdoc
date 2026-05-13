import {loadTopicPolicies} from './catalog.js';

const VECTOR_LAKEBASE_DIFFERENCE_PATTERN = /\b(vector\s+database\s+vs\.?\s+vector\s+lakebase|difference\s+between\s+vector\s+database\s+and\s+vector\s+lakebase|what(?:'s|\s+is)\s+the\s+difference)\b/i;

const TOPIC_FALLBACKS: Record<string, Array<{intentId: string; pattern: RegExp}>> = {
  'zilliz-cli': [
    {intentId: 'zcli_agent_skill_setup', pattern: /\b(agent\s+skill|skill\s+install|install\s+.*skill|official\s+cli\s+skill|agent\b[\s\S]{0,40}\bcli\s+skill)\b/i},
    {intentId: 'zcli_usage_patterns', pattern: /\b(usage\s+patterns?|use\s+cases?|day[-\s]?1|vdbbench|benchmark|others\s+building|what\s+can\s+i\s+build|what\s+are\s+people\s+building)\b/i},
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
    {intentId: 'edls_supported_formats', pattern: /\b(formats?|supported|iceberg|lance|parquet|vortex)\b/i},
    {intentId: 'edls_sync_updates', pattern: /\b(sync|refresh|updates?|incremental)\b/i},
    {intentId: 'edls_how_it_works', pattern: /\b(how\s+.*works?|workflow|steps?)\b/i},
    {intentId: 'edls_best_fit_use_cases', pattern: /\b(best\s*fit|ideal|use\s+cases?|who\s+.*best\s+for)\b/i},
  ],
  'backfill-and-schema-iteration': [
    {intentId: 'basi-backfill-duration-100m', pattern: /\b(100\s*(million|m)\s*rows?|100m[-\s]?row)\b[\s\S]*\b(backfill)\b[\s\S]*\b(how\s+long|take)\b|\bbackfill\b[\s\S]*\b(100\s*(million|m)\s*rows?)\b/i},
    {intentId: 'basi-backfill-vs-upsert', pattern: /\b(backfill\s+vs\.?\s+upsert|when\s+to\s+use\s+backfill\s+vs\.?\s+upsert|when\s+to\s+choose\s+backfill|when\s+to\s+choose\s+upsert)\b/i},
    {intentId: 'basi-backfill-imapacts', pattern: /\b(will\s+backfill\s+affect\s+online\s+read\/?write\s+serving|backfill\s+impact\s+on\s+production\s+queries|backfill\s+online\s+availability|backfill\s+effect\s+duration)\b/i},
    {intentId: 'basi-backfill-costs', pattern: /\b(does\s+backfill\s+generate\s+additional\s+costs?|how\s+is\s+backfill\s+billed|backfill\s+pricing|what\s+does\s+backfill\s+cost)\b/i},
    {intentId: 'basi-backfill-private-preview', pattern: /\b(request\s+access\s+to\s+backfill|backfill\s+private\s+preview|how\s+can\s+i\s+request\s+access\s+to\s+the\s+backfill\s+feature\s+currently\s+in\s+private\s+preview)\b/i},
  ],
  'vector-lakebase': [
    {intentId: 'vector_lakebase_only_need_vector_db', pattern: /\b(only\s+need\s+(a\s+)?vector\s+database|just\s+for\s+vector\s+search|good\s+fit\s+for\s+my\s+use\s+case)\b/i},
    {intentId: 'vector_database_vs_vector_lakebase_difference', pattern: VECTOR_LAKEBASE_DIFFERENCE_PATTERN},
    {intentId: 'vector_lakebase_best_fit_use_cases', pattern: /\b(best[-\s]*fit\s+use\s+cases?|what\s+are\s+vector\s+lakebase\s+use\s+cases|use\s+cases?\s+for\s+vector\s+lakebase)\b/i},
    {intentId: 'vector_lakebase_definition', pattern: /\b(what\s+is\s+(a\s+)?vector\s+lakebase|define\s+vector\s+lakebase|vector\s+lakebase\s+definition)\b/i},
  ],
};

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
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
