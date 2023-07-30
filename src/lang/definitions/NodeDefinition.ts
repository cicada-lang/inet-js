import { Definition } from "../definition"
import { Net, Node } from "../graph"
import { connect } from "../graph/connect"
import { createNode } from "../graph/createNode"
import { Mod } from "../mod"
import { PortExp } from "../stmts"

export class NodeDefinition implements Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public input: Array<PortExp>,
    public output: Array<PortExp>,
  ) {}

  meaning(net: Net): Node {
    const node = createNode(this.mod, this.name, this.input, this.output)

    // NOTE Be careful about the order.
    for (const port of node.input) {
      const top = net.ports.pop()
      if (top === undefined) {
        throw new Error(`I expect a port on top of the stack`)
      }

      connect(net, top, port)
    }

    net.ports.push(...node.output)
    net.nodes.push(node)

    return node
  }
}
