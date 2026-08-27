/**
 * Full-site smoke suite. Run against a built server:
 *   npm run build && npx next start & node scripts/smoke-test.mjs
 *
 * Deterministic checks only - anything that needs judgement belongs in a
 * human pass. Exits non-zero on any FAIL so it can gate a deploy.
 */
import { gzipSync } from "node:zlib";

const BASE = process.env.BASE ?? "http://localhost:3000";
let pass = 0, fail = 0, warn = 0;
const F = [];
const ok = (n) => { pass++; };
const bad = (n, d) => { fail++; F.push(`FAIL  ${n}\n        ${d}`); };
const soft = (n, d) => { warn++; F.push(`WARN  ${n}\n        ${d}`); };
const check = (n, cond, detail) => (cond ? ok(n) : bad(n, detail));

const ROUTES = ["/", "/jewellery", "/jewellery/gold", "/jewellery/diamond",
  "/jewellery/polki", "/bespoke", "/enquire", "/chheda-promise",
  "/offers-and-plans", "/live-gold-rate", "/investors", "/journal",
  "/privacy", "/terms"];
const GONE = ["/edits", "/edits/bridal", "/nope", "/jewellery/silver"];

const get = async (p) => {
  const r = await fetch(BASE + p, { redirect: "manual" });
  return { status: r.status, html: await r.text(), headers: r.headers };
};

const pages = {};
console.log("\n── 1. ROUTES ──────────────────────────────────────────────");
for (const r of ROUTES) {
  const res = await get(r);
  pages[r] = res.html;
  check(`200 ${r}`, res.status === 200, `got ${res.status}`);
}
for (const r of GONE) {
  const res = await get(r);
  check(`404 ${r}`, res.status === 404, `got ${res.status} - soft 404s get indexed`);
}

console.log("── 2. SEO / METADATA ──────────────────────────────────────");
for (const [r, h] of Object.entries(pages)) {
  const title = h.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  check(`title ${r}`, title.length > 10 && title.length < 70, `"${title}" (${title.length} chars)`);
  check(`description ${r}`, /name="description" content="[^"]{50,}"/.test(h), "missing or too short");
  check(`canonical ${r}`, /rel="canonical"/.test(h), "missing");
  check(`og:image ${r}`, /property="og:image"/.test(h), "missing");
  check(`og:title ${r}`, /property="og:title"/.test(h), "missing");
}
const sm = await get("/sitemap.xml");
const smUrls = [...sm.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, "") || "/");
check("sitemap lists every route", ROUTES.every((r) => smUrls.includes(r)),
  `missing: ${ROUTES.filter((r) => !smUrls.includes(r))}`);
check("sitemap has no dead routes", smUrls.every((u) => ROUTES.includes(u)),
  `extra: ${smUrls.filter((u) => !ROUTES.includes(u))}`);
const rb = await get("/robots.txt");
check("robots.txt served", rb.status === 200, `got ${rb.status}`);
check("robots references sitemap", /sitemap/i.test(rb.html), "no Sitemap: line");

console.log("── 3. STRUCTURED DATA ─────────────────────────────────────");
for (const [r, h] of Object.entries(pages)) {
  for (const m of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { JSON.parse(m[1]); ok("ld+json"); }
    catch (e) { bad(`ld+json ${r}`, e.message.slice(0, 80)); }
  }
}

console.log("── 4. ACCESSIBILITY ───────────────────────────────────────");
for (const [r, h] of Object.entries(pages)) {
  const body = h.replace(/<svg[\s\S]*?<\/svg>/g, "");
  check(`one <h1> ${r}`, (h.match(/<h1[\s>]/g) ?? []).length === 1,
    `${(h.match(/<h1[\s>]/g) ?? []).length} found`);
  const lv = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  check(`no heading jumps ${r}`, lv.every((v, i) => i === 0 || v - lv[i - 1] <= 1),
    `sequence ${lv.join(",")}`);
  check(`imgs have alt ${r}`, !/<img(?![^>]*\balt=)[^>]*>/.test(body), "an <img> lacks alt");
  check(`html lang ${r}`, /<html[^>]*lang="[a-z]{2}/.test(h), "missing lang");
  // An <a> whose only child was an icon looks empty once SVGs are stripped,
  // but aria-label/title gives it an accessible name. Only flag links with
  // neither, which is the actual defect.
  const nameless = [...body.matchAll(/<a\b([^>]*)>\s*<\/a>/g)]
    .filter((m) => !/aria-label=|title=/.test(m[1]));
  check(`no nameless links ${r}`, nameless.length === 0,
    `${nameless.length}: ${nameless[0]?.[0].slice(0, 90)}`);
  check(`skip link ${r}`, /Skip to content/i.test(h), "no skip link");
}

console.log("── 5. LINK & ASSET INTEGRITY ──────────────────────────────");
const links = new Set(), assets = new Set();
for (const h of Object.values(pages)) {
  for (const m of h.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
    const u = m[1].split("?")[0];
    if (u.startsWith("/_next/")) continue;
    (/\.(jpg|png|svg|webp|woff2?|ico|json|webmanifest|xml|txt)$/i.test(u) || u.startsWith("/media") ? assets : links).add(u);
  }
}
for (const a of assets) {
  const r = await fetch(BASE + a, { method: "HEAD" });
  check(`asset ${a}`, r.status === 200, `got ${r.status}`);
}
for (const l of links) {
  const r = await fetch(BASE + l, { method: "HEAD" });
  check(`link ${l}`, r.status === 200, `got ${r.status}`);
}

console.log("── 6. SECURITY HEADERS ────────────────────────────────────");
const hd = (await fetch(BASE + "/")).headers;
for (const [k, want] of [["x-content-type-options", "nosniff"],
  ["x-frame-options", null], ["referrer-policy", null],
  ["content-security-policy", null], ["permissions-policy", null]]) {
  const v = hd.get(k);
  check(`header ${k}`, v && (!want || v.toLowerCase().includes(want)), `got "${v}"`);
}

console.log("── 7. PAYLOAD BUDGET ──────────────────────────────────────");
// Measured COMPRESSED, which is what a visitor actually downloads. Raw HTML
// is a misleading number: the homepage is 415 KB raw and ~60 KB on the wire.
// Note node's fetch transparently DECOMPRESSES, so asking for gzip and
// measuring the body still returns raw bytes - gzip it here instead.
for (const r of ROUTES) {
  const kb = gzipSync(Buffer.from(pages[r])).byteLength / 1024;
  if (kb > 200) bad(`wire size ${r}`, `${kb.toFixed(0)} KB compressed - over 200 KB`);
  else if (kb > 120) soft(`wire size ${r}`, `${kb.toFixed(0)} KB compressed`);
  else ok("wire size");
}

console.log("── 8. CONTENT INTEGRITY ───────────────────────────────────");
for (const [r, h] of Object.entries(pages)) {
  const text = h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  check(`no em/en dashes ${r}`, !/[–—]/.test(text), "found a long dash");
  check(`no lorem ${r}`, !/lorem ipsum/i.test(text), "placeholder copy");
  check(`no undefined/NaN ${r}`, !/\b(undefined|NaN|\[object Object\])\b/.test(text), "leaked value");
  check(`no dead tel/wa ${r}`, !/tel:\+?9?1?2?200000000|wa\.me\/910000000000/.test(h),
    "placeholder contact link is live");
}
check("no cart UI anywhere",
  !Object.values(pages).some((h) => /add to (cart|bag)|"quantity"|checkout/i.test(h.replace(/<script[\s\S]*?<\/script>/g, ""))),
  "commerce affordance found");

console.log("── 9. API ─────────────────────────────────────────────────");
const api = await get("/api/gold-rate");
check("gold-rate 200", api.status === 200, `got ${api.status}`);
try {
  const j = JSON.parse(api.html);
  check("gold-rate shape", Array.isArray(j.rates) && j.rates.length > 0, "no rates array");
  check("gold-rate has 22K", j.rates.some((x) => x.karat === "22K"), "missing 22K");
  check("indicative flagged", j.rates.every((x) => typeof x.indicative === "boolean"),
    "indicative flag missing - visitors must know it is not live");
} catch (e) { bad("gold-rate JSON", e.message); }

console.log("\n" + "═".repeat(60));
if (F.length) console.log(F.join("\n"));
console.log("═".repeat(60));
console.log(`  PASS ${pass}   WARN ${warn}   FAIL ${fail}`);
process.exit(fail ? 1 : 0);
