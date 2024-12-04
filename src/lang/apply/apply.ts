import { type Env } from "../env/index.ts"
import { type EvaluateOptions } from "../evaluate/index.ts"
import { formatValue, type Value } from "../value/index.ts"
import { applyFunction } from "./applyFunction.ts"
import { applyNode } from "./applyNode.ts"
import { applyTypeCtor } from "./applyTypeCtor.ts"

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
