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
import { clampFrame, wrapFrame, keyDelta, reflectFrame } from "../src/lib/scrub.ts";

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

// The ring's arc is open (~280 degrees), so the playhead folds instead of
// wrapping - it must never step from the last frame to the first.
eq("reflect inside the range is identity", reflectFrame(30, 72), 30);
eq("reflect at the last frame", reflectFrame(71, 72), 71);
eq("reflect one past the end turns back", reflectFrame(72, 72), 70);
eq("reflect before the start turns back", reflectFrame(-1, 72), 1);
eq("reflect over a full period returns", reflectFrame(142, 72), 0);
eq("reflect never reaches a wrap seam",
   [reflectFrame(70, 72), reflectFrame(71, 72), reflectFrame(72, 72)].join(","), "70,71,70");

console.log("\n" + "═".repeat(60));
console.log(`  PASS ${pass}   FAIL ${fail}`);
process.exit(fail ? 1 : 0);
