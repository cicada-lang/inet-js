import { Loader } from "../../loader/index.js"
import { defineBuiltins } from "../builtins/defineBuiltins.js"
import { createChecking } from "../checking/createChecking.js"
import { createEnv } from "../env/createEnv.js"
import { type Stmt } from "../stmt/index.js"
import { type Mod } from "./Mod.js"

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
