import { type HalfEdge } from "./HalfEdge.ts"

export function halfEdgeEqual(x: HalfEdge, y: HalfEdge): boolean {
  return x.id === y.id
}
