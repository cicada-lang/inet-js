import { type Port } from "../port/index.js"
import { type Net } from "./Net.js"
import { disconnectPortEntry } from "./disconnectPortEntry.js"
import { findNodeEntry } from "./findNodeEntry.js"

export function disconnectPort(net: Net, port: Port): void {
  const nodeEntry = findNodeEntry(net, port.node)
  if (nodeEntry === undefined) {
    return undefined
  }

  const portEntry = nodeEntry.ports[port.name]
  disconnectPortEntry(net, portEntry)
}
