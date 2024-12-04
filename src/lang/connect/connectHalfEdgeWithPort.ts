import { checkPortSigns } from "../check/checkPortSigns.ts"
import { edgeEqual } from "../edge/index.ts"
import { type HalfEdge } from "../half-edge/index.ts"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.ts"
import { findHalfEdgePort } from "../net/findHalfEdgePort.ts"
import { findPortRecordOrFail } from "../net/findPortRecordOrFail.ts"
import { type Net } from "../net/index.ts"
import { type Port } from "../port/index.ts"

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
