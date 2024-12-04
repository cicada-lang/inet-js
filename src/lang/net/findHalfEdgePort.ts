import { type HalfEdge } from "../half-edge/index.ts"
import { type Port } from "../port/index.ts"
import { type Net } from "./Net.ts"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail.ts"

export function findHalfEdgePort(
  net: Net,
  halfEdge: HalfEdge,
): Port | undefined {
  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  return halfEdgeEntry.port
}
