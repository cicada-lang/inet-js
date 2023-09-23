import { checkPortSigns } from "../check/checkPortSigns"
import { HalfEdge } from "../half-edge"
import { Net } from "../net"
import { deleteHalfEdgeEntry } from "../net/deleteHalfEdgeEntry"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"

export function connectHalfEdges(
  net: Net,
  firstHalfEdge: HalfEdge,
  secondHalfEdge: HalfEdge,
): void {
  const firstHalfEdgeEntry = findHalfEdgeEntryOrFail(net, firstHalfEdge)
  const secondHalfEdgeEntry = findHalfEdgeEntryOrFail(net, secondHalfEdge)

  const firstOtherHalfEdge = firstHalfEdgeEntry.otherHalfEdge
  const secondOtherHalfEdge = secondHalfEdgeEntry.otherHalfEdge

  const firstOtherHalfEdgeEntry = findHalfEdgeEntryOrFail(
    net,
    firstOtherHalfEdge,
  )
  const secondOtherHalfEdgeEntry = findHalfEdgeEntryOrFail(
    net,
    secondOtherHalfEdge,
  )

  firstOtherHalfEdgeEntry.otherHalfEdge = secondOtherHalfEdge
  secondOtherHalfEdgeEntry.otherHalfEdge = firstOtherHalfEdge

  deleteHalfEdgeEntry(net, firstHalfEdge)
  deleteHalfEdgeEntry(net, secondHalfEdge)

  const firstPort = firstOtherHalfEdgeEntry.port
  const secondPort = secondOtherHalfEdgeEntry.port

  if (firstPort !== undefined && secondPort !== undefined) {
    checkPortSigns(net, firstPort, secondPort)
    if (firstPort.isPrincipal && secondPort.isPrincipal) {
      net.activeEdges.push({
        first: firstOtherHalfEdge,
        second: secondOtherHalfEdge,
      })
    }
  }
}
