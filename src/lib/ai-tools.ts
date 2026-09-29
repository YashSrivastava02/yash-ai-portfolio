import { caseStudies, caseStudyBySlug, getCaseStudyPath } from "@/data/case-studies";
import { bulletText, experiences, personalInfo, projects, stats } from "@/data/portfolio";
import { getProjectAnchor, normalizeText } from "@/lib/ai-twin";

export type ToolName = "search_work" | "get_case_study" | "get_metric" | "compare_systems" | "navigate_to";
export interface ToolCallRequest { id: string; name: string; args: Record<string, unknown> }
export interface ToolCallResult {
  id: string; name: string; output: unknown; summary: string; sources: string[]; refused?: boolean; durationMs: number;
}

export const TOOL_DEFINITIONS = [
  { type: "function" as const, function: { name: "search_work", description: "Search Yash's verified experience, systems, and public projects.", parameters: { type: "object", properties: { query: { type: "string" }, kind: { type: "string", enum: ["all", "systems", "projects", "experience"] } }, required: ["query"] } } },
  { type: "function" as const, function: { name: "get_case_study", description: "Retrieve verified architecture, decisions, results, and ownership for one case study.", parameters: { type: "object", properties: { slug: { type: "string", enum: caseStudies.map((study) => study.slug) }, section: { type: "string", enum: ["all", "problem", "constraints", "decisions", "results", "ownership", "detail"] } }, required: ["slug"] } } },
  { type: "function" as const, function: { name: "get_metric", description: "Retrieve an exact documented portfolio metric. Refuses unknown numbers.", parameters: { type: "object", properties: { name: { type: "string" } }, required: ["name"] } } },
  { type: "function" as const, function: { name: "compare_systems", description: "Compare two or more case studies by stack, results, and ownership.", parameters: { type: "object", properties: { slugs: { type: "array", items: { type: "string", enum: caseStudies.map((study) => study.slug) } } }, required: ["slugs"] } } },
  { type: "function" as const, function: { name: "navigate_to", description: "Return a portfolio link for a section, case study, project, resume, GitHub, or LinkedIn.", parameters: { type: "object", properties: { target: { type: "string" } }, required: ["target"] } } },
];

type SearchHit = { kind: string; title: string; excerpt: string; link: string };

function words(value: string) { return normalizeText(value).split(" ").filter((word) => word.length > 1); }
function score(corpus: string, query: string) { const terms = words(query); return terms.reduce((total, term) => total + (corpus.includes(term) ? 1 : 0), 0); }

function searchWork(query: string, kind: string) {
  const hits: SearchHit[] = [];
  if (kind === "all" || kind === "systems") {
    for (const study of caseStudies) {
      const corpus = normalizeText([study.title, study.summary, study.problem, study.tags.join(" "), study.aliases.join(" "), study.stack.join(" ")].join(" "));
      if (score(corpus, query) > 0) hits.push({ kind: "case-study", title: study.title, excerpt: study.oneLiner, link: getCaseStudyPath(study.slug) });
    }
  }
  if (kind === "all" || kind === "projects") {
    for (const project of projects) {
      const corpus = normalizeText([project.title, project.summary, project.description, project.tech.join(" ")].join(" "));
      if (score(corpus, query) > 0) hits.push({ kind: "project", title: project.title, excerpt: project.summary, link: getProjectAnchor(project.slug) });
    }
  }
  if (kind === "all" || kind === "experience") {
    for (const experience of experiences) {
      for (const bullet of experience.bullets) {
        const text = bulletText(bullet);
        if (score(normalizeText(`${experience.company} ${experience.role} ${text}`), query) > 0) {
          hits.push({ kind: "experience", title: `${experience.role} · ${experience.company}`, excerpt: text, link: "#experience" });
        }
      }
    }
  }
  const unique = Array.from(new Map(hits.map((hit) => [`${hit.kind}:${hit.title}:${hit.excerpt}`, hit])).values()).slice(0, 8);
  return { hits: unique, sources: Array.from(new Set(unique.map((hit) => hit.title))) };
}

const metricEntries = [
  ...stats.map((stat) => ({ aliases: [stat.label, `${stat.value}${stat.suffix}`], value: `${stat.value}${stat.suffix}`, label: stat.label, source: stat.href })),
  ...caseStudies.flatMap((study) => study.results.map((result) => ({ aliases: [result.label, result.metric, study.title], value: result.metric, label: result.label, source: getCaseStudyPath(study.slug) }))),
];

function getMetric(name: string) {
  const query = normalizeText(name);
  const found = metricEntries
    .map((entry) => {
      const aliasMatch = entry.aliases.some((alias) => {
        const normalized = normalizeText(alias);
        if (!normalized) return false;
        if (normalized.length >= 3) return query.includes(normalized) || normalized.includes(query);
        const numeric = normalized.match(/^\d+/)?.[0];
        if (!numeric || !query.split(" ").includes(numeric)) return false;
        return normalizeText(entry.label).split(" ").some((term) => term.length > 2 && query.split(" ").includes(term));
      });
      const labelMatches = normalizeText(entry.label).split(" ").filter((term) => term.length > 2 && query.split(" ").includes(term)).length;
      const exact = entry.aliases.some((alias) => normalizeText(alias) === query);
      return { entry, aliasMatch, score: (exact ? 100 : 0) + labelMatches };
    })
    .filter((candidate) => candidate.aliasMatch)
    .sort((a, b) => b.score - a.score)[0]?.entry;
  return found ? { measured: true, value: found.value, label: found.label, source: found.source } : { measured: false, note: "That metric is not documented in the portfolio. Do not estimate it." };
}

function toList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== "string") return [];
  try { const parsed = JSON.parse(value); if (Array.isArray(parsed)) return parsed.map(String); } catch { /* accept comma-delimited input */ }
  return value.split(/[\s,]+/).filter(Boolean);
}

function navigateTo(target: string) {
  const query = normalizeText(target);
  const fixed = [
    { terms: ["resume", "cv"], href: personalInfo.resumeUrl, label: "Resume" },
    { terms: ["github", "source"], href: personalInfo.github, label: "GitHub" },
    { terms: ["linkedin"], href: personalInfo.linkedin, label: "LinkedIn" },
    { terms: ["contact", "email"], href: "#contact", label: "Contact" },
    { terms: ["work", "case studies", "case study"], href: "/work", label: "Case studies" },
    { terms: ["experience"], href: "#experience", label: "Experience" },
    { terms: ["skills"], href: "#skills", label: "Skills" },
  ];
  const direct = fixed.find((item) => item.terms.some((term) => query.includes(term)));
  if (direct) return { ok: true, ...direct };
  const study = caseStudies.find((item) => [item.slug, item.title, ...item.aliases].some((term) => query.includes(normalizeText(term))));
  if (study) return { ok: true, href: getCaseStudyPath(study.slug), label: study.title };
  const project = projects.find((item) => query.includes(normalizeText(item.title)) || query.includes(normalizeText(item.slug)));
  if (project) return { ok: true, href: getProjectAnchor(project.slug), label: project.title };
  return { ok: false, reason: "No matching portfolio destination." };
}

function truncateArg(value: unknown) { const text = typeof value === "string" ? value : JSON.stringify(value); return text && text.length > 48 ? `${text.slice(0, 45)}...` : text ?? ""; }
export function formatToolCall(name: string, args: Record<string, unknown>) {
  const primary = args.query ?? args.slug ?? args.name ?? args.target ?? args.slugs;
  return `${name}(${primary === undefined ? "" : `"${truncateArg(primary)}"`})`;
}

export function executeTool(request: ToolCallRequest): ToolCallResult {
  const startedAt = Date.now();
  const finish = (output: unknown, summary: string, sources: string[] = [], refused = false): ToolCallResult => ({ id: request.id, name: request.name, output, summary, sources, refused, durationMs: Date.now() - startedAt });
  const { name, args } = request;
  if (name === "search_work") {
    const result = searchWork(String(args.query ?? ""), String(args.kind ?? "all"));
    return finish({ hits: result.hits, ...(result.hits.length ? {} : { note: "No verified match. Do not invent one." }) }, result.hits.length ? `${result.hits.length} matches` : "no matches", result.sources, result.hits.length === 0);
  }
  if (name === "get_case_study") {
    const study = caseStudyBySlug.get(String(args.slug ?? ""));
    if (!study) return finish({ found: false }, "not found", [], true);
    const section = String(args.section ?? "all");
    const base = { title: study.title, employer: study.employer, period: study.period, link: getCaseStudyPath(study.slug) };
    const sections: Record<string, unknown> = { problem: { ...base, problem: study.problem }, constraints: { ...base, constraints: study.constraints }, decisions: { ...base, decisions: study.decisions }, results: { ...base, results: study.results }, ownership: { ...base, ownership: study.ownership }, detail: { ...base, sections: study.sections } };
    return finish(section !== "all" && sections[section] ? sections[section] : { ...base, ...study }, section === "all" ? "full case study" : section, [study.title]);
  }
  if (name === "get_metric") {
    const result = getMetric(String(args.name ?? ""));
    return finish(result, result.measured ? String(result.value) : "not measured", result.measured ? [String(result.source)] : [], !result.measured);
  }
  if (name === "compare_systems") {
    const found = toList(args.slugs).map((slug) => caseStudyBySlug.get(slug)).filter((study) => study !== undefined);
    if (found.length < 2) return finish({ ok: false, reason: "Provide at least two valid case-study slugs." }, "too few systems", [], true);
    return finish({ systems: found.map((study) => ({ title: study.title, link: getCaseStudyPath(study.slug), stack: study.stack, results: study.results, ownership: study.ownership })) }, `${found.length} systems`, found.map((study) => study.title));
  }
  if (name === "navigate_to") {
    const result = navigateTo(String(args.target ?? ""));
    return finish(result, result.ok ? String(result.label) : "invalid target", [], !result.ok);
  }
  return finish({ ok: false, reason: `Unknown tool "${name}".` }, "unknown tool", [], true);
}

export const TOOL_NAMES = TOOL_DEFINITIONS.map((tool) => tool.function.name);
export const PROFILE_STAT_COUNT = stats.length;
