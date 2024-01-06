import { type HalfEdge } from "../half-edge/index.js"
import { type HalfEdgeEntry, type Net } from "./Net.js"

export function findHalfEdgeEntry(
  net: Net,
  halfEdge: HalfEdge,
): HalfEdgeEntry | undefined {
  return net.halfEdgeEntries.get(halfEdge.id)
}
