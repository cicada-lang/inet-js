import { connectPortWithHalfEdge } from "../connect/connectPortWithHalfEdge"
import { Net } from "../net"
import { addEdge } from "../net/addEdge"
import { Port } from "../port"
import { HalfEdge } from "./HalfEdge"

export function halfEdgeFromPort(net: Net, port: Port): HalfEdge {
  const edge = addEdge(net)
  connectPortWithHalfEdge(net, port, edge.first)
  return edge.second
}
