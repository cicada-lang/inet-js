import { Env } from "../env"
import { runHalfEdge } from "../run/runHalfEdge"
import { formatValue } from "../value/formatValue"

export function apply(env: Env): void {
  const value = env.stack[env.stack.length - 1]
  if (value === undefined) {
    throw new Error(`[@run] I expect a top value on the stack.`)
  }

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
}
