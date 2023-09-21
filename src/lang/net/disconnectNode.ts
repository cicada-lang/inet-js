import { HalfEdge } from "../half-edge"
import { Node } from "../node"
import { formatPort } from "../port/formatPort"
import { Net } from "./Net"
import { disconnectHalfEdge } from "./disconnectHalfEdge"
import { findInputPorts } from "./findInputPorts"
import { findOutputPorts } from "./findOutputPorts"
import { findPortEntryOrFail } from "./findPortEntryOrFail"

export function disconnectNode(net: Net, node: Node): Array<HalfEdge> {
  const ports = [...findInputPorts(net, node), ...findOutputPorts(net, node)]
  return ports.map((port) => {
    const portEntry = findPortEntryOrFail(net, port)

    if (portEntry.connection === undefined) {
      throw new Error(
        [
          `[disconnectNode] I expect port to have connection.`,
          ``,
          `  port: ${formatPort(net, port)}`,
        ].join("\n"),
      )
    }

    const halfEdge = portEntry.connection.halfEdge
    disconnectHalfEdge(net, halfEdge)
    return halfEdge
  })
}
