import { checkPortSigns } from "../check/checkPortSigns.ts"
import { type Checking } from "../checking/index.ts"
import { type Env } from "../env/index.ts"
import { type HalfEdge } from "../half-edge/index.ts"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.ts"
import { findHalfEdgePort } from "../net/findHalfEdgePort.ts"
import { unifyTypes } from "../unify/unifyTypes.ts"

export function checkHalfEdges(
  env: Env,
  first: HalfEdge,
  second: HalfEdge,
  checking: Checking,
): void {
  const firstHalfEdgeEntry = findHalfEdgeEntryOrFail(env.net, first)
  const secondHalfEdgeEntry = findHalfEdgeEntryOrFail(env.net, second)

  const firstOtherPort = findHalfEdgePort(
    env.net,
    firstHalfEdgeEntry.otherHalfEdge,
  )
  const secondOtherPort = findHalfEdgePort(
    env.net,
    secondHalfEdgeEntry.otherHalfEdge,
  )

  if (firstOtherPort !== undefined && secondOtherPort !== undefined) {
    checkPortSigns(env.net, firstOtherPort, secondOtherPort)
    unifyTypes(env, checking.substitution, firstOtherPort.t, secondOtherPort.t)
  }
}
