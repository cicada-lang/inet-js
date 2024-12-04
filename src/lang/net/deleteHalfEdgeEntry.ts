import { type HalfEdge } from "../half-edge/index.ts"
import { type Net } from "./Net.ts"

export function deleteHalfEdgeEntry(net: Net, halfEdge: HalfEdge): void {
  net.halfEdgeEntries.delete(halfEdge.id)
}
