import * as path from "path";

import { check } from "@monorepo-lint/core";
import * as yargs from "yargs";

export default function run() {
  try {
    require("ts-node").register();
  } catch (err) {
    // no ts-node, no problem
  }
  yargs
    .command({
      command: "check [--verbose]",
      describe: "Checks the mono repo for lint violations",
      builder: y =>
        y.option("verbose", {
          count: true,
          type: "boolean"
        }),
      handler: handleCheck
    })
    .command({
      command: "fix",
      describe: "Checks the mono repo for lint violations",
      handler: handleFix
    })
    .demandCommand(1, "At least one command required")
    .help()
    .showHelpOnFail(true)
    .parse();
}

interface Args {
  fix: boolean;
  verbose: number;
}

function handleCheck(args: Args) {
  const opts = require(path.resolve(process.cwd(), "monorepo.lint.ts"));
  if (
    !check(
      {
        ...opts,
        fix: false,
        verbose: args.verbose > 0
      },
      process.cwd()
    )
  ) {
    // tslint:disable-next-line:no-console
    console.error("Failed");
    process.exit(100);
  }
}

function handleFix(args: Args) {
  const opts = require(path.resolve(process.cwd(), "monorepo.lint.ts"));
  if (
    !check(
      {
        ...opts,
        fix: true,
        verbose: args.verbose > 0
      },
      process.cwd()
    )
  ) {
    // tslint:disable-next-line:no-console
    console.error("Failed");
    process.exit(100);
  }
}
