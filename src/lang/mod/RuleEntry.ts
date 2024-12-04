import { type BlockStmt } from "../exp/BlockStmt.ts"
import { type RuleTarget } from "../rule/index.ts"
import { type Mod } from "./Mod.ts"

export type RuleTargetWithModId = RuleTarget & {
  modId: string
}

export type RuleEntry = {
  name: string
  mod: Mod
  first: RuleTargetWithModId
  second: RuleTargetWithModId
  body: Array<BlockStmt>
}
