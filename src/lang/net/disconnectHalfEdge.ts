import { HalfEdge } from "../half-edge"
import { Net } from "./Net"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail"
import { findPortEntryOrFail } from "./findPortEntryOrFail"

export function disconnectHalfEdge(net: Net, halfEdge: HalfEdge): void {
  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  const port = halfEdgeEntry.port
  delete halfEdgeEntry.port

  if (port !== undefined) {
    const portEntry = findPortEntryOrFail(net, port)
    delete portEntry.connection
  }
}
