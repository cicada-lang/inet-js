import { connectHalfEdgeWithPort } from "../connect/connectHalfEdgeWithPort.ts"
import { addEdge } from "../net/addEdge.ts"
import { type Net } from "../net/index.ts"
import { type Port } from "../port/index.ts"
import { type HalfEdge } from "./HalfEdge.ts"

export function halfEdgeFromPort(net: Net, port: Port): HalfEdge {
  const edge = addEdge(net)
  connectHalfEdgeWithPort(net, edge.first, port)
  return edge.second
}
