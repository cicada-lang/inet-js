import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.js"
import { type Net } from "../net/index.js"
import { formatPort } from "../port/formatPort.js"
import { type Port } from "../port/index.js"
import { type HalfEdge } from "./HalfEdge.js"

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
