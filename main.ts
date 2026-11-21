// Writes this entry's one-line joke to entry.txt in the output directory.
// The joke lives here, in the source, exactly as it is written to the file.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "Every line of the agent's PR was correct, which is how I knew none of it did what I asked.";

function checkJoke(text: string): void {
  // The bounty asks for one line of 1-280 characters; refuse to write
  // anything else, so a careless edit can never ship an invalid entry.
  if (text.length < 1 || text.length > 280) {
    throw new Error(`joke is ${text.length} characters; it must be 1-280`);
  }
  if (text.includes("\n") || text.trim().length === 0) {
    throw new Error("joke must be a single non-blank line");
  }
}

function main(): void {
  checkJoke(JOKE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
}

main();
