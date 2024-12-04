import { type Net } from "../net/index.ts"
import { formatNode } from "../node/formatNode.ts"
import { type Port } from "./Port.ts"

export function formatPort(net: Net, port: Port): string {
  if (port.isPrincipal) {
    return `!${port.name}-(${formatNode(net, port.node)})`
  } else {
    return `${port.name}-(${formatNode(net, port.node)})`
  }
}
