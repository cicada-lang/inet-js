import { type Rule } from "../rule/index.js"
import { type Mod } from "./Mod.js"
import { findDefinitionOrFail } from "./findDefinitionOrFail.js"
import { findRuleByNodes } from "./findRuleByNodes.js"

export function findRuleByName(mod: Mod, ruleName: string): Rule | undefined {
  const [firstName, secondName] = ruleName.split(" ")

  const firstDefinition = findDefinitionOrFail(mod, firstName)
  const secondDefinition = findDefinitionOrFail(mod, secondName)

  return findRuleByNodes(
    mod,
    { modId: firstDefinition.mod.url.href, name: firstDefinition.name },
    { modId: secondDefinition.mod.url.href, name: secondDefinition.name },
  )
}
