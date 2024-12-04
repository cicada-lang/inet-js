import { edgeEqual, type Edge } from "../edge/index.ts"
import { nodeKey, type Node } from "../node/index.ts"
import { type Net } from "./Net.ts"
import { findHalfEdgeEntry } from "./findHalfEdgeEntry.ts"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail.ts"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail.ts"
import { findPortRecordOrFail } from "./findPortRecordOrFail.ts"
import { hasNode } from "./hasNode.ts"

export function moveConnectedComponent(
  net: Net,
  component: Net,
  node: Node,
): void {
  moveNodeEntries(net, component, node)
  deleteHalfEdgeEntries(net, component)
  moveActiveEdges(net, component)
}

export function deleteHalfEdgeEntries(net: Net, component: Net): void {
  for (const halfEdgeEntry of component.halfEdgeEntries.values()) {
    net.halfEdgeEntries.delete(halfEdgeEntry.id)
  }
}

export function moveNodeEntries(net: Net, component: Net, node: Node): void {
  if (hasNode(component, node)) {
    return
  }

  const portRecord = findPortRecordOrFail(net, node)

  const entry = findNodeEntryOrFail(net, node)
  component.nodeEntries.set(nodeKey(node), entry)
  net.nodeEntries.delete(nodeKey(node))

  for (const portEntry of Object.values(portRecord)) {
    if (portEntry.connection) {
      const halfEdgeEntry = findHalfEdgeEntryOrFail(
        net,
        portEntry.connection.halfEdge,
      )

      const ohterHalfEdgeEntry = findHalfEdgeEntryOrFail(
        net,
        halfEdgeEntry.otherHalfEdge,
      )

      component.halfEdgeEntries.set(halfEdgeEntry.id, halfEdgeEntry)
      component.halfEdgeEntries.set(ohterHalfEdgeEntry.id, ohterHalfEdgeEntry)

      if (ohterHalfEdgeEntry.port) {
        moveNodeEntries(net, component, ohterHalfEdgeEntry.port.node)
      }
    }
  }
}

export function moveActiveEdges(net: Net, component: Net): void {
  const remainingActiveEdges: Array<Edge> = []

  for (const activeEdge of net.activeEdges) {
    const firstHalfEdgeEntry = findHalfEdgeEntry(component, activeEdge.first)
    if (firstHalfEdgeEntry === undefined) {
      remainingActiveEdges.push(activeEdge)
      continue
    }

    const secondHalfEdgeEntry = findHalfEdgeEntry(component, activeEdge.second)
    if (secondHalfEdgeEntry === undefined) {
      remainingActiveEdges.push(activeEdge)
      continue
    }

    const firstPort = firstHalfEdgeEntry.port
    if (firstPort === undefined) {
      remainingActiveEdges.push(activeEdge)
      continue
    }

    const secondPort = secondHalfEdgeEntry.port
    if (secondPort === undefined) {
      remainingActiveEdges.push(activeEdge)
      continue
    }

    if (
      hasNode(component, firstPort.node) &&
      hasNode(component, secondPort.node) &&
      !component.activeEdges.find((edge) => edgeEqual(edge, activeEdge))
    ) {
      component.activeEdges.push(activeEdge)
    } else {
      remainingActiveEdges.push(activeEdge)
    }
  }

  net.activeEdges = remainingActiveEdges
}
