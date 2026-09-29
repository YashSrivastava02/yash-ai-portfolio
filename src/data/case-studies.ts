export interface CaseStudyDecision { choice: string; why: string; rejected?: string[] }
export interface CaseStudyResult { metric: string; label: string }
export interface CaseStudySection { heading: string; body: string; points?: string[] }
export type CaseStudyTheme = "agents" | "retrieval" | "platform" | "products";

export const CASE_STUDY_THEMES: { id: CaseStudyTheme; label: string; blurb: string }[] = [
  { id: "agents", label: "Agent systems", blurb: "AI that can delegate, use tools, retain state, and stay governable." },
  { id: "retrieval", label: "Retrieval & context", blurb: "Grounding large-scale AI behavior in current enterprise knowledge." },
  { id: "platform", label: "Platform & reliability", blurb: "The infrastructure, security, and delivery work behind production AI." },
  { id: "products", label: "AI products", blurb: "End-to-end products where intelligence is part of the workflow." },
];

export interface CaseStudy {
  slug: string; kind: "system" | "product"; theme: CaseStudyTheme; featured?: boolean; title: string; employer?: string;
  period: string; oneLiner: string; summary: string; problem: string; constraints: string[];
  diagram: "eval" | "mcp" | "kgrag" | "docs" | "gateway" | null; diagramCaption: string;
  decisions: CaseStudyDecision[]; sections: CaseStudySection[]; results: CaseStudyResult[]; stack: string[];
  ownership: string; tags: string[]; aliases: string[];
}

export type CaseStudySlug = "office-of-agents" | "enterprise-graphrag" | "mcp-automation-platform" | "sql-rag-assistant";
export const CASE_STUDY_SLUGS: CaseStudySlug[] = ["office-of-agents", "enterprise-graphrag", "mcp-automation-platform", "sql-rag-assistant"];

export const caseStudies: CaseStudy[] = [
  {
    slug: "office-of-agents", kind: "system", theme: "agents", featured: true, title: "Office of Agents", employer: "ArmorCode", period: "2025 — Present",
    oneLiner: "A governed enterprise agent platform serving 10+ business and engineering functions.",
    summary: "A secure internal platform for autonomous and human-in-the-loop agent execution, built around hierarchical delegation, persistent state, schedules, and governance controls.",
    problem: "Teams needed reusable AI operators that could act on organization-specific context without turning every workflow into a bespoke, ungoverned bot.",
    constraints: ["Agents had to support autonomous and approval-gated execution.", "Tools and context needed explicit enterprise access boundaries.", "Long-running workflows required persistent state and schedules."],
    diagram: "mcp", diagramCaption: "A governed orchestration layer delegates work to specialized agents and MCP tools while retaining state and approval boundaries.",
    decisions: [
      { choice: "Hierarchical delegation", why: "Specialists stay focused while an orchestrator owns routing and completion.", rejected: ["A single general-purpose agent with every instruction and tool"] },
      { choice: "Human-in-the-loop as a first-class state", why: "Sensitive actions can pause for review instead of depending on prompt-level caution.", rejected: ["Relying only on natural-language instructions to prevent unsafe actions"] },
      { choice: "Shared skills and tools", why: "Capabilities are reusable across functions rather than copied into isolated bots.", rejected: ["Copying tools and prompts into separate departmental bots"] },
    ],
    sections: [
      { heading: "Execution model", body: "Agents can be triggered by people, schedules, or upstream events, then delegate work while preserving traceable state." },
      { heading: "Production optimization", body: "Context compression and coding-agent optimization reduced inference overhead and steered agents toward simpler implementations and native capabilities." },
    ],
    results: [{ metric: "10+", label: "business and engineering functions enabled" }, { metric: "8+", label: "specialized engineering agents" }, { metric: "7+", label: "reusable codebase skills" }],
    stack: ["Python", "MCP", "LiteLLM", "n8n", "Langfuse", "Docker", "GitHub"],
    ownership: "Yash productionized the platform and its execution model, integrations, operational workflows, and optimization layers as part of his ArmorCode role.",
    tags: ["Agentic AI", "Multi-Agent", "Governance", "Human-in-the-loop"], aliases: ["office agents", "enterprise agents", "delegation", "persistent state", "agent platform"],
  },
  {
    slug: "enterprise-graphrag", kind: "system", theme: "retrieval", featured: true, title: "Enterprise GraphRAG", employer: "ArmorCode", period: "2025 — Present",
    oneLiner: "A central knowledge layer grounding enterprise agents in more than one million connected entities.",
    summary: "A GraphRAG architecture combining LLM extraction, Neo4j traversal, pgvector HNSW search, hybrid retrieval, Redis graph caching, and LiteLLM orchestration.",
    problem: "Enterprise agents needed a common, connected view of product and organizational knowledge that could answer beyond simple keyword or vector similarity.",
    constraints: ["The corpus exceeded one million extracted entities.", "Answers needed semantic recall and relationship-aware traversal.", "Retrieval latency had to remain production-friendly."],
    diagram: "kgrag", diagramCaption: "Entity extraction builds the graph; hybrid vector and graph retrieval assemble grounded context for the model.",
    decisions: [
      { choice: "Graph plus vector retrieval", why: "Vector similarity recovers relevant language while graph traversal preserves explicit relationships.", rejected: ["Vector-only retrieval that cannot follow explicit relationships"] },
      { choice: "HNSW indexing in pgvector", why: "Approximate nearest-neighbor search keeps semantic retrieval responsive at scale.", rejected: ["A full vector scan for every query"] },
      { choice: "Redis graph caching", why: "Frequently traversed context avoids repeated high-cost graph work.", rejected: ["Recomputing every repeated graph traversal"] },
    ],
    sections: [
      { heading: "Knowledge ingestion", body: "LLM pipelines extract entities and relationships before indexing graph and vector representations." },
      { heading: "Retrieval", body: "Queries blend semantic candidates with relationship traversal, then rerank and package evidence for downstream agents." },
    ],
    results: [{ metric: "1M+", label: "product and organizational knowledge entities" }, { metric: "Hybrid", label: "graph, vector, and lexical retrieval" }, { metric: "Central", label: "knowledge layer shared by enterprise agents" }],
    stack: ["Neo4j", "PostgreSQL", "pgvector", "HNSW", "Redis", "LiteLLM", "Python"],
    ownership: "Yash architected the central GraphRAG layer, including extraction, traversal, vector search, hybrid retrieval, caching, and model orchestration.",
    tags: ["GraphRAG", "Knowledge Graph", "Hybrid Search", "RAG"], aliases: ["knowledge layer", "neo4j", "pgvector", "million entities", "enterprise rag"],
  },
  {
    slug: "mcp-automation-platform", kind: "system", theme: "platform", featured: true, title: "MCP Automation Platform", employer: "ArmorCode", period: "2025 — Present",
    oneLiner: "Thirty-plus production AI automations and twelve-plus MCP servers operated as a reusable platform.",
    summary: "A production automation estate spanning ten functions, backed by managed n8n infrastructure, reusable MCP capabilities, RBAC, GitHub synchronization, and staged delivery.",
    problem: "AI workflows were valuable only if they could be reused, promoted safely, operated continuously, and secured across many organizational functions.",
    constraints: ["Automations crossed ten organizational functions.", "Production upgrades could not disrupt active workflows.", "Capabilities needed controlled promotion and access policies."],
    diagram: "gateway", diagramCaption: "Reusable MCP capabilities feed governed automations deployed through a staged, synchronized production platform.",
    decisions: [
      { choice: "MCP for reusable capability contracts", why: "Tools become discoverable and portable across assistants and workflows.", rejected: ["Hard-coding integrations separately into every workflow"] },
      { choice: "Bidirectional GitHub synchronization", why: "Workflow state remains reviewable and recoverable while the runtime stays operational.", rejected: ["Editing production workflows without version control"] },
      { choice: "Multi-stage CI/CD", why: "Changes can be validated and promoted without editing production directly.", rejected: ["Promoting every change directly into production"] },
    ],
    sections: [
      { heading: "Platform operations", body: "Containerized deployments, Lua-based RBAC, controlled upgrades, and Git synchronization turn n8n into an owned production platform." },
      { heading: "Reusable delivery", body: "MCP servers expose common capabilities once, then multiple agents and workflows consume them with consistent contracts." },
    ],
    results: [{ metric: "30+", label: "production AI automations" }, { metric: "12+", label: "MCP servers delivered" }, { metric: "100+", label: "manual hours eliminated" }],
    stack: ["MCP", "n8n", "Docker", "GitHub Actions", "Lua", "Python", "CI/CD"],
    ownership: "Yash delivered the automations and MCP services and owned the production automation infrastructure, modernization, deployment, access control, and upgrades.",
    tags: ["MCP", "Automation", "Platform Engineering", "DevOps"], aliases: ["mcp servers", "n8n", "automations", "manual hours", "production workflows"],
  },
  {
    slug: "sql-rag-assistant", kind: "product", theme: "products", title: "Production SQL-RAG Assistant", employer: "Xansr Software", period: "2024 — 2025",
    oneLiner: "A production GenAI assistant that reached 90% accuracy with complete automated test coverage.",
    summary: "A FastAPI and LangChain assistant over live structured data, supported by Azure OpenAI, real-time ingestion, contextual conversations, and production ETL pipelines.",
    problem: "Users needed accurate natural-language access to changing structured business data, with conversation continuity and production-grade ingestion.",
    constraints: ["Answers had to reflect live, continuously ingested data.", "Generated SQL required a measurable quality bar.", "The application needed production APIs and contextual multi-turn behavior."],
    diagram: "docs", diagramCaption: "Data ingestion and schema context feed a guarded SQL-RAG loop exposed through typed production APIs.",
    decisions: [
      { choice: "SQL-RAG over static document retrieval", why: "The source of truth was structured and current; queries should execute against it.", rejected: ["Answering from stale snapshots of structured records"] },
      { choice: "FastAPI service boundary", why: "Typed APIs kept the AI workflow independently testable and deployable.", rejected: ["Mixing model calls and business rules into one untyped script"] },
      { choice: "Full automated coverage", why: "Accuracy claims matter only when regressions are visible before release.", rejected: ["Depending on manual spot checks after deployment"] },
    ],
    sections: [
      { heading: "Data path", body: "Azure SQL ETL pipelines and Logic Apps maintained current data for the assistant's query workflow." },
      { heading: "Model improvement", body: "Supervised fine-tuning and LoRA experiments on serverless GPUs explored accuracy, latency, and cost tradeoffs." },
    ],
    results: [{ metric: "90%", label: "chatbot accuracy" }, { metric: "100%", label: "test coverage" }, { metric: "2", label: "fine-tuning approaches evaluated" }],
    stack: ["FastAPI", "LangChain", "Azure OpenAI", "Azure SQL", "SQLAlchemy", "LoRA", "ElevenLabs"],
    ownership: "Yash built and deployed the SQL-RAG assistant, production API, ingestion path, contextual conversation flow, and model-improvement experiments.",
    tags: ["SQL-RAG", "FastAPI", "Fine-tuning", "Voice AI"], aliases: ["chatbot", "90 percent accuracy", "azure openai", "sql assistant", "xansr"],
  },
];

export const caseStudyBySlug = new Map(caseStudies.map((study) => [study.slug, study]));
export const systemCaseStudies = caseStudies.filter((study) => study.kind === "system");
export const productCaseStudies = caseStudies.filter((study) => study.kind === "product");
export const caseStudiesByTheme = CASE_STUDY_THEMES.map((theme) => ({ ...theme, studies: caseStudies.filter((study) => study.theme === theme.id) })).filter((group) => group.studies.length > 0);
export const featuredCaseStudies = caseStudies.filter((study) => study.featured);
export function getCaseStudyPath(slug: string) { return `/work/${slug}`; }
export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return { previous: index > 0 ? caseStudies[index - 1] : null, next: index < caseStudies.length - 1 ? caseStudies[index + 1] : null };
}
