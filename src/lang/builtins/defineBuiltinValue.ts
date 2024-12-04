import { type Mod } from "../mod/index.ts"
import { type Value } from "../value/index.ts"

export function defineBuiltinValue(mod: Mod, name: string, value: Value): void {
  mod.builtins.set(name, {
    "@type": "Definition",
    "@kind": "ValueDefinition",
    mod,
    name,
    value,
  })
}
