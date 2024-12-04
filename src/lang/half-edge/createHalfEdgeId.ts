import { globalHalfEdgeInfo } from "./globalHalfEdgeInfo.ts"

export function createHalfEdgeId(): string {
  const n = globalHalfEdgeInfo.counter++
  return n.toString()
}
