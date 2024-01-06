import { checkPortSigns } from "../check/checkPortSigns.js"
import { type Checking } from "../checking/index.js"
import { type Env } from "../env/index.js"
import { type HalfEdge } from "../half-edge/index.js"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.js"
import { findHalfEdgePort } from "../net/findHalfEdgePort.js"
import { unifyTypes } from "../unify/unifyTypes.js"

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
