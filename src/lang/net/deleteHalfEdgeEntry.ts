import { type HalfEdge } from "../half-edge/index.js"
import { type Net } from "./Net.js"

export function deleteHalfEdgeEntry(net: Net, halfEdge: HalfEdge): void {
  net.halfEdgeEntries.delete(halfEdge.id)
}
