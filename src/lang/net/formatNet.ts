import { formatEdge } from "../edge/formatEdge.ts"
import { type Net } from "./Net.ts"
import { allEdges } from "./allEdges.ts"

export function formatNet(net: Net): string {
  return allEdges(net)
    .map((edge) => formatEdge(net, edge))
    .join("\n")
}
