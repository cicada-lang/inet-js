import { type Port } from "../port/index.ts"
import { type Net } from "./Net.ts"
import { disconnectPortEntry } from "./disconnectPortEntry.ts"
import { findNodeEntry } from "./findNodeEntry.ts"

export function disconnectPort(net: Net, port: Port): void {
  const nodeEntry = findNodeEntry(net, port.node)
  if (nodeEntry === undefined) {
    return undefined
  }

  const portEntry = nodeEntry.ports[port.name]
  disconnectPortEntry(net, portEntry)
}
