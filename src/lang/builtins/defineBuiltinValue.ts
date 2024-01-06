import { type Mod } from "../mod/index.js"
import { type Value } from "../value/index.js"

export function defineBuiltinValue(mod: Mod, name: string, value: Value): void {
  mod.builtins.set(name, {
    "@type": "Definition",
    "@kind": "ValueDefinition",
    mod,
    name,
    value,
  })
}
