export type Node = {
  "@type": "Value"
  "@kind": "Node"
  modId: string
  id: string
  name: string
}

export type NodeWithoutId = {
  modId: string
  name: string
}
