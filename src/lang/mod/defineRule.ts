import { checkRuleIsAboutOwnNode } from "../check/checkRuleIsAboutOwnNode"
import { checkRuleNodeOrder } from "../check/checkRuleNodeOrder"
import { BlockStmt } from "../exp/BlockStmt"
import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId"
import { RuleTarget } from "../rule"
import { Mod } from "./Mod"
import { findDefinitionOrFail } from "./findDefinitionOrFail"

export function defineRule(
  mod: Mod,
  first: RuleTarget,
  second: RuleTarget,
  body: Array<BlockStmt>,
): void {
  checkRuleIsAboutOwnNode(mod, first.name, second.name)
  checkRuleNodeOrder(mod, first.name, second.name)

  const firstDefinition = findDefinitionOrFail(mod, first.name)
  const secondDefinition = findDefinitionOrFail(mod, second.name)

  const firstKey = nodeKeyWithoutId({
    url: firstDefinition.mod.url,
    name: firstDefinition.name,
  })

  const secondKey = nodeKeyWithoutId({
    url: secondDefinition.mod.url,
    name: secondDefinition.name,
  })

  const key = `${firstKey} ${secondKey}`
  const name = `${first.name} ${second.name}`

  mod.ruleEntries.set(key, {
    name,
    mod,
    first: {
      url: firstDefinition.mod.url,
      name: first.name,
      parameters: first.parameters,
    },
    second: {
      url: secondDefinition.mod.url,
      name: second.name,
      parameters: second.parameters,
    },
    body,
  })
}
