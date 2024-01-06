import { type Net } from "../net/index.js"
import { formatNode } from "../node/formatNode.js"
import { type Port } from "./Port.js"

export function formatPort(net: Net, port: Port): string {
  if (port.isPrincipal) {
    return `!${port.name}-(${formatNode(net, port.node)})`
  } else {
    return `${port.name}-(${formatNode(net, port.node)})`
  }
}
