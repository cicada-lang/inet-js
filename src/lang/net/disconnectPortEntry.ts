import { type Net, type PortEntry } from "./Net.ts"
import { findHalfEdgeEntry } from "./findHalfEdgeEntry.ts"

export function disconnectPortEntry(net: Net, portEntry: PortEntry): void {
  const halfEdge = portEntry.connection?.halfEdge
  delete portEntry.connection

  if (halfEdge !== undefined) {
    const halfEdgeEntry = findHalfEdgeEntry(net, halfEdge)
    if (halfEdgeEntry === undefined) {
      throw new Error(`[disconnectPort] Fail to find halfEdgeEntry`)
    }

    delete halfEdgeEntry.port
  }
}
