import { formatParameterWithoutType } from "../stmt/formatParameterWithoutType"
import { RuleTarget } from "./Rule"

export function formatRuleTarget(target: RuleTarget): string {
  const paramenters = target.parameters
    .map(formatParameterWithoutType)
    .join(", ")

  return `${target.name}(${paramenters})`
}
