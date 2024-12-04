import { type HalfEdge } from "../half-edge/index.ts"
import { type HalfEdgeEntry, type Net } from "./Net.ts"
import { findHalfEdgeEntry } from "./findHalfEdgeEntry.ts"

export function findHalfEdgeEntryOrFail(
  net: Net,
  halfEdge: HalfEdge,
): HalfEdgeEntry {
  const halfEdgeEntry = findHalfEdgeEntry(net, halfEdge)
  if (halfEdgeEntry === undefined) {
    console.trace()
    throw new Error(`[findHalfEdgeEntryOrFail] Undefined halfEdgeEntry`)
  }

  return halfEdgeEntry
}
