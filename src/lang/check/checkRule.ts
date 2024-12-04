import { capNodeNonPrinciplePorts } from "../cap/index.ts"
import { createChecking } from "../checking/createChecking.ts"
import { createEnv } from "../env/createEnv.ts"
import { evaluateBlock } from "../evaluate/evaluateBlock.ts"
import { type BlockStmt } from "../exp/BlockStmt.ts"
import { refreshNode } from "../freshen/refreshNode.ts"
import { findDefinitionOrFail } from "../mod/findDefinitionOrFail.ts"
import { type Mod } from "../mod/index.ts"
import { addNodeFromDefinition } from "../node/addNodeFromDefinition.ts"
import { exposeRuleTargets } from "../rule/exposeRuleTargets.ts"
import { type RuleTarget } from "../rule/index.ts"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed.ts"

export function checkRule(
  mod: Mod,
  first: RuleTarget,
  second: RuleTarget,
  body: Array<BlockStmt>,
): void {
  const checking = createChecking()
  const env = createEnv(mod)

  const firstNode = addNodeFromDefinition(
    env.net,
    findDefinitionOrFail(mod, first.name),
  )

  refreshNode(env.net, checking.typeVarCounters, firstNode)

  const secondNode = addNodeFromDefinition(
    env.net,
    findDefinitionOrFail(mod, second.name),
  )

  refreshNode(env.net, checking.typeVarCounters, secondNode)

  capNodeNonPrinciplePorts(mod, env.net, firstNode)
  capNodeNonPrinciplePorts(mod, env.net, secondNode)

  exposeRuleTargets(env, { first, second }, [firstNode, secondNode])
  evaluateBlock(mod, env, body, { checking })

  checkAllLocalsAreUsed(env.locals)
}
