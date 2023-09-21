import { PrimitiveApply } from "../definition"
import { Mod } from "../mod"

export function defineBuiltinPrimitiveFunction(
  mod: Mod,
  name: string,
  options: {
    apply: PrimitiveApply
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
