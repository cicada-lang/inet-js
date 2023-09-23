import { NodeWithoutId } from "./Node"

export function nodeKeyWithoutId(node: NodeWithoutId): string {
  return `${node.modId}/${node.name}`
}
