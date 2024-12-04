import { type Checking } from "../checking/index.ts"
import { type Edge } from "../edge/index.ts"
import { type Env } from "../env/index.ts"
import { evaluateBlock } from "../evaluate/evaluateBlock.ts"
import { findRuleByPorts } from "../mod/findRuleByPorts.ts"
import { deleteHalfEdgeEntry } from "../net/deleteHalfEdgeEntry.ts"
import { deleteNodeEntry } from "../net/deleteNodeEntry.ts"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.ts"
import { findPortEntryOrFail } from "../net/findPortEntryOrFail.ts"
import { exposeRuleTargets } from "../rule/exposeRuleTargets.ts"

export type InteractOptions = {
  checking?: Checking
}

export function interact(
  env: Env,
  activeEdge: Edge,
  options: InteractOptions,
): void {
  const firstHaldEdgeEntry = findHalfEdgeEntryOrFail(env.net, activeEdge.first)
  const secondHaldEdgeEntry = findHalfEdgeEntryOrFail(
    env.net,
    activeEdge.second,
  )

  const firstPort = firstHaldEdgeEntry.port
  const secondPort = secondHaldEdgeEntry.port

  if (firstPort === undefined) {
    throw new Error(`[interact] I expect firstPort`)
  }

  if (secondPort === undefined) {
    throw new Error(`[interact] I expect secondPort`)
  }

  const rule = findRuleByPorts(env.mod, firstPort, secondPort)

  if (rule === undefined) return

  exposeRuleTargets(env, rule, [firstPort.node, secondPort.node])

  evaluateBlock(rule.mod, env, rule.body, options)

  const firstPortEntry = findPortEntryOrFail(env.net, firstPort)
  const secondPortEntry = findPortEntryOrFail(env.net, secondPort)

  if (firstPortEntry.connection !== undefined) {
    deleteHalfEdgeEntry(env.net, firstPortEntry.connection.halfEdge)
  }

  if (secondPortEntry.connection !== undefined) {
    deleteHalfEdgeEntry(env.net, secondPortEntry.connection.halfEdge)
  }

  deleteNodeEntry(env.net, firstPort.node)
  deleteNodeEntry(env.net, secondPort.node)
}
