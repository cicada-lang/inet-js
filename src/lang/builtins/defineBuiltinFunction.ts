import { BuiltinApply } from "../definition"
import { Mod } from "../mod"

export function defineBuiltinFunction(
  mod: Mod,
  name: string,
  options: {
    apply: BuiltinApply
  },
): void {
  mod.builtins.set(name, {
    "@type": "Definition",
    "@kind": "BuiltinFunctionDefinition",
    mod,
    name,
    apply: options.apply,
  })
}
