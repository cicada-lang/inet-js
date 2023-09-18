import { Edge } from "../edge"
import { HalfEdge } from "../half-edge"
import { createHalfEdgeId } from "../half-edge/createHalfEdgeId"
import { HalfEdgeEntry, Net } from "../net"

export function addEdge(net: Net): Edge {
  const firstId = createHalfEdgeId()
  const firstHalfEdgeEntry = { id: firstId } as HalfEdgeEntry

  const secondId = createHalfEdgeId()
  const secondHalfEdgeEntry = { id: secondId } as HalfEdgeEntry

  const firstHalfEdge: HalfEdge = {
    "@type": "Value",
    "@kind": "HalfEdge",
    id: firstId,
  }

  const secondHalfEdge: HalfEdge = {
    "@type": "Value",
    "@kind": "HalfEdge",
    id: secondId,
  }

  firstHalfEdgeEntry.otherHalfEdge = secondHalfEdge
  secondHalfEdgeEntry.otherHalfEdge = firstHalfEdge

  net.halfEdgeEntries.set(firstId, firstHalfEdgeEntry)
  net.halfEdgeEntries.set(secondId, secondHalfEdgeEntry)

  return {
    first: firstHalfEdge,
    second: secondHalfEdge,
  }
}
