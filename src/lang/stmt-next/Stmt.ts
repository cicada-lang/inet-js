import { Exp } from "../exp"
import { BlockStmt } from "../exp/BlockStmt"
import { Mod } from "../mod"
import { Span } from "../span"
import { Parameter, ParameterWithoutType } from "../stmts-next"

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
  mod: Mod
  name: string
  input: Array<Parameter>
  output: Array<Parameter>
  span: Span
}

export type DefineType = {
  "@type": "Stmt"
  "@kind": "DefineType"
  mod: Mod
  name: string
  input: Array<Parameter>
  output: Array<Parameter>
  span: Span
}

export type RuleTarget = {
  name: string
  parameters: Array<ParameterWithoutType>
}

export type DefineRule = {
  "@type": "Stmt"
  "@kind": "DefineRule"
  mod: Mod
  first: RuleTarget
  second: RuleTarget
  body: Array<BlockStmt>
  span: Span
}

export type DefineFunction = {
  "@type": "Stmt"
  "@kind": "DefineFunction"
  mod: Mod
  name: string
  input: Array<Parameter>
  ret: Parameter
  span: Span
}

export type TopLevelEvaluate = {
  "@type": "Stmt"
  "@kind": "TopLevelEvaluate"
  mod: Mod
  exp: Exp
  span: Span
}

export type TopLevelLet = {
  "@type": "Stmt"
  "@kind": "TTopLevelLet"
  mod: Mod
  names: Array<string>
  exp: Exp
  span: Span
}
