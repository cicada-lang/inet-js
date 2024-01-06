import { type Edge } from "../edge/index.js"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.js"
import { type Net } from "../net/index.js"
import { formatNode } from "../node/formatNode.js"

export function formatEdge(net: Net, edge: Edge): string {
  const firstHalfEdgeEntry = findHalfEdgeEntryOrFail(net, edge.first)
  const secondHalfEdgeEntry = findHalfEdgeEntryOrFail(net, edge.second)

  const firstPort = firstHalfEdgeEntry.port
  const secondPort = secondHalfEdgeEntry.port

  if (firstPort === undefined && secondPort === undefined) {
    return `-- --`
  }

  if (firstPort === undefined && secondPort !== undefined) {
    const secondNodeText = formatNode(net, secondPort.node)
    if (secondPort.isPrincipal) {
      return `--!${secondPort.name}-(${secondNodeText})`
    } else {
      return `-- ${secondPort.name}-(${secondNodeText})`
    }
  }

  if (firstPort !== undefined && secondPort === undefined) {
    const firstNodeText = formatNode(net, firstPort.node)
    if (firstPort.isPrincipal) {
      return `(${firstNodeText})-${firstPort.name}!--`
    } else {
      return `(${firstNodeText})-${firstPort.name} --`
    }
  }

  if (firstPort !== undefined && secondPort !== undefined) {
    const firstNodeText = formatNode(net, firstPort.node)
    const secondNodeText = formatNode(net, secondPort.node)
    if (firstPort.isPrincipal && secondPort.isPrincipal) {
      return `(${firstNodeText})-${firstPort.name}!${secondPort.name}-(${secondNodeText})`
    } else {
      return `(${firstNodeText})-${firstPort.name} ${secondPort.name}-(${secondNodeText})`
    }
  }

  throw new Error(`[formatEdge] unreachable`)
}
