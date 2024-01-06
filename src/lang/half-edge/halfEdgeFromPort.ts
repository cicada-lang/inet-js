import { connectHalfEdgeWithPort } from "../connect/connectHalfEdgeWithPort.js"
import { addEdge } from "../net/addEdge.js"
import { type Net } from "../net/index.js"
import { type Port } from "../port/index.js"
import { type HalfEdge } from "./HalfEdge.js"

export function halfEdgeFromPort(net: Net, port: Port): HalfEdge {
  const edge = addEdge(net)
  connectHalfEdgeWithPort(net, edge.first, port)
  return edge.second
}
