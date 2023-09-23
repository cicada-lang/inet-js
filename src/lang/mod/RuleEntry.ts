import { BlockStmt } from "../exp/BlockStmt"
import { RuleTarget } from "../rule"
import { Mod } from "./Mod"

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
