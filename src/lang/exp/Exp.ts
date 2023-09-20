import { Span } from "../span"
import { BlockStmt } from "./BlockStmt"

export type Exp = Var | Ap | Symbol | Builtin | Block

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

export type Symbol = {
  "@type": "Exp"
  "@kind": "Symbol"
  name: string
  span: Span
}

export type Builtin = {
  "@type": "Exp"
  "@kind": "Builtin"
  name: string
  span: Span
}

export type Block = {
  "@type": "Exp"
  "@kind": "Block"
  body: Array<BlockStmt>
  span: Span
}
