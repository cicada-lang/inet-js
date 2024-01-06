import { type Node } from "./Node.js"

export function nodeKey(node: Node): string {
  return `${node.modId}/${node.name}#${node.id}`
}
