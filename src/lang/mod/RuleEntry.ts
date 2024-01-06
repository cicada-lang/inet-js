import { type BlockStmt } from "../exp/BlockStmt.js"
import { type RuleTarget } from "../rule/index.js"
import { type Mod } from "./Mod.js"

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
