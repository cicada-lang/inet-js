import { Env } from "../env"
import { defineLocals } from "../env/defineLocals"
import { EvaluateOptions } from "../evaluate"
import { Mod } from "../mod"
// import { evaluateBlock } from "../evaluate/evaluateBlock"
import { Function, Value, formatValue } from "../value"
import { formatValues } from "../value/formatValues"

export function applyFunction(
  mod: Mod,
  env: Env,
  target: Function,
  args: Array<Value>,
  options: EvaluateOptions,
): Array<Value> {
  if (target.definition.input.length === args.length) {
    const inputParameterNames = target.definition.input.map(
      (parameter) => parameter.name,
    )
    defineLocals(env, inputParameterNames, args)

    //  evaluateBlock(env, target.definition.body, options)
  }

  throw new Error(
    [
      `[applyFunction] Too many args.`,
      ``,
      `  function: ${formatValue(env, target)}`,
      `  args: [${formatValues(env, args)}]`,
    ].join("\n"),
  )
}
