import { BlockStmt } from "./BlockStmt"

export type Exp = Var | Ap | Block

export type Var = {
  "@type": "Exp"
  "@kind": "Var"
  name: string
}

export type Ap = {
  "@type": "Exp"
  "@kind": "Ap"
  target: Exp
  args: Array<Exp>
}

export type Block = {
  "@type": "Exp"
  "@kind": "Block"
  stmts: Array<BlockStmt>
}
