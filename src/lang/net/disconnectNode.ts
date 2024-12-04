import { type HalfEdge } from "../half-edge/index.ts"
import { type Node } from "../node/index.ts"
import { type Net } from "./Net.ts"
import { disconnectHalfEdge } from "./disconnectHalfEdge.ts"
import { findInputPorts } from "./findInputPorts.ts"
import { findOutputPorts } from "./findOutputPorts.ts"
import { findPortEntryOrFail } from "./findPortEntryOrFail.ts"

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
