import { checkPortSigns } from "../check/checkPortSigns.ts"
import { addEdge } from "../net/addEdge.ts"
import { findPortEntry } from "../net/findPortEntry.ts"
import { type Net } from "../net/index.ts"
import { formatPort } from "../port/formatPort.ts"
import { type Port } from "../port/index.ts"
import { connectHalfEdgeWithPort } from "./connectHalfEdgeWithPort.ts"

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

  connectHalfEdgeWithPort(net, edge.first, first)
  connectHalfEdgeWithPort(net, edge.second, second)
}
