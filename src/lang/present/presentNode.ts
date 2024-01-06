import { capNodeAllPorts } from "../cap/index.js"
import { findDefinitionOrFail, type Mod } from "../mod/index.js"
import { createNet, type Net } from "../net/index.js"
import { addNodeFromDefinition } from "../node/addNodeFromDefinition.js"

export function presentNode(mod: Mod, nodeName: string): Net {
  const net = createNet()

  const definition = findDefinitionOrFail(mod, nodeName)
  const node = addNodeFromDefinition(net, definition)
  capNodeAllPorts(mod, net, node)

  return net
}
