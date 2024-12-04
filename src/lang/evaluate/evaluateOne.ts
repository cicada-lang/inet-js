import { type Env } from "../env/index.ts"
import { formatExp, type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"
import { formatValue, type Value } from "../value/index.ts"
import { evaluate, type EvaluateOptions } from "./evaluate.ts"

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
