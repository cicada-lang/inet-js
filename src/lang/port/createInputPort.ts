import { Node } from "../node"
import { Parameter } from "../stmt/Parameter"
import { Port } from "./Port"

export function createInputPort(node: Node, parameter: Parameter): Port {
  return {
    sign: -1,
    node,
    name: parameter.name,
    t: parameter.t,
    isPrincipal: parameter.isPrincipal,
  }
}
