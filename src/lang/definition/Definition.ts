import { Env } from "../env"
import { EvaluateOptions } from "../evaluate"
import { Mod } from "../mod"
import { Span } from "../span"

export type Definition =
  | NodeDefinition
  | FunctionDefinition
  | OperatorDefinition
  | TypeDefinition

export type NodeDefinition = {
  "@type": "Definition"
  "@kind": "NodeDefinition"
  mod: Mod
  span: Span
  name: string
}

export type FunctionDefinition = {
  "@type": "Definition"
  "@kind": "FunctionDefinition"
  mod: Mod
  span: Span
  name: string
}

export type OperatorDefinition = {
  "@type": "Definition"
  "@kind": "OperatorDefinition"
  mod: Mod
  name: string
  compose: (env: Env, options: EvaluateOptions) => void
}

export type TypeDefinition = {
  "@type": "Definition"
  "@kind": "TypeDefinition"
  mod: Mod
  span: Span
  name: string
}
