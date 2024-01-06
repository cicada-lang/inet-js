import { capNodeNonPrinciplePorts } from "../cap/index.js"
import { createChecking } from "../checking/createChecking.js"
import { createEnv } from "../env/createEnv.js"
import { evaluateBlock } from "../evaluate/evaluateBlock.js"
import { type BlockStmt } from "../exp/BlockStmt.js"
import { refreshNode } from "../freshen/refreshNode.js"
import { findDefinitionOrFail } from "../mod/findDefinitionOrFail.js"
import { type Mod } from "../mod/index.js"
import { addNodeFromDefinition } from "../node/addNodeFromDefinition.js"
import { exposeRuleTargets } from "../rule/exposeRuleTargets.js"
import { type RuleTarget } from "../rule/index.js"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed.js"

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
