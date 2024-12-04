import { Loader } from "../../loader/index.ts"
import { defineBuiltins } from "../builtins/defineBuiltins.ts"
import { createChecking } from "../checking/createChecking.ts"
import { createEnv } from "../env/createEnv.ts"
import { type Stmt } from "../stmt/index.ts"
import { type Mod } from "./Mod.ts"

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
