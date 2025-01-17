import { type BlockStmt } from "../exp/BlockStmt.ts"
import { type Exp } from "../exp/index.ts"
import { type ImportBinding } from "../import/ImportBinding.ts"
import { type ParameterExp } from "../parameter/index.ts"
import { type RuleTarget } from "../rule/index.ts"
import { type Span } from "../span/index.ts"

export type Stmt =
  | DefineNode
  | DefineType
  | DefineFunction
  | DefineRule
  | TopLevelEvaluate
  | TopLevelLet
  | Require
  | Import

export type DefineNode = {
  "@type": "Stmt"
  "@kind": "DefineNode"
  name: string
  input: Array<ParameterExp>
  output: Array<ParameterExp>
  span: Span
}

export type DefineType = {
  "@type": "Stmt"
  "@kind": "DefineType"
  name: string
  input: Array<ParameterExp>
  span: Span
}

export type DefineFunction = {
  "@type": "Stmt"
  "@kind": "DefineFunction"
  name: string
  input: Array<ParameterExp>
  retType: Exp
  body: Array<BlockStmt>
  span: Span
}

export type DefineRule = {
  "@type": "Stmt"
  "@kind": "DefineRule"
  first: RuleTarget
  second: RuleTarget
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
  "@kind": "TopLevelLet"
  names: Array<string>
  exp: Exp
  span: Span
}

export type Require = {
  "@type": "Stmt"
  "@kind": "Require"
  path: string
  span: Span
}

export type Import = {
  "@type": "Stmt"
  "@kind": "Import"
  bindings: Array<ImportBinding>
  path: string
  span: Span
}
