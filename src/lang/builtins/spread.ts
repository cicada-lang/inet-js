import { ComposeOptions } from "../compose/compose"
import { connectPortWithHalfEdge } from "../connect/connectPortWithHalfEdge"
import { Env } from "../env"
import { addEdge } from "../net/addEdge"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { formatValue } from "../value"

export function compose(env: Env, options: ComposeOptions): void {
  const value = env.stack.pop()
  if (value === undefined) {
    throw new Error(`[@spread] I expect a value on the stack.`)
  }

  if (value["@kind"] !== "Node") {
    throw new Error(
      [
        `[@spread] I expect the value on top of the stack to be a Node.`,
        ``,
        `  node: ${formatValue(env, value)}`,
      ].join("\n"),
    )
  }

  const ports = [
    ...findInputPorts(env.net, value),
    ...findOutputPorts(env.net, value),
  ]

  for (const port of ports.reverse()) {
    const edge = addEdge(env.net)
    connectPortWithHalfEdge(env.net, port, edge.first)
    env.stack.push(edge.second)
  }
}
