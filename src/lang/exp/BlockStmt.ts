import { Span } from "../span"
import { Exp } from "./Exp"

export type BlockStmt = Let | Evaluate | Return

export type Let = {
  "@type": "BlockStmt"
  "@kind": "Let"
  names: Array<string>
  exp: Exp
  span: Span
}

export type Evaluate = {
  "@type": "BlockStmt"
  "@kind": "Evaluate"
  exp: Exp
  span: Span
}

export type Return = {
  "@type": "BlockStmt"
  "@kind": "Return"
  exp: Exp
  span: Span
}
