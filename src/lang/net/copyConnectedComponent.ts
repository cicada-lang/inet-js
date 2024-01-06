import { edgeEqual } from "../edge/index.js"
import { nodeKey, type Node } from "../node/index.js"
import { type Net } from "./Net.js"
import { cloneNodeEntry } from "./cloneNodeEntry.js"
import { findHalfEdgeEntry } from "./findHalfEdgeEntry.js"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail.js"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail.js"
import { findPortRecordOrFail } from "./findPortRecordOrFail.js"
import { hasNode } from "./hasNode.js"

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
