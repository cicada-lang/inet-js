import { capNodeAllPorts } from "../cap"
import { Mod, findDefinitionOrFail } from "../mod"
import { Net, createNet } from "../net"
import { addNodeFromDefinition } from "../node/addNodeFromDefinition"

export function presentNode(mod: Mod, nodeName: string): Net {
  const net = createNet()

  const definition = findDefinitionOrFail(mod, nodeName)
  const node = addNodeFromDefinition(net, definition)
  capNodeAllPorts(mod, net, node)

  return net
}
