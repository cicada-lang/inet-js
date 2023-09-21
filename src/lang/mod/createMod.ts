import { Loader } from "../../loader"
import { defineBuiltins } from "../builtins/defineBuiltins"
import { createChecking } from "../checking/createChecking"
import { createEnv } from "../env/createEnv"
import { Stmt } from "../stmt"
import { Mod } from "./Mod"

export function createMod(options: {
  url: URL
  text: string
  stmts: Array<Stmt>
  loader: Loader
}): Mod {
  const mod = {
    loader: options.loader,
    url: options.url,
    text: options.text,
    stmts: options.stmts,
    definitions: new Map(),
    builtins: new Map(),
    ruleEntries: new Map(),
    requiredMods: new Map(),
  } as Mod

  mod.env = createEnv(mod)
  mod.checking = createChecking()

  defineBuiltins(mod)

  return mod
}
