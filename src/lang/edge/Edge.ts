import { type HalfEdge } from "../half-edge/index.ts"

export type Edge = {
  first: HalfEdge
  second: HalfEdge
}
