import { stringToSubscript } from "../../utils/stringToSubscript.js"
import { type Net } from "../net/index.js"
import { type Node } from "../node/index.js"

export function formatNode(net: Net, node: Node): string {
  const subscript = stringToSubscript(node.id.toString())
  return `${node.name}${subscript}`
}
