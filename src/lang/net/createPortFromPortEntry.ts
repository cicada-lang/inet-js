import { Node } from "../node"
import { Port } from "../port"
import { PortEntry } from "./Net"

export function createPortFromPortEntry(
  node: Node,
  portEntry: PortEntry,
): Port {
  return {
    node,
    name: portEntry.name,
    sign: portEntry.sign,
    t: portEntry.t,
    isPrincipal: portEntry.isPrincipal,
  }
}
