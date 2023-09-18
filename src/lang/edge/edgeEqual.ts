import { halfEdgeEqual } from "../half-edge/halfEdgeEqual"
import { Edge } from "./Edge"

export function edgeEqual(x: Edge, y: Edge): boolean {
  return (
    (halfEdgeEqual(x.first, y.first) && halfEdgeEqual(x.second, y.second)) ||
    (halfEdgeEqual(x.first, y.second) && halfEdgeEqual(x.second, y.first))
  )
}
