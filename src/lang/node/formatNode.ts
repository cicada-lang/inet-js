import { stringToSubscript } from "../../utils/stringToSubscript.ts"
import { type Net } from "../net/index.ts"
import { type Node } from "../node/index.ts"

export function formatNode(net: Net, node: Node): string {
  const subscript = stringToSubscript(node.id.toString())
  return `${node.name}${subscript}`
}
