import { type Exp } from "../exp/index.ts"
import { type Value } from "../value/index.ts"

export type ParameterExp = {
  name: string
  t: Exp
  isPrincipal: boolean
}

export type Parameter = {
  name: string
  t: Value
  isPrincipal: boolean
}

export type ParameterWithoutType = {
  name: string
  isPrincipal: boolean
}
