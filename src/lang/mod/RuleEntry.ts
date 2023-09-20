import { BlockStmt } from "../exp/BlockStmt"
import { RuleTarget } from "../stmt"
import { Mod } from "./Mod"

export type RuleTargetWithURL = RuleTarget & {
  url: URL
}

export type RuleEntry = {
  name: string
  mod: Mod
  first: RuleTargetWithURL
  second: RuleTargetWithURL
  body: Array<BlockStmt>
}
