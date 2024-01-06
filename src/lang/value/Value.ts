import {
  type FunctionDefinition,
  type PrimitiveFunctionDefinition,
  type TypeDefinition,
} from "../definition/index.js"
import { type HalfEdge } from "../half-edge/index.js"
import { type Mod } from "../mod/index.js"
import { type Node } from "../node/index.js"

export type Value =
  | HalfEdge
  | Node
  | Function
  | PrimitiveFunction
  | TypeCtor
  | Type
  | Symbol
  | TypeTerm

export type Type = {
  "@type": "Value"
  "@kind": "Type"
}

export type Function = {
  "@type": "Value"
  "@kind": "Function"
  definition: FunctionDefinition
}

export type PrimitiveFunction = {
  "@type": "Value"
  "@kind": "PrimitiveFunction"
  definition: PrimitiveFunctionDefinition
}

export type TypeCtor = {
  "@type": "Value"
  "@kind": "TypeCtor"
  definition: TypeDefinition
}

export type Symbol = {
  "@type": "Value"
  "@kind": "Symbol"
  name: string
}

export type TypeTerm = {
  "@type": "Value"
  "@kind": "TypeTerm"
  mod: Mod
  name: string
  args: Array<Value>
}
