import { type Exp } from "../exp/index.js"
import { type Value } from "../value/index.js"

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
