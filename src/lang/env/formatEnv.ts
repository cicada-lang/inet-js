import { Env } from "../env"
import { formatNode } from "../graph/formatNode"

export function formatEnv(net: Env): string {
  const lines: Array<string> = []

  for (const edge of [...net.activeEdges].reverse()) {
    const start = formatNode(edge.start.node)
    const end = formatNode(edge.end.node)
    lines.push(`[${start}]-${edge.start.name}!${edge.end.name}-[${end}]`)
  }

  for (const edge of [...net.edges].reverse()) {
    const start = formatNode(edge.start.node)
    const end = formatNode(edge.end.node)
    lines.push(`[${start}]-${edge.start.name} ${edge.end.name}-[${end}]`)
  }

  for (const port of net.ports) {
    lines.push(`[${formatNode(port.node)}]-${port.name}`)
  }

  return lines.join("\n")
}