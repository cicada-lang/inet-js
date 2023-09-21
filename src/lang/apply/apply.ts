import { Env } from "../env"
import { EvaluateOptions } from "../evaluate"
import { Mod } from "../mod"
import { Value, formatValue } from "../value"
import { applyFunction } from "./applyFunction"
import { applyNode } from "./applyNode"
import { applyTypeCtor } from "./applyTypeCtor"

export function apply(
  mod: Mod,
  env: Env,
  target: Value,
  args: Array<Value>,
  options: EvaluateOptions,
): Array<Value> {
  if (target["@kind"] === "Node") {
    return applyNode(mod, env, target, args, options)
  }

  if (target["@kind"] === "TypeCtor") {
    return applyTypeCtor(mod, env, target, args, options)
  }

  if (target["@kind"] === "Function") {
    return applyFunction(mod, env, target, args, options)
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
