import { capNodeAllPorts } from "../cap"
import { Mod, findDefinitionOrFail } from "../mod"
import { Net, createNet } from "../net"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"

export function presentNode(mod: Mod, nodeName: string): Net {
  const net = createNet()

  const definition = findDefinitionOrFail(mod, nodeName)
  const node = createNodeFromDefinition(net, definition)
  capNodeAllPorts(mod, net, node)

  return net
}
