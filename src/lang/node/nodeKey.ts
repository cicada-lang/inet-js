import { type Node } from "./Node.ts"

export function nodeKey(node: Node): string {
  return `${node.modId}/${node.name}#${node.id}`
}
