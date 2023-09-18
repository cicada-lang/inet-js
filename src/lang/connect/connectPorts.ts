import { checkPortSigns } from "../check/checkPortSigns"
import { Net } from "../net"
import { addEdge } from "../net/addEdge"
import { findPortEntry } from "../net/findPortEntry"
import { Port } from "../port"
import { formatPort } from "../port/formatPort"
import { connectPortWithHalfEdge } from "./connectPortWithHalfEdge"

export function connectPorts(net: Net, first: Port, second: Port): void {
  const firstPortEntry = findPortEntry(net, first)
  if (firstPortEntry?.connection !== undefined) {
    console.trace()
    throw new Error(
      [
        `[connectPorts] The first port is already connected.`,
        ``,
        `  first port: ${formatPort(net, first)}`,
        `  second port: ${formatPort(net, second)}`,
      ].join("\n"),
    )
  }

  const secondPortEntry = findPortEntry(net, second)
  if (secondPortEntry?.connection !== undefined) {
    console.trace()
    throw new Error(
      [
        `[connectPorts] The second port is already connected.`,
        ``,
        `  first port: ${formatPort(net, first)}`,
        `  second port: ${formatPort(net, second)}`,
      ].join("\n"),
    )
  }

  checkPortSigns(net, first, second)

  const edge = addEdge(net)

  connectPortWithHalfEdge(net, first, edge.first)
  connectPortWithHalfEdge(net, second, edge.second)
}
