import { formatParameterWithoutType } from "../parameter/index.ts"
import { type RuleTarget } from "./Rule.ts"

export function formatRuleTarget(target: RuleTarget): string {
  const parameters = target.parameters
    .map(formatParameterWithoutType)
    .join(", ")

  return `${target.name}(${parameters})`
}
