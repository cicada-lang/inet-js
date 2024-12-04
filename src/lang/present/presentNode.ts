import { capNodeAllPorts } from "../cap/index.ts"
import { findDefinitionOrFail, type Mod } from "../mod/index.ts"
import { createNet, type Net } from "../net/index.ts"
import { addNodeFromDefinition } from "../node/addNodeFromDefinition.ts"

export function presentNode(mod: Mod, nodeName: string): Net {
  const net = createNet()

  const definition = findDefinitionOrFail(mod, nodeName)
  const node = addNodeFromDefinition(net, definition)
  capNodeAllPorts(mod, net, node)

  return net
}
