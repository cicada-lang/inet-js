import { type HalfEdge } from "../half-edge/index.js"
import { type Port } from "../port/index.js"
import { type Net } from "./Net.js"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail.js"

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
