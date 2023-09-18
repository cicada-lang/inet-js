import { ComposeOptions } from "../compose/compose"
import { connectHalfEdges } from "../connect/connectHalfEdges"
import { Env } from "../env"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail"
import { unifyTypes } from "../unify/unifyTypes"
import { formatValue } from "../value/formatValue"

export function compose(env: Env, options: ComposeOptions): void {
  const first = env.stack.pop()

  if (first === undefined) {
    throw new Error(
      [`[@connect] I expect first value on the stack.`].join("\n"),
    )
  }

  if (first["@kind"] !== "HalfEdge") {
    throw new Error(
      [
        `[@connect] I expect the first value on the stack to be a HalfEdge.`,
        ``,
        `  first: ${formatValue(env, first)}`,
      ].join("\n"),
    )
  }

  const second = env.stack.pop()

  if (second === undefined) {
    throw new Error(
      [
        `[@connect] I expect a second value on the stack.`,
        ``,
        `  first: ${formatValue(env, first)}`,
      ].join("\n"),
    )
  }

  if (second["@kind"] !== "HalfEdge") {
    throw new Error(
      [
        `[@connect] I expect the second value on the stack to be a HalfEdge.`,
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

  connectHalfEdges(env.net, first, second)

  if (options.checking) {
    unifyTypes(
      env,
      options.checking.substitution,
      firstOtherPort.t,
      secondOtherPort.t,
    )
  }
}
