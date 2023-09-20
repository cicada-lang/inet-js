import { Env } from "../env"
import { EvaluateOptions } from "../evaluate"
import { Mod } from "../mod"

export function defineBuiltinOperator(
  mod: Mod,
  name: string,
  options: {
    compose: (env: Env, options: EvaluateOptions) => void
  },
): void {
  mod.builtins.set(name, {
    "@type": "Definition",
    "@kind": "OperatorDefinition",
    mod,
    name,
    compose: options.compose,
  })
}
