import { Net } from "../net"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { Port } from "../port"
import { formatPort } from "../port/formatPort"
import { HalfEdge } from "./HalfEdge"

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
