import { Env } from "../env"
import { defineLocals } from "../env/defineLocals"
import { EvaluateOptions } from "../evaluate"
import { evaluateBlock } from "../evaluate/evaluateBlock"
import { Function, Value, formatValue } from "../value"
import { formatValues } from "../value/formatValues"

export function applyFunction(
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
    const values = evaluateBlock(
      target.definition.mod,
      env,
      target.definition.body,
      options,
    )
    if (values.length !== 1) {
      throw new Error(
        [
          `[applyFunction] I expect a function to return one value.`,
          ``,
          `  values: [${formatValues(env, values)}]`,
        ].join("\n"),
      )
    }

    return values
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
