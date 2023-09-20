import { BlockStmt } from "../exp/BlockStmt"
import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId"
import { RuleTarget } from "../stmt"
import { Mod } from "./Mod"
import { findDefinitionOrFail } from "./findDefinitionOrFail"

export function defineRule(
  mod: Mod,
  first: RuleTarget,
  second: RuleTarget,
  body: Array<BlockStmt>,
): void {
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
