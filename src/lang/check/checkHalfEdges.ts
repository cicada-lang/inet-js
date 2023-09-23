import { checkPortSigns } from "../check/checkPortSigns"
import { Checking } from "../checking"
import { Env } from "../env"
import { HalfEdge } from "../half-edge"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findHalfEdgePort } from "../net/findHalfEdgePort"
import { unifyTypes } from "../unify/unifyTypes"

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
