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
  const { mod, input, body } = target.definition

  if (input.length === args.length) {
    const inputParameterNames = input.map((parameter) => parameter.name)
    defineLocals(env, inputParameterNames, args)
    return evaluateBlock(mod, env, body, options)
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
