import { manyTimes } from "../../utils/manyTimes.ts"
import { connectValues } from "../connect/connectValues.ts"
import { defineLocals } from "../env/defineLocals.ts"
import { type Env } from "../env/index.ts"
import { evaluateBlock } from "../evaluate/evaluateBlock.ts"
import { type EvaluateOptions } from "../evaluate/index.ts"
import { addEdge } from "../net/addEdge.ts"
import { formatValues } from "../value/formatValues.ts"
import { formatValue, type Function, type Value } from "../value/index.ts"

export function applyFunction(
  env: Env,
  target: Function,
  args: Array<Value>,
  options: EvaluateOptions,
): Array<Value> {
  const { mod, input, body } = target.definition

  if (args.length === input.length) {
    const inputNames = input.map((parameter) => parameter.name)
    defineLocals(env, inputNames, args)
    return evaluateBlock(mod, env, body, options)
  }

  if (args.length === input.length + 1) {
    const inputNames = input.map((parameter) => parameter.name)
    const inputArgs = args.slice(0, args.length - 1)
    const lastArg = args[args.length - 1]
    defineLocals(env, inputNames, inputArgs)
    const [value] = evaluateBlock(mod, env, body, options)
    connectValues(env, value, lastArg)
    return []
  }

  if (args.length < input.length) {
    const edges = manyTimes(input.length - args.length, () => addEdge(env.net))
    const inputNames = input.map((parameter) => parameter.name)
    defineLocals(env, inputNames, [...args, ...edges.map((edge) => edge.first)])
    return [
      ...edges.map((edge) => edge.second),
      ...evaluateBlock(mod, env, body, options),
    ]
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
