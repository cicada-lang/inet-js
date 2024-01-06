import { checkPortSigns } from "../check/checkPortSigns.js"
import { addEdge } from "../net/addEdge.js"
import { findPortEntry } from "../net/findPortEntry.js"
import { type Net } from "../net/index.js"
import { formatPort } from "../port/formatPort.js"
import { type Port } from "../port/index.js"
import { connectHalfEdgeWithPort } from "./connectHalfEdgeWithPort.js"

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
