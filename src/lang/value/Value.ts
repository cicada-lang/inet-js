import { HalfEdge } from "../half-edge"
import { Node } from "../node"

export type Value = HalfEdge | Node | Type | Symbol | TypeTerm

export type Type = {
  "@type": "Value"
  "@kind": "Type"
}

export type Symbol = {
  "@type": "Value"
  "@kind": "Symbol"
  name: string
}

export type TypeTerm = {
  "@type": "Value"
  "@kind": "TypeTerm"
  name: string
  args: Array<Value>
}
