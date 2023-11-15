import { capNodeNonPrinciplePorts } from "../cap"
import { createChecking } from "../checking/createChecking"
import { createEnv } from "../env/createEnv"
import { evaluateBlock } from "../evaluate/evaluateBlock"
import { BlockStmt } from "../exp/BlockStmt"
import { refreshNode } from "../freshen/refreshNode"
import { Mod } from "../mod"
import { findDefinitionOrFail } from "../mod/findDefinitionOrFail"
import { addNodeFromDefinition } from "../node/addNodeFromDefinition"
import { RuleTarget } from "../rule"
import { exposeRuleTargets } from "../rule/exposeRuleTargets"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed"

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
