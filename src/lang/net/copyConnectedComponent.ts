import { edgeEqual } from "../edge"
import { Node, nodeKey } from "../node"
import { Net } from "./Net"
import { cloneNodeEntry } from "./cloneNodeEntry"
import { findHalfEdgeEntry } from "./findHalfEdgeEntry"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail"
import { findPortRecordOrFail } from "./findPortRecordOrFail"
import { hasNode } from "./hasNode"

export function copyConnectedComponent(
  net: Net,
  component: Net,
  node: Node,
): void {
  copyNodeEntries(net, component, node)
  copyActiveEdges(net, component)
}

export function copyNodeEntries(net: Net, component: Net, node: Node): void {
  if (hasNode(component, node)) {
    return
  }

  const portRecord = findPortRecordOrFail(net, node)

  const entry = findNodeEntryOrFail(net, node)
  component.nodeEntries.set(nodeKey(node), cloneNodeEntry(entry))

  for (const portEntry of Object.values(portRecord)) {
    if (portEntry.connection) {
      const halfEdgeEntry = findHalfEdgeEntryOrFail(
        net,
        portEntry.connection.halfEdge,
      )

      const otherHalfEdgeEntry = findHalfEdgeEntryOrFail(
        net,
        halfEdgeEntry.otherHalfEdge,
      )

      component.halfEdgeEntries.set(halfEdgeEntry.id, {
        ...halfEdgeEntry,
      })

      component.halfEdgeEntries.set(otherHalfEdgeEntry.id, {
        ...otherHalfEdgeEntry,
      })

      if (otherHalfEdgeEntry.port) {
        copyNodeEntries(net, component, otherHalfEdgeEntry.port.node)
      }
    }
  }
}

export function copyActiveEdges(net: Net, component: Net): void {
  for (const activeEdge of net.activeEdges) {
    const firstHalfEdgeEntry = findHalfEdgeEntry(component, activeEdge.first)
    if (firstHalfEdgeEntry === undefined) continue

    const secondHalfEdgeEntry = findHalfEdgeEntry(component, activeEdge.second)
    if (secondHalfEdgeEntry === undefined) continue

    const firstPort = firstHalfEdgeEntry.port
    if (firstPort === undefined) continue

    const secondPort = secondHalfEdgeEntry.port
    if (secondPort === undefined) continue

    if (
      hasNode(component, firstPort.node) &&
      hasNode(component, secondPort.node) &&
      !component.activeEdges.find((edge) => edgeEqual(edge, activeEdge))
    ) {
      component.activeEdges.push(activeEdge)
    }
  }
}
