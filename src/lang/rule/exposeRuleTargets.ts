import { type Env } from "../env/index.ts"
import { type Node } from "../node/index.ts"
import { type RuleTarget } from "./Rule.ts"
import { disconnectNodeAndMatchParameters } from "./disconnectNodeAndMatchParameters.ts"

export function exposeRuleTargets(
  env: Env,
  rule: { first: RuleTarget; second: RuleTarget },
  [firstNode, secondNode]: [Node, Node],
): void {
  if (
    rule.first.name === firstNode.name ||
    rule.second.name === secondNode.name
  ) {
    disconnectNodeAndMatchParameters(env, firstNode, rule.first.parameters)
    disconnectNodeAndMatchParameters(env, secondNode, rule.second.parameters)
    return
  }

  if (
    rule.first.name === secondNode.name ||
    rule.second.name === firstNode.name
  ) {
    disconnectNodeAndMatchParameters(env, secondNode, rule.first.parameters)
    disconnectNodeAndMatchParameters(env, firstNode, rule.second.parameters)
    return
  }
}
