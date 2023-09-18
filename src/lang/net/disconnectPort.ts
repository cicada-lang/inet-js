import { Port } from "../port"
import { Net } from "./Net"
import { disconnectPortEntry } from "./disconnectPortEntry"
import { findNodeEntry } from "./findNodeEntry"

export function disconnectPort(net: Net, port: Port): void {
  const nodeEntry = findNodeEntry(net, port.node)
  if (nodeEntry === undefined) {
    return undefined
  }

  const portEntry = nodeEntry.ports[port.name]
  disconnectPortEntry(net, portEntry)
}
