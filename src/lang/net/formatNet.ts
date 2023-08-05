import { formatNode } from "../graph/formatNode"
import { Net } from "../net"

export function formatNet(net: Net): string {
  const lines: Array<string> = []

  for (const edge of [...net.activeEdges].reverse()) {
    const start = formatNode(edge.start.node)
    const end = formatNode(edge.end.node)
    lines.push(`(${start})-${edge.start.name}!${edge.end.name}-(${end})`)
  }

  for (const edge of [...net.edges].reverse()) {
    const start = formatNode(edge.start.node)
    const end = formatNode(edge.end.node)
    lines.push(`(${start})-${edge.start.name} ${edge.end.name}-(${end})`)
  }

  for (const port of net.ports) {
    lines.push(`(${formatNode(port.node)})-${port.name}`)
  }

  return lines.join("\n")
}