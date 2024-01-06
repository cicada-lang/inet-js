import { formatParameterWithoutType } from "../parameter/index.js"
import { type RuleTarget } from "./Rule.js"

export function formatRuleTarget(target: RuleTarget): string {
  const parameters = target.parameters
    .map(formatParameterWithoutType)
    .join(", ")

  return `${target.name}(${parameters})`
}
