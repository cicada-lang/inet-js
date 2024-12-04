import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.ts"
import { type Net } from "../net/index.ts"
import { formatPort } from "../port/formatPort.ts"
import { type Port } from "../port/index.ts"
import { type HalfEdge } from "./HalfEdge.ts"

export function formatHalfEdgeOtherPort(net: Net, halfEdge: HalfEdge): string {
  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  const otherHalfEdge = halfEdgeEntry.otherHalfEdge
  const otherHalfEdgeEntry = findHalfEdgeEntryOrFail(net, otherHalfEdge)
  const otherPort = otherHalfEdgeEntry.port
  return maybeFormatPort(net, otherPort)
}

function maybeFormatPort(net: Net, port: Port | undefined): string {
  return port === undefined ? `#unconnected` : formatPort(net, port)
}
