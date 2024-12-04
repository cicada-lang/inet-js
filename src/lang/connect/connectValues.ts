import { type Env } from "../env/index.ts"
import { formatValue, type Value } from "../value/index.ts"
import { connectHalfEdges } from "./connectHalfEdges.ts"

export function connectValues(env: Env, first: Value, second: Value): void {
  if (first["@kind"] !== "HalfEdge") {
    throw new Error(
      [
        `[connectValues] I expect the first value to be a HalfEdge.`,
        ``,
        `  first value: ${formatValue(env, first)}`,
        `  second value: ${formatValue(env, second)}`,
      ].join("\n"),
    )
  }

  if (second["@kind"] !== "HalfEdge") {
    throw new Error(
      [
        `[connectValues] I expect the second value to be a HalfEdge.`,
        ``,
        `  first value: ${formatValue(env, first)}`,
        `  second value: ${formatValue(env, second)}`,
      ].join("\n"),
    )
  }

  connectHalfEdges(env.net, first, second)
}
