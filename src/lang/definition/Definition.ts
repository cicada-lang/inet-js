import { Env } from "../env"
import { EvaluateOptions } from "../evaluate"
import { BlockStmt } from "../exp/BlockStmt"
import { Mod } from "../mod"
import { Parameter } from "../parameter"
import { Span } from "../span"
import { Value } from "../value"

export type Definition =
  | NodeDefinition
  | TypeDefinition
  | FunctionDefinition
  | PrimitiveFunctionDefinition
  | ValueDefinition

export type NodeDefinition = {
  "@type": "Definition"
  "@kind": "NodeDefinition"
  mod: Mod
  name: string
  input: Array<Parameter>
  output: Array<Parameter>
  span: Span
}

export type TypeDefinition = {
  "@type": "Definition"
  "@kind": "TypeDefinition"
  mod: Mod
  name: string
  input: Array<Parameter>
  span: Span
}

export type FunctionDefinition = {
  "@type": "Definition"
  "@kind": "FunctionDefinition"
  mod: Mod
  input: Array<Parameter>
  retType: Value
  body: Array<BlockStmt>
  name: string
  span: Span
}

export type PrimitiveApply = (
  env: Env,
  args: Array<Value>,
  options: EvaluateOptions,
) => Array<Value>

export type PrimitiveFunctionDefinition = {
  "@type": "Definition"
  "@kind": "PrimitiveFunctionDefinition"
  mod: Mod
  name: string
  apply: PrimitiveApply
}

export type ValueDefinition = {
  "@type": "Definition"
  "@kind": "ValueDefinition"
  mod: Mod
  name: string
  value: Value
}
