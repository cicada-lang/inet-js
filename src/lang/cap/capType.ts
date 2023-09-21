import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findNodeEntryOrFail } from "../net/findNodeEntryOrFail"
import { findOutputPorts } from "../net/findOutputPorts"
import { Port } from "../port"
import { Value } from "../value"

export function capType(mod: Mod, net: Net, t: Value): Port {
  const parameter = {
    name: "covering",
    t,
    isPrincipal: false,
  }

  const node = addNode(net, mod, "@typeCap", [], [parameter])
  const nodeEntry = findNodeEntryOrFail(net, node)
  nodeEntry.asTypeCap = {}

  return findOutputPorts(net, node)[0]
}
