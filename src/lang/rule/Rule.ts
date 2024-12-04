import { type BlockStmt } from "../exp/BlockStmt.ts"
import { type Mod } from "../mod/index.ts"
import { type ParameterWithoutType } from "../parameter/index.ts"

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
