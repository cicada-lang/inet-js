import { connectHalfEdgeWithPort } from "../connect/connectHalfEdgeWithPort"
import { Net } from "../net"
import { addEdge } from "../net/addEdge"
import { Port } from "../port"
import { HalfEdge } from "./HalfEdge"

export function halfEdgeFromPort(net: Net, port: Port): HalfEdge {
  const edge = addEdge(net)
  connectHalfEdgeWithPort(net, edge.first, port)
  return edge.second
}
