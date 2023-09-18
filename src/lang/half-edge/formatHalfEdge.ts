import { Net } from "../net"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { formatNode } from "../node"
import { HalfEdge } from "./HalfEdge"

export function formatHalfEdge(net: Net, halfEdge: HalfEdge): string {
  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  const port = halfEdgeEntry.port
  if (port === undefined) {
    return "-- "
  }

  if (port.isPrincipal) {
    return `(${formatNode(net, port.node)})-${port.name}!`
  } else {
    return `(${formatNode(net, port.node)})-${port.name}`
  }
}
