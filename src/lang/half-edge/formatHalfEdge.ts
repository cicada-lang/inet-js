import { Net } from "../net"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { Port } from "../port"
import { formatPort } from "../port/formatPort"
import { HalfEdge } from "./HalfEdge"

export function formatHalfEdge(net: Net, halfEdge: HalfEdge): string {
  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  const port = halfEdgeEntry.port
  if (port !== undefined) {
    return formatPort(net, port)
  }

  const otherHalfEdge = halfEdgeEntry.otherHalfEdge
  const otherHalfEdgeEntry = findHalfEdgeEntryOrFail(net, otherHalfEdge)
  const otherPort = otherHalfEdgeEntry.port
  const otherPortText = maybeFormatPort(net, otherPort)
  const portText = maybeFormatPort(net, port)

  return `#HalfEdge(${portText}, ${otherPortText})`
}

function maybeFormatPort(net: Net, port: Port | undefined): string {
  return port === undefined ? `#unconnected` : formatPort(net, port)
}
