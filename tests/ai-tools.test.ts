import test from "node:test";
import assert from "node:assert/strict";

import { TOOL_DEFINITIONS, TOOL_NAMES, executeTool, formatToolCall } from "../src/lib/ai-tools.ts";
import { caseStudies } from "../src/data/case-studies.ts";

const call = (name: string, args: Record<string, unknown>) => executeTool({ id: "t1", name, args });

test("all assistant tools use valid function schemas", () => {
  assert.deepEqual(TOOL_NAMES, ["search_work", "get_case_study", "get_metric", "compare_systems", "navigate_to"]);
  for (const tool of TOOL_DEFINITIONS) {
    assert.equal(tool.type, "function");
    assert.ok(tool.function.description.length > 20);
    assert.equal(tool.function.parameters.type, "object");
    assert.ok(Array.isArray(tool.function.parameters.required));
  }
});

test("search_work finds Yash's production GraphRAG and MCP work", () => {
  for (const query of ["GraphRAG", "MCP servers", "Azure OpenAI"]) {
    const result = call("search_work", { query });
    assert.ok((result.output as { hits: unknown[] }).hits.length > 0, `${query} should be searchable`);
    assert.equal(result.refused, false);
  }
});

test("search_work returns an honest empty result for unrelated claims", () => {
  const result = call("search_work", { query: "quantum blockchain casino" });
  assert.deepEqual((result.output as { hits: unknown[] }).hits, []);
  assert.equal(result.refused, true);
});

test("get_metric resolves verified portfolio figures and rejects unknown ones", () => {
  const mcp = call("get_metric", { name: "12+ MCP servers" });
  assert.equal((mcp.output as { measured: boolean }).measured, true);
  assert.match(String((mcp.output as { value: string }).value), /12\+/);

  const unknown = call("get_metric", { name: "monthly active users" });
  assert.equal((unknown.output as { measured: boolean }).measured, false);
  assert.equal(unknown.refused, true);
});

test("a metric query cannot accidentally match a shorter unrelated number", () => {
  const result = call("get_metric", { name: "8 production repositories" });
  assert.equal((result.output as { measured: boolean }).measured, false);
});

test("case study tools return full studies and individual sections", () => {
  for (const study of caseStudies) {
    const full = call("get_case_study", { slug: study.slug });
    assert.equal((full.output as { title: string }).title, study.title);
    assert.equal(full.refused, false);
  }
  const section = call("get_case_study", { slug: "enterprise-graphrag", section: "ownership" });
  assert.match(String((section.output as { ownership: string }).ownership), /Yash/);
  assert.equal((section.output as { problem?: string }).problem, undefined);
});

test("compare_systems accepts array, comma-delimited, and JSON list arguments", () => {
  const args = [
    ["office-of-agents", "enterprise-graphrag"],
    "office-of-agents,enterprise-graphrag",
    '["office-of-agents","enterprise-graphrag"]',
  ];
  const outputs = args.map((slugs) => call("compare_systems", { slugs }).output);
  assert.deepEqual(outputs[0], outputs[1]);
  assert.deepEqual(outputs[0], outputs[2]);
});

test("navigation only returns portfolio destinations", () => {
  assert.equal((call("navigate_to", { target: "resume" }).output as { href: string }).href, "/Yash_Srivastava_RAI.pdf");
  assert.equal((call("navigate_to", { target: "enterprise-graphrag" }).output as { href: string }).href, "/work/enterprise-graphrag");
  const rejected = call("navigate_to", { target: "/admin" });
  assert.equal(rejected.refused, true);
});

test("unknown tools fail closed and labels stay compact", () => {
  assert.equal(call("delete_everything", {}).refused, true);
  assert.equal(formatToolCall("search_work", { query: "rag" }), 'search_work("rag")');
  assert.ok(formatToolCall("search_work", { query: "x".repeat(120) }).length < 70);
});
