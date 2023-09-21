import { RuleTarget } from "../rule"
import { formatParameterWithoutType } from "./formatParameterWithoutType"

export function formatRuleTarget(target: RuleTarget): string {
  const parameters = target.parameters
    .map(formatParameterWithoutType)
    .join(", ")

  return `${target.name}(${parameters})`
}
