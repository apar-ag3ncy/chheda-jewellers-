/**
 * Unit tests for the pure logic the HTTP suite cannot reach: frame-scrub
 * maths and the contact-placeholder predicate.
 *
 * The enquiry-validation and booking-reference blocks that used to open this
 * file went with src/lib/enquiry.ts when the booking page was removed. They
 * are not commented out here - dead tests for deleted code rot silently and
 * are worse than no tests. Git has them if the page ever returns.
 *   npx tsx scripts/unit-test.mjs
 */
import { clampFrame, wrapFrame, keyDelta } from "../src/lib/scrub.ts";

let pass = 0, fail = 0;
const eq = (name, got, want) => {
  const a = JSON.stringify(got), b = JSON.stringify(want);
  if (a === b) pass++;
  else { fail++; console.log(`  FAIL ${name}\n       got  ${a}\n       want ${b}`); }
};

console.log("\n── FRAME SCRUB MATHS ──────────────────────────────────────");
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
