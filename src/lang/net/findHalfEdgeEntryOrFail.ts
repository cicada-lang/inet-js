import { type HalfEdge } from "../half-edge/index.js"
import { type HalfEdgeEntry, type Net } from "./Net.js"
import { findHalfEdgeEntry } from "./findHalfEdgeEntry.js"

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
