import { checkHalfEdges } from "../check/checkHalfEdges.ts"
import { connectHalfEdges } from "../connect/connectHalfEdges.ts"
import { type PrimitiveApply } from "../definition/index.ts"
import { formatValue } from "../value/formatValue.ts"

export const apply: PrimitiveApply = (env, args, options) => {
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

  if (options.checking) {
    checkHalfEdges(env, first, second, options.checking)
  }

  connectHalfEdges(env.net, first, second)

  return []
}
