import { type HalfEdge } from "../half-edge/index.ts"
import { type Net } from "./Net.ts"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail.ts"
import { findPortEntryOrFail } from "./findPortEntryOrFail.ts"

export function disconnectHalfEdge(net: Net, halfEdge: HalfEdge): void {
  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  const port = halfEdgeEntry.port
  delete halfEdgeEntry.port

  if (port !== undefined) {
    const portEntry = findPortEntryOrFail(net, port)
    delete portEntry.connection
  }
}
