import { type HalfEdge } from "../half-edge/index.js"

export type Edge = {
  first: HalfEdge
  second: HalfEdge
}
