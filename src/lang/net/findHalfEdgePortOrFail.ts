import { type HalfEdge } from "../half-edge/index.ts"
import { type Port } from "../port/index.ts"
import { type Net } from "./Net.ts"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail.ts"

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
