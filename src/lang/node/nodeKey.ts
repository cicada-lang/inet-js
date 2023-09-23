import { Node } from "./Node"

export function nodeKey(node: Node): string {
  return `${node.modId}/${node.name}#${node.id}`
}
