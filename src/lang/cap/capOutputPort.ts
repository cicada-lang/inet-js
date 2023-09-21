import { connectPorts } from "../connect/connectPorts"
import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findInputPorts } from "../net/findInputPorts"
import { findNodeEntryOrFail } from "../net/findNodeEntryOrFail"
import { Port } from "../port"

export function capOutputPort(mod: Mod, net: Net, port: Port): Port {
  const parameter = {
    name: "covering",
    t: port.t,
    isPrincipal: false,
  }

  const node = addNode(net, mod, "@ouputPortCap", [parameter], [])
  const nodeEntry = findNodeEntryOrFail(net, node)
  nodeEntry.asPortCap = {
    nodeName: port.node.name,
    portName: port.name,
  }

  const capPort = findInputPorts(net, node)[0]
  connectPorts(net, port, capPort)
  return capPort
}
