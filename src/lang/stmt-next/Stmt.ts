import { Exp } from "../exp"
import { BlockStmt } from "../exp/BlockStmt"
import { Span } from "../span"
import { Parameter, ParameterWithoutType } from "./Parameter"

export type Stmt =
  | DefineNode
  | DefineType
  | DefineRule
  | DefineFunction
  | TopLevelEvaluate
  | TopLevelLet

export type DefineNode = {
  "@type": "Stmt"
  "@kind": "DefineNode"
  name: string
  input: Array<Parameter>
  output: Array<Parameter>
  span: Span
}

export type DefineType = {
  "@type": "Stmt"
  "@kind": "DefineType"
  name: string
  input: Array<Parameter>
  span: Span
}

export type RuleTarget = {
  name: string
  parameters: Array<ParameterWithoutType>
}

export type DefineRule = {
  "@type": "Stmt"
  "@kind": "DefineRule"
  first: RuleTarget
  second: RuleTarget
  body: Array<BlockStmt>
  span: Span
}

export type DefineFunction = {
  "@type": "Stmt"
  "@kind": "DefineFunction"
  name: string
  input: Array<Parameter>
  retType: Exp
  body: Array<BlockStmt>
  span: Span
}

export type TopLevelEvaluate = {
  "@type": "Stmt"
  "@kind": "TopLevelEvaluate"
  exp: Exp
  span: Span
}

export type TopLevelLet = {
  "@type": "Stmt"
  "@kind": "TTopLevelLet"
  names: Array<string>
  exp: Exp
  span: Span
}