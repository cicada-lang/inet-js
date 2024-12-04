import { checkHalfEdges } from "../check/checkHalfEdges.ts"
import { connectHalfEdges } from "../connect/connectHalfEdges.ts"
import { type Env } from "../env/index.ts"
import { type EvaluateOptions } from "../evaluate/index.ts"
import { refreshNode } from "../freshen/refreshNode.ts"
import { halfEdgeFromPort } from "../half-edge/halfEdgeFromPort.ts"
import { findInputPorts } from "../net/findInputPorts.ts"
import { findOutputPorts } from "../net/findOutputPorts.ts"
import { formatNode, type Node } from "../node/index.ts"
import { formatPort } from "../port/formatPort.ts"
import { formatValue, type Value } from "../value/index.ts"

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
