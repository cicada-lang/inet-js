import { Env } from "../env"
import { EvaluateOptions } from "../evaluate"
import { Value, formatValue } from "../value"
import { applyNode } from "./applyNode"

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
    if (target.definition.input.length !== args.length) {
      throw new Error(
        [
          `[apply / TypeCtor] I expect the number of args`,
          `  to be the same as the length of input parameters.`,
          ``,
          // `  args: [${formatValues(env, args)}]`
        ].join("\n"),
      )
    }

    // TODO
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
