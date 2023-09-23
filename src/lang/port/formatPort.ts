import { Net } from "../net"
import { formatNode } from "../node/formatNode"
import { Port } from "./Port"

export function formatPort(net: Net, port: Port): string {
  if (port.isPrincipal) {
    return `!${port.name}-(${formatNode(net, port.node)})`
  } else {
    return `${port.name}-(${formatNode(net, port.node)})`
  }
}
