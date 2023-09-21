import { PrimitiveApply } from "../definition"
import { runHalfEdge } from "../run/runHalfEdge"
import { formatValue } from "../value/formatValue"

export const apply: PrimitiveApply = (env, args) => {
  if (args.length !== 1) {
    throw new Error([`[@run] I expect one argument.`].join("\n"))
  }

  const [value] = args

  if (value["@kind"] !== "HalfEdge") {
    throw new Error(
      [
        `[@run] I expect the top value on the stack to be a HalfEdge.`,
        ``,
        `  value: ${formatValue(env, value)}`,
      ].join("\n"),
    )
  }

  runHalfEdge(env.mod, env.net, value)

  return [value]
}
