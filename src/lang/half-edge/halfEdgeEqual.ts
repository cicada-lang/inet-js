import { type HalfEdge } from "./HalfEdge.js"

export function halfEdgeEqual(x: HalfEdge, y: HalfEdge): boolean {
  return x.id === y.id
}
