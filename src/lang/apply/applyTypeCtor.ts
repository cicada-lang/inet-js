import { checkTypeTermArgs } from "../check/checkTypeTermArgs.js"
import { type Env } from "../env/index.js"
import { type EvaluateOptions } from "../evaluate/index.js"
import { formatParameters } from "../parameter/index.js"
import { formatValues } from "../value/formatValues.js"
import { type TypeCtor, type Value } from "../value/index.js"

export function applyTypeCtor(
  env: Env,
  target: TypeCtor,
  args: Array<Value>,
  options: EvaluateOptions,
): Array<Value> {
  if (target.definition.input.length !== args.length) {
    throw new Error(
      [
        `[applyTypeCtor] I expect the number of args`,
        `  to be the same as the length of input parameters.`,
        ``,
        `  args: [${formatValues(env, args)}]`,
        `  input parameters: { ${formatParameters(
          env,
          target.definition.input,
        )} }`,
      ].join("\n"),
    )
  }

  checkTypeTermArgs(env, args)

  return [
    {
      "@type": "Value",
      "@kind": "TypeTerm",
      mod: target.definition.mod,
      name: target.definition.name,
      args,
    },
  ]
}
