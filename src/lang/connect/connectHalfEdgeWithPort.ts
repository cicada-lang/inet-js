import { checkPortSigns } from "../check/checkPortSigns.js"
import { edgeEqual } from "../edge/index.js"
import { type HalfEdge } from "../half-edge/index.js"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.js"
import { findHalfEdgePort } from "../net/findHalfEdgePort.js"
import { findPortRecordOrFail } from "../net/findPortRecordOrFail.js"
import { type Net } from "../net/index.js"
import { type Port } from "../port/index.js"

export function connectHalfEdgeWithPort(
  net: Net,
  halfEdge: HalfEdge,
  port: Port,
): void {
  const portRecord = findPortRecordOrFail(net, port.node)
  portRecord[port.name].connection = { halfEdge }

  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  if (halfEdgeEntry.port !== undefined) {
    throw new Error(
      `[connectPortWithHalfEdge] halfEdgeEntry is already connected`,
    )
  }

  halfEdgeEntry.port = port

  const otherHalfEdge = halfEdgeEntry.otherHalfEdge
  const otherPort = findHalfEdgePort(net, otherHalfEdge)

  if (otherPort !== undefined) {
    checkPortSigns(net, port, otherPort)

    if (port.isPrincipal && otherPort.isPrincipal) {
      const edge = {
        first: halfEdge,
        second: otherHalfEdge,
      }

      if (!net.activeEdges.find((activeEdge) => edgeEqual(activeEdge, edge))) {
        net.activeEdges.push(edge)
      }
    }
  }
}
