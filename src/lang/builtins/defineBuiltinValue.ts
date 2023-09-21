import { Mod } from "../mod"
import { Value } from "../value"

export function defineBuiltinValue(mod: Mod, name: string, value: Value): void {
  mod.builtins.set(name, {
    "@type": "Definition",
    "@kind": "ValueDefinition",
    mod,
    name,
    value,
  })
}
