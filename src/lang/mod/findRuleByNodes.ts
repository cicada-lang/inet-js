import { nodeKeyWithoutId, type NodeWithoutId } from "../node/index.ts"
import { type Rule } from "../rule/index.ts"
import { type Mod } from "./Mod.ts"

export function findRuleByNodes(
  mod: Mod,
  firstNode: NodeWithoutId,
  secondNode: NodeWithoutId,
): Rule | undefined {
  const firstKey = nodeKeyWithoutId(firstNode)
  const secondKey = nodeKeyWithoutId(secondNode)

  return (
    mod.ruleEntries.get(`${firstKey} ${secondKey}`) ||
    mod.ruleEntries.get(`${secondKey} ${firstKey}`)
  )
}
