import { type HalfEdge } from "../half-edge/index.js"
import { type Node } from "../node/index.js"
import { type Net } from "./Net.js"
import { disconnectHalfEdge } from "./disconnectHalfEdge.js"
import { findInputPorts } from "./findInputPorts.js"
import { findOutputPorts } from "./findOutputPorts.js"
import { findPortEntryOrFail } from "./findPortEntryOrFail.js"

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
