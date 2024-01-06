import { checkHalfEdges } from "../check/checkHalfEdges.js"
import { connectHalfEdges } from "../connect/connectHalfEdges.js"
import { type Env } from "../env/index.js"
import { type EvaluateOptions } from "../evaluate/index.js"
import { refreshNode } from "../freshen/refreshNode.js"
import { halfEdgeFromPort } from "../half-edge/halfEdgeFromPort.js"
import { findInputPorts } from "../net/findInputPorts.js"
import { findOutputPorts } from "../net/findOutputPorts.js"
import { formatNode, type Node } from "../node/index.js"
import { formatPort } from "../port/formatPort.js"
import { formatValue, type Value } from "../value/index.js"

export function applyNode(
  env: Env,
  node: Node,
  args: Array<Value>,
  options: EvaluateOptions,
): Array<Value> {
  if (options.checking) {
    refreshNode(env.net, options.checking.typeVarCounters, node)
  }

  const ports = [
    ...findInputPorts(env.net, node),
    ...findOutputPorts(env.net, node),
  ]

  if (args.length > ports.length) {
    throw new Error(
      [
        `[applyNode] Too many arguments.`,
        ``,
        `  node: ${formatNode(env.net, node)}`,
        `  ports: [${ports
          .map((port) => formatPort(env.net, port))
          .join(", ")}]`,
        `  args: [${args.map((arg) => formatValue(env, arg)).join(", ")}]`,
      ].join("\n"),
    )
  }

  const halfEdges = ports.map((port) => halfEdgeFromPort(env.net, port))

  for (const [index, arg] of args.entries()) {
    const halfEdge = halfEdges[index]
    if (arg["@kind"] !== "HalfEdge") {
      throw new Error(
        [
          `[applyNode] I expect the arg to be a HalfEdge.`,
          ``,
          `  arg['@kind']: ${arg["@kind"]}`,
        ].join("\n"),
      )
    }

    if (options.checking) {
      checkHalfEdges(env, halfEdge, arg, options.checking)
    }

    connectHalfEdges(env.net, halfEdge, arg)
  }

  return halfEdges.slice(args.length)
}
