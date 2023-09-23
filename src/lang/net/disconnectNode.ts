import { HalfEdge } from "../half-edge"
import { Node } from "../node"
import { Net } from "./Net"
import { disconnectHalfEdge } from "./disconnectHalfEdge"
import { findInputPorts } from "./findInputPorts"
import { findOutputPorts } from "./findOutputPorts"
import { findPortEntryOrFail } from "./findPortEntryOrFail"

export function disconnectNode(
  net: Net,
  node: Node,
): Array<HalfEdge | undefined> {
  const ports = [...findInputPorts(net, node), ...findOutputPorts(net, node)]
  return ports.map((port) => {
    const portEntry = findPortEntryOrFail(net, port)

    if (portEntry.connection === undefined) {
      return undefined
    }

    const halfEdge = portEntry.connection.halfEdge
    disconnectHalfEdge(net, halfEdge)
    return halfEdge
  })
}
