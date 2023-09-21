import { Env } from "../env"
import { EvaluateOptions } from "../evaluate"
import { Exp } from "../exp"
import { BlockStmt } from "../exp/BlockStmt"
import { Mod } from "../mod"
import { Span } from "../span"
import { ParameterExp } from "../stmt/Parameter"

export type Definition =
  | NodeDefinition
  | TypeDefinition
  | FunctionDefinition
  | OperatorDefinition

export type NodeDefinition = {
  "@type": "Definition"
  "@kind": "NodeDefinition"
  mod: Mod
  name: string
  input: Array<ParameterExp>
  output: Array<ParameterExp>
  span: Span
}

export type TypeDefinition = {
  "@type": "Definition"
  "@kind": "TypeDefinition"
  mod: Mod
  name: string
  input: Array<ParameterExp>
  span: Span
}

export type FunctionDefinition = {
  "@type": "Definition"
  "@kind": "FunctionDefinition"
  mod: Mod
  input: Array<ParameterExp>
  retType: Exp
  body: Array<BlockStmt>
  name: string
  span: Span
}

export type OperatorDefinition = {
  "@type": "Definition"
  "@kind": "OperatorDefinition"
  mod: Mod
  name: string
  compose: (env: Env, options: EvaluateOptions) => void
}
