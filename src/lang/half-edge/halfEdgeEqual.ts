import { HalfEdge } from "./HalfEdge"

export function halfEdgeEqual(x: HalfEdge, y: HalfEdge): boolean {
  return x.id === y.id
}
