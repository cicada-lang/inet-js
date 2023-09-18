import { Checking } from "../checking"
import { compose } from "../compose/compose"
import { Edge } from "../edge"
import { Env } from "../env"
import { findRuleByPorts } from "../mod/findRuleByPorts"
import { deleteHalfEdgeEntry } from "../net/deleteHalfEdgeEntry"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findPortEntryOrFail } from "../net/findPortEntryOrFail"

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

  for (const word of rule.words) {
    compose(rule.mod, env, word, {
      current: {
        first: firstPort.node,
        second: secondPort.node,
      },
      checking: options.checking,
    })
  }

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
