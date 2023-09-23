import { Edge } from "../edge"
import { HalfEdge } from "../half-edge"
import { Port } from "../port"
import { Sign } from "../sign"
import { Value } from "../value"

/*

  A net is an undirected graph where each edge
  must be connected through ports.

  We implement a net like adjacency list,
  but the list of nodes is replaced by a record of ports.

*/

export type Net = {
  activeEdges: Array<Edge>
  nodeEntries: Map<string, NodeEntry>
  halfEdgeEntries: Map<string, HalfEdgeEntry>
}

export type HalfEdgeEntry = {
  id: string
  port?: Port
  otherHalfEdge: HalfEdge
}

export type NodeEntry = {
  modId: string
  id: string
  name: string
  ports: PortRecord
  asTypeCap?: {}
  asPortCap?: {
    nodeName: string
    portName: string
  }
}

export type PortRecord = Record<string, PortEntry>

export type PortEntry = {
  name: string
  sign: Sign
  t: Value
  isPrincipal: boolean
  connection?: Connection
}

// For a shared-memory multithread implementation.
// - We must define `EdgeEntry`.
// - `Net` must have `edgeEntries: Map<string, EdgeEntry>`.
// - Port must connect to edge instead of port,
//   so that parallel updates of the net will not
//   interfere with each other.

export type Connection = {
  halfEdge: HalfEdge
}
