import { Env } from "../env"
import { EvaluateOptions } from "../evaluate"
import { Mod } from "../mod"
import { formatParameters } from "../stmt/formatParameters"
import { TypeCtor, Value } from "../value"
import { formatValues } from "../value/formatValues"

export function applyTypeCtor(
  mod: Mod,
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

  return [
    {
      "@type": "Value",
      "@kind": "TypeTerm",
      name: target.definition.name,
      args,
    },
  ]
}