export type Exp = Var | Ap

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
