import type { CaseStudySlug } from "@/data/case-studies";

export const personalInfo = {
  name: "Yash Srivastava",
  role: "Applied AI Engineer",
  tagline: "I build the systems that turn capable models into reliable, governed products.",
  focus: "Agentic AI, MCP, GraphRAG, production automation, and the backend platforms that make AI useful beyond a demo.",
  email: "ys7.work@gmail.com",
  linkedin: "https://www.linkedin.com/in/yash-srivastava-a8840b20b/",
  github: "https://github.com/YashSrivastava02",
  resumeUrl: "/Yash_Srivastava_RAI.pdf",
};

export const stats = [
  { value: 30, suffix: "+", label: "Production AI Automations", href: "/work/office-of-agents" },
  { value: 12, suffix: "+", label: "MCP Servers Delivered", href: "/work/mcp-automation-platform" },
  { value: 1, suffix: "M+", label: "Knowledge Entities", href: "/work/enterprise-graphrag" },
  { value: 100, suffix: "+", label: "Manual Hours Removed", href: "#experience" },
];

export interface Highlight { metric: string; label: string; detail: string }

export const about = {
  summary: "I am an Applied AI Engineer with 2+ years of experience shipping agentic AI, multi-agent systems, MCP servers, RAG/GraphRAG, and LLM-powered products. My work sits at the intersection of model orchestration, backend engineering, data platforms, cloud infrastructure, and production ownership.",
  highlights: [
    { metric: "30+", label: "production AI automations", detail: "Delivered across Engineering, Security, Support, PM, IT, Sales, DevOps, QA, Documentation, and RevOps at ArmorCode." },
    { metric: "1M+", label: "grounded knowledge entities", detail: "Architected a GraphRAG layer using Neo4j traversal, pgvector HNSW search, hybrid retrieval, Redis graph caching, and LiteLLM orchestration." },
    { metric: "90%", label: "chatbot accuracy", detail: "Productionized a SQL-RAG assistant with FastAPI, LangChain, Azure OpenAI, real-time ingestion, and full test coverage." },
    { metric: "8", label: "production repositories", detail: "Enabled repository-level AI engineering through specialized agents and reusable codebase-analysis skills." },
  ] satisfies Highlight[],
};

export const recognition = {
  title: "Production-first AI engineering",
  detail: "Yash works across the complete delivery path: agent orchestration, retrieval, APIs, asynchronous workflows, observability, CI/CD, cloud infrastructure, and safe production operations.",
};

export const highlightSentences = about.highlights.map((item) => `${item.metric} ${item.label} — ${item.detail}`);

export type ExperienceBullet = string | { text: string; study: CaseStudySlug };
export function bulletText(bullet: ExperienceBullet): string { return typeof bullet === "string" ? bullet : bullet.text; }
export function bulletStudySlug(bullet: ExperienceBullet): CaseStudySlug | undefined { return typeof bullet === "string" ? undefined : bullet.study; }

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: "work" | "education";
  summary: string;
  bullets: ExperienceBullet[];
}

export const experiences: Experience[] = [
  {
    company: "ArmorCode Inc.", role: "Applied AI Engineer", period: "Aug 2025 — Present", type: "work",
    summary: "Owns production AI automation, agent platforms, enterprise knowledge, and the infrastructure that supports them across business and engineering functions.",
    bullets: [
      { text: "Delivered 30+ production AI automations and 12+ MCP servers across ten business and engineering functions, removing 100+ manual hours.", study: "mcp-automation-platform" },
      { text: "Architected the central GraphRAG knowledge layer over 1M+ product and organizational entities using Neo4j, pgvector, hybrid retrieval, and Redis caching.", study: "enterprise-graphrag" },
      { text: "Productionized Office of Agents for secure, human-in-the-loop execution with hierarchical delegation, persistent state, scheduling, and governance.", study: "office-of-agents" },
      "Unified analytics across four AWS accounts and 10+ SaaS sources with a self-hosted PostgreSQL and Apache Superset data platform.",
      "Enabled AI-assisted engineering across eight production repositories with eight specialized agents and seven reusable skills.",
      "Modernized n8n with containers, multi-stage CI/CD, Lua-based RBAC, GitHub synchronization, and production-safe upgrades.",
    ],
  },
  {
    company: "Xansr Software Pvt. Ltd.", role: "Junior GenAI Specialist", period: "Feb 2024 — Aug 2025", type: "work",
    summary: "Built and productionized RAG assistants, data pipelines, fine-tuned models, and voice-enabled AI experiences.",
    bullets: [
      { text: "Achieved 90% chatbot accuracy with 100% test coverage for a production SQL-RAG assistant built with FastAPI, LangChain, and Azure OpenAI.", study: "sql-rag-assistant" },
      "Implemented Azure SQL ETL pipelines, SQLAlchemy schemas, and Azure Logic Apps ingestion workflows.",
      "Improved domain performance through supervised fine-tuning and LoRA on serverless GPU infrastructure.",
      "Added natural-language voice responses using ElevenLabs text-to-speech.",
    ],
  },
  {
    company: "The NorthCap University", role: "B.Tech — Computer Science Engineering, AI & ML", period: "Aug 2020 — Jun 2024", type: "education",
    summary: "Computer Science Engineering degree with a specialization in Artificial Intelligence and Machine Learning.", bullets: [],
  },
];

export interface Project {
  slug: string; featured?: boolean; title: string; category: string; summary: string; description: string;
  impact: string; role: string; timeline?: string; complexity: string; tech: string[]; images: string[]; github: string; live?: string;
}

export const projects: Project[] = [
  {
    slug: "creator-os", featured: true, title: "Creator OS", category: "Multi-tenant AI platform",
    summary: "A full-stack operating system for creators with intelligence, planning, outreach, and automation built in.",
    description: "Built a multi-tenant platform with Instagram OAuth, Meta Graph APIs, AI creator intelligence, content planning, brand matchmaking, outreach, email automation, media storage, and model fallbacks.",
    impact: "Nine-plus integrated product capabilities on one asynchronous FastAPI and React platform.", role: "Product architecture, backend, AI workflows, and infrastructure", timeline: "2026",
    complexity: "Multi-tenancy, OAuth, background jobs, media, external APIs, and AI fallbacks",
    tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Celery", "Valkey", "Docker", "Supabase"], images: [], github: "https://github.com/YashSrivastava02",
  },
  {
    slug: "grow-x-openclaw", featured: true, title: "OpenClaw NSE Intelligence", category: "Autonomous market agent",
    summary: "A 24/7 NSE market intelligence agent combining live data, sentiment, recommendations, and approval-gated actions.",
    description: "Integrated Gemini, Groww, Yahoo Finance, Finnhub, and Telegram for real-time analysis, portfolio monitoring, natural-language recommendations, and human-in-the-loop trade execution.",
    impact: "Orchestrates six external AI, market-data, and communication services in one agent workflow.", role: "Agent architecture, integrations, monitoring, and interaction design", timeline: "2025",
    complexity: "Real-time market data, sentiment, persistent monitoring, and safe action approval",
    tech: ["Python", "OpenClaw", "Gemini", "Groww API", "Yahoo Finance", "Finnhub", "Telegram"], images: [], github: "https://github.com/YashSrivastava02/grow_x_openclaw",
  },
  {
    slug: "crewai-code-reviewer", featured: true, title: "CrewAI Code Reviewer", category: "Multi-agent developer tooling",
    summary: "A CrewAI-based code review workflow that turns specialized agent roles into structured engineering feedback.",
    description: "A public Python project exploring role-based multi-agent coordination for code analysis, review, and actionable recommendations.",
    impact: "Demonstrates practical multi-agent orchestration beyond single-prompt assistants.", role: "Agent design and Python implementation", timeline: "2026",
    complexity: "Agent roles, task delegation, analysis synthesis, and developer-facing output",
    tech: ["Python", "CrewAI", "LLMs"], images: [], github: "https://github.com/YashSrivastava02/crewai_code_reviewer",
  },
  {
    slug: "weather-mcp", title: "Weather MCP Server", category: "MCP tooling", summary: "A compact MCP server that exposes weather capabilities to tool-using assistants.",
    description: "A public Python MCP implementation focused on clean tool contracts and external-data access.", impact: "A concise public example of the same protocol used in Yash's production automation work.",
    role: "MCP server design and implementation", complexity: "Tool schemas, external API handling, and assistant interoperability", tech: ["Python", "MCP"], images: [], github: "https://github.com/YashSrivastava02/weather_mcp-",
  },
  {
    slug: "crewai-hr-dashboard", title: "CrewAI HR Dashboard", category: "Agentic operations", summary: "An HR-oriented agent workflow and dashboard built with CrewAI.",
    description: "A public exploration of agent coordination for business operations and HR workflows.", impact: "Shows how agent systems can be shaped around real operational domains.",
    role: "Workflow design and Python implementation", complexity: "Business workflow modeling and agent collaboration", tech: ["Python", "CrewAI"], images: [], github: "https://github.com/YashSrivastava02/crewai-hr-dashboard",
  },
  {
    slug: "intent-recognition", title: "Social Intent Recognition", category: "Natural language processing", summary: "An intent-recognition project for classifying social-media comments.",
    description: "A Python NLP project for understanding intent in noisy, conversational social text.", impact: "Foundational applied NLP work spanning data preparation, modeling, and evaluation.",
    role: "ML experimentation and implementation", complexity: "Noisy language, intent labels, and model evaluation", tech: ["Python", "NLP", "Machine Learning"], images: [], github: "https://github.com/YashSrivastava02/Intent-Recognition-of-Social-Media-Comments",
  },
];

export const skillCategories = [
  { title: "Agentic AI & LLM Systems", description: "Production agent systems, tool use, memory, retrieval, evaluation, and model orchestration.", skills: ["Agentic AI", "Multi-Agent Systems", "MCP", "RAG", "GraphRAG", "LangChain", "LangGraph", "CrewAI", "Graphiti", "LiteLLM", "Langfuse", "LoRA/SFT"] },
  { title: "Backend & Integrations", description: "Typed APIs and distributed services that connect AI to real systems.", skills: ["Python", "FastAPI", "Django", "Java", "Spring Boot", "TypeScript", "SQLAlchemy", "Celery", "REST", "OAuth 2.0", "JWT", "RBAC"] },
  { title: "Data & Retrieval", description: "Relational, graph, vector, cache, and search infrastructure for grounded AI.", skills: ["PostgreSQL", "pgvector", "Neo4j", "Redis", "Elasticsearch", "MongoDB", "BM25", "HNSW", "Hybrid Search", "Reranking", "Superset"] },
  { title: "Cloud & Delivery", description: "Infrastructure and delivery systems for operating AI reliably.", skills: ["Docker", "Kubernetes", "AWS", "Azure", "GitHub Actions", "Jenkins", "Kafka", "Grafana", "Prometheus", "n8n", "Nginx"] },
];

export const chatSuggestions = [
  "Give me Yash's recruiter summary",
  "How does the 1M+ entity GraphRAG system work?",
  "What did Yash automate with MCP?",
  "Compare Office of Agents and Creator OS",
  "Which project best proves production ownership?",
];
