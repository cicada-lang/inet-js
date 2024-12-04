import { checkTypeTermArgs } from "../check/checkTypeTermArgs.ts"
import { type Env } from "../env/index.ts"
import { type EvaluateOptions } from "../evaluate/index.ts"
import { formatParameters } from "../parameter/index.ts"
import { formatValues } from "../value/formatValues.ts"
import { type TypeCtor, type Value } from "../value/index.ts"

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
