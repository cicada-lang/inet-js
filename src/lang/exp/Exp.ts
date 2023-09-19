import { Span } from "../span"
import { BlockStmt } from "./BlockStmt"

export type Exp = Var | Ap | Block

export type Var = {
  "@type": "Exp"
  "@kind": "Var"
  name: string
  span: Span
}

export type Ap = {
  "@type": "Exp"
  "@kind": "Ap"
  target: Exp
  args: Array<Exp>
  span: Span
}

export type Block = {
  "@type": "Exp"
  "@kind": "Block"
  stmts: Array<BlockStmt>
  span: Span
}
