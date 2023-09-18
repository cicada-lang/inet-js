import { HalfEdge } from "../half-edge"
import { Port } from "../port"
import { Net } from "./Net"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail"

export function findHalfEdgePortOrFail(net: Net, halfEdge: HalfEdge): Port {
  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  if (halfEdgeEntry.port === undefined) {
    console.trace()
    throw new Error(
      `[findHalfEdgePortOrFail] I expect halfEdgeEntry to have port.`,
    )
  }
  return halfEdgeEntry.port
}
