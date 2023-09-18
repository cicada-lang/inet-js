import { Edge } from "../edge"
import { Net } from "../net"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { formatNode } from "../node/formatNode"

export function formatEdge(net: Net, edge: Edge): string {
  const firstHalfEdgeEntry = findHalfEdgeEntryOrFail(net, edge.first)
  const secondHalfEdgeEntry = findHalfEdgeEntryOrFail(net, edge.second)

  const firstPort = firstHalfEdgeEntry.port
  const secondPort = secondHalfEdgeEntry.port

  if (firstPort === undefined) {
    throw new Error(`[formatEdge] I expect forstPort`)
  }

  if (secondPort === undefined) {
    throw new Error(`[formatEdge] I expect forstPort`)
  }

  const firstNodeText = formatNode(net, firstPort.node)
  const secondNodeText = formatNode(net, secondPort.node)

  if (firstPort.isPrincipal && secondPort.isPrincipal) {
    return `(${firstNodeText})-${firstPort.name}!${secondPort.name}-(${secondNodeText})`
  } else {
    return `(${firstNodeText})-${firstPort.name} ${secondPort.name}-(${secondNodeText})`
  }
}
