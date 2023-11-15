import { formatParameterWithoutType } from "../parameter"
import { RuleTarget } from "./Rule"

export function formatRuleTarget(target: RuleTarget): string {
  const parameters = target.parameters
    .map(formatParameterWithoutType)
    .join(", ")

  return `${target.name}(${parameters})`
}
