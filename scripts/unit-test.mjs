/**
 * Unit tests for the pure logic the HTTP suite cannot reach: enquiry
 * validation, frame-scrub maths, and the contact-placeholder predicate.
 *   npx tsx scripts/unit-test.mjs
 */
import { validate, makeReference } from "../src/lib/enquiry.ts";
import { clampFrame, wrapFrame, keyDelta } from "../src/lib/scrub.ts";

let pass = 0, fail = 0;
const eq = (name, got, want) => {
  const a = JSON.stringify(got), b = JSON.stringify(want);
  if (a === b) pass++;
  else { fail++; console.log(`  FAIL ${name}\n       got  ${a}\n       want ${b}`); }
};
const has = (name, obj, key) => {
  if (key in obj) pass++;
  else { fail++; console.log(`  FAIL ${name} - expected an error on "${key}", got ${JSON.stringify(Object.keys(obj))}`); }
};
const none = (name, obj, key) => {
  if (!(key in obj)) pass++;
  else { fail++; console.log(`  FAIL ${name} - unexpected error on "${key}": ${obj[key]}`); }
};

console.log("\n── ENQUIRY VALIDATION ─────────────────────────────────────");
has("empty draft rejects name", validate({}), "name");
has("empty draft rejects phone", validate({}), "phone");
has("empty draft rejects date", validate({}), "date");
has("empty draft rejects slot", validate({}), "slot");
has("9-digit phone rejected", validate({ phone: "912345678" }), "phone");
none("10-digit phone accepted", validate({ phone: "9820098200" }), "phone");
none("spaced phone accepted", validate({ phone: "98200 98200" }), "phone");
has("blank name rejected", validate({ name: "   " }), "name");
none("real name accepted", validate({ name: "Priya" }), "name");
has("malformed email rejected", validate({ email: "not-an-email" }), "email");
none("valid email accepted", validate({ email: "a@b.co" }), "email");
none("omitted email is optional", validate({ name: "A" }), "email");
eq("complete draft has no errors",
  validate({ name: "Priya", phone: "9820098200", date: "2026-09-01", slot: "11:00 AM" }), {});

console.log("── REFERENCES ─────────────────────────────────────────────");
const refs = new Set(Array.from({ length: 200 }, () => makeReference()));
eq("references are unique across 200 draws", refs.size, 200);

console.log("── FRAME SCRUB MATHS ──────────────────────────────────────");
eq("clamp below floor", clampFrame(-5, 72), 0);
eq("clamp above ceiling", clampFrame(99, 72), 71);
eq("clamp inside range", clampFrame(30, 72), 30);
eq("wrap past the end", wrapFrame(75, 72), 3);
eq("wrap before the start", wrapFrame(-1, 72), 71);
eq("wrap exactly at count", wrapFrame(72, 72), 0);
eq("arrow right steps forward", Math.sign(keyDelta("ArrowRight", 72)), 1);
eq("arrow left steps back", Math.sign(keyDelta("ArrowLeft", 72)), -1);
// null, not 0 - the contract is `number | null` so the caller can tell
// "not my key, leave the event alone" from "move by zero".
eq("unrelated key returns null", keyDelta("Escape", 72), null);
eq("PageDown jumps an eighth", keyDelta("PageDown", 72), 9);
eq("PageUp jumps back an eighth", keyDelta("PageUp", 72), -9);

console.log("\n" + "═".repeat(60));
console.log(`  PASS ${pass}   FAIL ${fail}`);
process.exit(fail ? 1 : 0);
