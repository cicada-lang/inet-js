import { HalfEdge } from "../half-edge"
import { Port } from "../port"
import { Net } from "./Net"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail"

export function findHalfEdgePort(
  net: Net,
  halfEdge: HalfEdge,
): Port | undefined {
  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  return halfEdgeEntry.port
}
