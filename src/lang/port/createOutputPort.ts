import { type Node } from "../node/index.ts"
import { type Parameter } from "../parameter/index.ts"
import { type Port } from "./Port.ts"

export function createOutputPort(node: Node, parameter: Parameter): Port {
  return {
    sign: 1,
    node,
    name: parameter.name,
    t: parameter.t,
    isPrincipal: parameter.isPrincipal,
  }
}
