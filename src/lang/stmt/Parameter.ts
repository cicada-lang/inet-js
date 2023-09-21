import { Exp } from "../exp"
import { Value } from "../value"

export type ParameterExp = {
  name: string
  t: Exp
  isPrincipal?: boolean
}

export type Parameter = {
  name: string
  t: Value
  isPrincipal?: boolean
}

export type ParameterWithoutType = {
  name: string
  isPrincipal?: boolean
}
