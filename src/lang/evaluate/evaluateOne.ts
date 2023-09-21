import { Env } from "../env"
import { Exp, formatExp } from "../exp"
import { Mod } from "../mod"
import { Value, formatValue } from "../value"
import { EvaluateOptions, evaluate } from "./evaluate"

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
