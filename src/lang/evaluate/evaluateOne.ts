import { type Env } from "../env/index.js"
import { formatExp, type Exp } from "../exp/index.js"
import { type Mod } from "../mod/index.js"
import { formatValue, type Value } from "../value/index.js"
import { evaluate, type EvaluateOptions } from "./evaluate.js"

export function evaluateOne(
  mod: Mod,
  env: Env,
  exp: Exp,
  options: EvaluateOptions,
): Value {
  const values = evaluate(mod, env, exp, options)
  if (values.length !== 1) {
    throw new Error(
      [
        `[evaluateOne] I expect result of evaluating the exp to be one value.`,
        ``,
        `  exp: ${formatExp(exp)}`,
        `  values: [${values
          .map((value) => formatValue(env, value))
          .join(", ")}]`,
      ].join("\n"),
    )
  }

  return values[0]
}
