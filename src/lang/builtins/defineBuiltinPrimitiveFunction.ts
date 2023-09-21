import { BuiltinApply } from "../definition"
import { Mod } from "../mod"

export function defineBuiltinPrimitiveFunction(
  mod: Mod,
  name: string,
  options: {
    apply: BuiltinApply
  },
): void {
  mod.builtins.set(name, {
    "@type": "Definition",
    "@kind": "PrimitiveFunctionDefinition",
    mod,
    name,
    apply: options.apply,
  })
}
