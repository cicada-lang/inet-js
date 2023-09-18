import { Edge } from "../edge"
import { nodeKey } from "../node/nodeKey"
import { Net } from "./Net"
import { createNodeFromNodeEntry } from "./createNodeFromNodeEntry"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail"

export function allEdges(net: Net): Array<Edge> {
  const edges: Array<Edge> = []
  const occurred: Set<string> = new Set()

  for (const nodeEntry of net.nodeEntries.values()) {
    const node = createNodeFromNodeEntry(nodeEntry)

    for (const portEntry of Object.values(nodeEntry.ports)) {
      if (portEntry.connection) {
        const firstHalfEdge = portEntry.connection.halfEdge
        const firstHalfEdgeEntry = findHalfEdgeEntryOrFail(net, firstHalfEdge)

        const secondHalfEdge = firstHalfEdgeEntry.otherHalfEdge
        const secondHalfEdgeEntry = findHalfEdgeEntryOrFail(net, secondHalfEdge)

        const firstPort = firstHalfEdgeEntry.port
        const secondPort = secondHalfEdgeEntry.port

        if (firstPort !== undefined && secondPort !== undefined) {
          const firstOccur = `${nodeKey(node)}-${portEntry.name}`
          const secondOccur = `${nodeKey(secondPort.node)}-${secondPort.name}`

          if (
            !occurred.has(firstOccur + secondOccur) &&
            !occurred.has(secondOccur + firstOccur)
          ) {
            occurred.add(firstOccur + secondOccur)
            occurred.add(secondOccur + firstOccur)
            edges.push({ first: firstHalfEdge, second: secondHalfEdge })
          }
        }
      }
    }
  }

  return edges
}
