import { type HalfEdge } from "../half-edge/index.js"
import { type Port } from "../port/index.js"
import { type Net } from "./Net.js"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail.js"

export function findHalfEdgePort(
  net: Net,
  halfEdge: HalfEdge,
): Port | undefined {
  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  return halfEdgeEntry.port
}
