import {
  BuiltinFunctionDefinition,
  FunctionDefinition,
  TypeDefinition,
} from "../definition"
import { HalfEdge } from "../half-edge"
import { Node } from "../node"

export type Value =
  | HalfEdge
  | Node
  | Function
  | BuiltinFunction
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

export type BuiltinFunction = {
  "@type": "Value"
  "@kind": "BuiltinFunction"
  definition: BuiltinFunctionDefinition
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
  name: string
  args: Array<Value>
}
