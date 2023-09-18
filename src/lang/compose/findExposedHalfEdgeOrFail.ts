import { HalfEdge } from "../half-edge"
import { Net } from "../net"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { findPortEntry } from "../net/findPortEntry"
import { Node } from "../node"
import { Port } from "../port"
import { ComposeOptions } from "./compose"

export function findExposedHalfEdgeOrFail(
  net: Net,
  nodeName: string,
  portName: string,
  options?: ComposeOptions,
): HalfEdge {
  const who = "findCurrentPortOrFail"

  const { current } = options || {}

  if (current === undefined) {
    throw new Error(
      [
        `[${who}] I expect current first and second nodes in ComposeOptions.`,
        ``,
        `  port name: ${portName}`,
        `  node name: ${nodeName}`,
      ].join("\n"),
    )
  }

  const found = findHalfEdgeInNodes(net, nodeName, portName, [
    current.first,
    current.second,
  ])

  if (found === undefined) {
    throw new Error(
      [
        `[${who}] I can not find port in node.`,
        ``,
        `  node name: ${nodeName}`,
        `  port name: ${portName}`,
      ].join("\n"),
    )
  }

  return found
}

function findHalfEdgeInNodes(
  net: Net,
  nodeName: string,
  portName: string,
  nodes: Array<Node>,
): HalfEdge | undefined {
  for (const node of nodes) {
    if (nodeName === node.name) {
      return findHalfEdgeInNode(net, portName, node)
    }
  }
}

function findHalfEdgeInNode(
  net: Net,
  portName: string,
  node: Node,
): HalfEdge | undefined {
  for (const port of findInputPorts(net, node)) {
    if (port.name === portName) {
      return findHalfEdgeOfPort(net, port)
    }
  }

  for (const port of findOutputPorts(net, node)) {
    if (port.name === portName) {
      return findHalfEdgeOfPort(net, port)
    }
  }
}

function findHalfEdgeOfPort(net: Net, port: Port): HalfEdge | undefined {
  const portEntry = findPortEntry(net, port)

  if (portEntry === undefined) return
  if (portEntry.connection === undefined) return

  return portEntry.connection.halfEdge
}
