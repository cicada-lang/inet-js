import { connectHalfEdges } from "../connect/connectHalfEdges"
import { Env } from "../env"
import { EvaluateOptions } from "../evaluate"
import { refreshNode } from "../freshen/refreshNode"
import { halfEdgeFromPort } from "../half-edge/halfEdgeFromPort"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { Node, formatNode } from "../node"
import { formatPort } from "../port/formatPort"
import { unifyTypes } from "../unify/unifyTypes"
import { Value, formatValue } from "../value"

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
    const port = ports[index]
    if (arg["@kind"] !== "HalfEdge") {
      throw new Error(
        [
          `[applyNode] I expect the arg to be a HalfEdge.`,
          ``,
          `  arg['@kind']: ${arg["@kind"]}`,
        ].join("\n"),
      )
    }

    const argHalfEdgeEntry = findHalfEdgeEntryOrFail(env.net, arg)
    const otherHalfEdge = argHalfEdgeEntry.otherHalfEdge
    const otherPort = findHalfEdgePortOrFail(env.net, otherHalfEdge)
    if (options.checking) {
      unifyTypes(env, options.checking.substitution, otherPort.t, port.t)
    }

    connectHalfEdges(env.net, halfEdge, arg)
  }

  return halfEdges.slice(args.length)
}
