import { Exp } from "../exp"

export type Parameter = {
  name: string
  t: Exp
  isPrincipal?: boolean
}
