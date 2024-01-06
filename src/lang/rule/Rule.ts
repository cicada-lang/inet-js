import { type BlockStmt } from "../exp/BlockStmt.js"
import { type Mod } from "../mod/index.js"
import { type ParameterWithoutType } from "../parameter/index.js"

export type RuleTarget = {
  name: string
  parameters: Array<ParameterWithoutType>
}

export type Rule = {
  mod: Mod
  first: RuleTarget
  second: RuleTarget
  body: Array<BlockStmt>
}
