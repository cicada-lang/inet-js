import { type HalfEdge } from "../half-edge/index.js"
import { type Net } from "./Net.js"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail.js"
import { findPortEntryOrFail } from "./findPortEntryOrFail.js"

export function disconnectHalfEdge(net: Net, halfEdge: HalfEdge): void {
  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  const port = halfEdgeEntry.port
  delete halfEdgeEntry.port

  if (port !== undefined) {
    const portEntry = findPortEntryOrFail(net, port)
    delete portEntry.connection
  }
}
