import { Node } from "../node"
import { Sign } from "../sign"
import { Value } from "../value"

export type Port = {
  node: Node
  name: string
  sign: Sign
  t: Value
  isPrincipal: boolean
}
