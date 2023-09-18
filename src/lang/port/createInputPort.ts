import { Node } from "../node"
import { PortExp } from "../port/PortExp"
import { Port } from "./Port"

export function createInputPort(node: Node, portExp: PortExp): Port {
  return {
    sign: -1,
    node,
    name: portExp.name,
    t: portExp.t,
    isPrincipal: portExp.isPrincipal,
  }
}
