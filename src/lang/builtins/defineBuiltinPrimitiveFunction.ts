import { type PrimitiveApply } from "../definition/index.js"
import { type Mod } from "../mod/index.js"

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
