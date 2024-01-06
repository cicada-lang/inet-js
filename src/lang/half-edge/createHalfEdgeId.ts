import { globalHalfEdgeInfo } from "./globalHalfEdgeInfo.js"

export function createHalfEdgeId(): string {
  const n = globalHalfEdgeInfo.counter++
  return n.toString()
}
