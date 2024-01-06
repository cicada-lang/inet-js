import { type Node } from "../node/index.js"
import { type Parameter } from "../parameter/index.js"
import { type Port } from "./Port.js"

export function createInputPort(node: Node, parameter: Parameter): Port {
  return {
    sign: -1,
    node,
    name: parameter.name,
    t: parameter.t,
    isPrincipal: parameter.isPrincipal,
  }
}
