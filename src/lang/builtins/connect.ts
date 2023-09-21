import { checkPortSigns } from "../check/checkPortSigns"
import { connectHalfEdges } from "../connect/connectHalfEdges"
import { PrimitiveApply } from "../definition"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail"
import { unifyTypes } from "../unify/unifyTypes"
import { formatValue } from "../value/formatValue"

export const apply: PrimitiveApply = (mod, env, args, options) => {
  if (args.length !== 2) {
    throw new Error([`[@connect] I expect two arguments.`].join("\n"))
  }

  const [first, second] = args

  if (first["@kind"] !== "HalfEdge") {
    throw new Error(
      [
        `[@connect] I expect the first arg to be a HalfEdge.`,
        ``,
        `  first: ${formatValue(env, first)}`,
        `  second: ${formatValue(env, first)}`,
      ].join("\n"),
    )
  }

  if (second["@kind"] !== "HalfEdge") {
    throw new Error(
      [
        `[@connect] I expect the second arg to be a HalfEdge.`,
        ``,
        `  first: ${formatValue(env, first)}`,
        `  second: ${formatValue(env, first)}`,
      ].join("\n"),
    )
  }

  const firstHalfEdgeEntry = findHalfEdgeEntryOrFail(env.net, first)
  const secondHalfEdgeEntry = findHalfEdgeEntryOrFail(env.net, second)

  const firstOtherPort = findHalfEdgePortOrFail(
    env.net,
    firstHalfEdgeEntry.otherHalfEdge,
  )
  const secondOtherPort = findHalfEdgePortOrFail(
    env.net,
    secondHalfEdgeEntry.otherHalfEdge,
  )

  if (options.checking) {
    checkPortSigns(env.net, firstOtherPort, secondOtherPort)
    unifyTypes(
      env,
      options.checking.substitution,
      firstOtherPort.t,
      secondOtherPort.t,
    )
  }

  connectHalfEdges(env.net, first, second)

  return []
}
