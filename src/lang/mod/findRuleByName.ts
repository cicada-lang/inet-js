import { type Rule } from "../rule/index.ts"
import { type Mod } from "./Mod.ts"
import { findDefinitionOrFail } from "./findDefinitionOrFail.ts"
import { findRuleByNodes } from "./findRuleByNodes.ts"

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
