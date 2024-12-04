import { type PrimitiveApply } from "../definition/index.ts"
import { type Mod } from "../mod/index.ts"

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
