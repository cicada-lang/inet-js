import { connectPortWithHalfEdge } from "../connect/connectPortWithHalfEdge"
import { Env } from "../env"
import { refreshNode } from "../freshen/refreshNode"
import { addEdge } from "../net/addEdge"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { Node } from "../node"
import { unifyTypes } from "../unify/unifyTypes"
import { ComposeOptions } from "./compose"

export function composeNode(
  env: Env,
  node: Node,
  options: ComposeOptions,
): Node {
  if (options.checking) {
    refreshNode(env.net, options.checking.typeVarCounters, node)
  }

  const input = findInputPorts(env.net, node)
  const output = findOutputPorts(env.net, node)

  // Be careful about the order:
  // The first input port connects
  // with the port on the top of the stack.

  for (const port of input) {
    const value = env.stack.pop()
    if (value === undefined) {
      throw new Error(`[composeNode] I expect a value on top of the stack.`)
    }

    if (value["@kind"] !== "HalfEdge") {
      throw new Error(
        [
          `[composeNode] I expect the top value on the stack to be a HalfEdge.`,
          ``,
          `  value['@kind']: ${value["@kind"]}`,
        ].join("\n"),
      )
    }

    connectPortWithHalfEdge(env.net, port, value)
    const valuePort = findHalfEdgePortOrFail(env.net, value)
    if (options.checking) {
      unifyTypes(env, options.checking.substitution, valuePort.t, port.t)
    }
  }

  for (const port of output) {
    const edge = addEdge(env.net)
    connectPortWithHalfEdge(env.net, port, edge.first)
    env.stack.push(edge.second)
  }

  return node
}
