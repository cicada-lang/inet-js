import { connectPorts } from "../connect/connectPorts.ts"
import { type Mod } from "../mod/index.ts"
import { addNode } from "../net/addNode.ts"
import { findInputPorts } from "../net/findInputPorts.ts"
import { findNodeEntryOrFail } from "../net/findNodeEntryOrFail.ts"
import { type Net } from "../net/index.ts"
import { type Port } from "../port/index.ts"

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
