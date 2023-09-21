import { connectPorts } from "../connect/connectPorts"
import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findNodeEntryOrFail } from "../net/findNodeEntryOrFail"
import { findOutputPorts } from "../net/findOutputPorts"
import { Port } from "../port"

export function capInputPort(mod: Mod, net: Net, port: Port): Port {
  const parameter = {
    name: "covering",
    t: port.t,
    isPrincipal: false,
  }

  const node = addNode(net, mod, "@inputPortCap", [], [parameter])
  const nodeEntry = findNodeEntryOrFail(net, node)
  nodeEntry.asPortCap = {
    nodeName: port.node.name,
    portName: port.name,
  }

  const capPort = findOutputPorts(net, node)[0]
  connectPorts(net, port, capPort)
  return capPort
}
