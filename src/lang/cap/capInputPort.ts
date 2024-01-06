import { connectPorts } from "../connect/connectPorts.js"
import { type Mod } from "../mod/index.js"
import { addNode } from "../net/addNode.js"
import { findNodeEntryOrFail } from "../net/findNodeEntryOrFail.js"
import { findOutputPorts } from "../net/findOutputPorts.js"
import { type Net } from "../net/index.js"
import { type Port } from "../port/index.js"

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
