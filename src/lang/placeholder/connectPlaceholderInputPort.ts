import { connect } from "../connect/connect"
import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findInputPorts } from "../net/findInputPorts"
import { Port } from "../port"

export function connectPlaceholderInputPort(
  mod: Mod,
  net: Net,
  port: Port,
): Port {
  const nodeName = `_placeholder_input_node_for_${port.name}_of_${port.node.name}`
  const portName = `_placeholder_input_port_for_${port.name}_of_${port.node.name}`
  const node = addNode(
    net,
    mod,
    nodeName,
    [
      {
        "@type": "PortExp",
        name: portName,
        t: port.t,
        isPrincipal: true,
      },
    ],
    [],
  )

  const placeholderPort = findInputPorts(net, node)[0]

  connect(net, port, placeholderPort)

  return placeholderPort
}