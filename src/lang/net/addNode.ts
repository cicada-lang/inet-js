import { Mod } from "../mod"
import { Net, PortRecord } from "../net"
import { Node } from "../node"
import { createNodeId } from "../node/createNodeId"
import { nodeKey } from "../node/nodeKey"
import { Parameter } from "../parameter"

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
