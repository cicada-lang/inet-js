import { type Env } from "../env/index.js"
import { formatValues } from "../value/formatValues.js"
import { type Value } from "../value/index.js"

export function checkTypeTermArgs(env: Env, args: Array<Value>): void {
  for (const arg of args) {
    if (arg["@kind"] !== "Symbol" && arg["@kind"] !== "TypeTerm") {
      throw new Error(
        [
          `[checkTypeTermArgs] I expect all args of a TypeTerm to be Symbol or TypeTerm.`,
          ``,
          `  args: [${formatValues(env, args)}]`,
        ].join("\n"),
      )
    }
  }
}
