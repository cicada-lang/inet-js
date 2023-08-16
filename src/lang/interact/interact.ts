import { Checking } from "../checking"
import { compose } from "../compose/compose"
import { Edge } from "../edge"
import { Env } from "../env"
import { lookupRuleByPorts } from "../mod/lookupRuleByPorts"
import { deleteNodeEntry } from "../net/deleteNodeEntry"

export type InteractOptions = {
  checking?: Checking
}

export function interact(
  env: Env,
  activeEdge: Edge,
  options: InteractOptions,
): void {
  const rule = lookupRuleByPorts(env.mod, activeEdge.first, activeEdge.second)
  if (rule === undefined) return

  for (const word of rule.words) {
    compose(rule.mod, env, word, {
      current: {
        first: activeEdge.first.node,
        second: activeEdge.second.node,
      },
      checking: options.checking,
    })
  }

  deleteNodeEntry(env.net, activeEdge.first.node)
  deleteNodeEntry(env.net, activeEdge.second.node)
}
