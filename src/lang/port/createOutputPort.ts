import { Node } from "../node"
import { Parameter } from "../parameter"
import { Port } from "./Port"

export function createOutputPort(node: Node, parameter: Parameter): Port {
  return {
    sign: 1,
    node,
    name: parameter.name,
    t: parameter.t,
    isPrincipal: parameter.isPrincipal,
  }
}
