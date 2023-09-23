import { Mod } from "../mod"
import { Net, PortRecord } from "../net"
import { Node } from "../node"
import { createNodeId } from "../node/createNodeId"
import { nodeKey } from "../node/nodeKey"
import { Parameter } from "../stmt/Parameter"

export function addNode(
  net: Net,
  mod: Mod,
  name: string,
  input: Array<Parameter>,
  output: Array<Parameter>,
): Node {
  const id = createNodeId(name)

  const node: Node = {
    "@type": "Value",
    "@kind": "Node",
    id,
    modId: mod.url.href,
    name,
  }

  const ports: PortRecord = {}
  net.nodeEntries.set(nodeKey(node), { id, url: mod.url, name, ports })

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
