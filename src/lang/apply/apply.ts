import { type Env } from "../env/index.js"
import { type EvaluateOptions } from "../evaluate/index.js"
import { formatValue, type Value } from "../value/index.js"
import { applyFunction } from "./applyFunction.js"
import { applyNode } from "./applyNode.js"
import { applyTypeCtor } from "./applyTypeCtor.js"

export function apply(
  env: Env,
  target: Value,
  args: Array<Value>,
  options: EvaluateOptions,
): Array<Value> {
  if (target["@kind"] === "Node") {
    return applyNode(env, target, args, options)
  }

  if (target["@kind"] === "TypeCtor") {
    return applyTypeCtor(env, target, args, options)
  }

  if (target["@kind"] === "Function") {
    return applyFunction(env, target, args, options)
  }

  if (target["@kind"] === "PrimitiveFunction") {
    return target.definition.apply(env, args, options)
  }

  throw new Error(
    [
      `[apply] I can not apply target.`,
      ``,
      `  target: ${formatValue(env, target)}}`,
      `  args: [${args.map((arg) => formatValue(env, arg)).join(", ")}}]`,
    ].join("\n"),
  )
}
