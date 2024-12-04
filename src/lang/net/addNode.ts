import { type Mod } from "../mod/index.ts"
import { type Net, type PortRecord } from "../net/index.ts"
import { createNodeId } from "../node/createNodeId.ts"
import { type Node } from "../node/index.ts"
import { nodeKey } from "../node/nodeKey.ts"
import { type Parameter } from "../parameter/index.ts"

export function addNode(
  net: Net,
  mod: Mod,
  name: string,
  input: Array<Parameter>,
  output: Array<Parameter>,
): Node {
  const modId = mod.url.href
  const id = createNodeId(name)

  const node: Node = { "@type": "Value", "@kind": "Node", modId, id, name }
  const ports: PortRecord = {}
  net.nodeEntries.set(nodeKey(node), { id, modId, name, ports })

  input.map((parameter) => {
    ports[parameter.name] = {
      sign: -1,
      name: parameter.name,
      t: parameter.t,
      isPrincipal: parameter.isPrincipal,
    }
  })

  output.map((parameter) => {
    ports[parameter.name] = {
      sign: 1,
      name: parameter.name,
      t: parameter.t,
      isPrincipal: parameter.isPrincipal,
    }
  })

  return node
}
