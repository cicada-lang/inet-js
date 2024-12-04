import { type HalfEdge } from "../half-edge/index.ts"
import { type HalfEdgeEntry, type Net } from "./Net.ts"

export function findHalfEdgeEntry(
  net: Net,
  halfEdge: HalfEdge,
): HalfEdgeEntry | undefined {
  return net.halfEdgeEntries.get(halfEdge.id)
}
