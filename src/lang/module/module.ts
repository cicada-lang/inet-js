import { Def } from "../def"
import * as Defs from "../defs"
import { Net } from "../net"
import { Node } from "../node"
import { Port } from "../port"
import { Rule } from "../rule"

export class Module {
  defs: Map<string, Def>

  constructor() {
    this.defs = new Map([
      [
        "swap",
        new Defs.OperatorDef(this, (net) => {
          const x1 = net.ports.pop() as Port
          const x0 = net.ports.pop() as Port
          net.ports.push(x0, x1)
        }),
      ],
      [
        "rot",
        new Defs.OperatorDef(this, (net) => {
          const x2 = net.ports.pop() as Port
          const x1 = net.ports.pop() as Port
          const x0 = net.ports.pop() as Port
          net.ports.push(x1, x2, x0)
        }),
      ],
    ])
  }

  private rules: Map<string, Rule> = new Map()

  defineNode(name: string, input: Array<string>, output: Array<string>): this {
    this.defs.set(name, new Defs.NodeDef(this, name, input, output))
    return this
  }

  defineNet(name: string, words: Array<string>): this {
    // TODO Type check the words.
    this.defs.set(name, new Defs.NetDef(this, words))
    return this
  }

  buildNode(name: string): Node {
    const def = this.defs.get(name)

    if (!(def instanceof Defs.NodeDef)) {
      throw new Error(`Undefined node: ${name}`)
    }

    return def.build()
  }

  buildNet(name: string): Net {
    const def = this.defs.get(name)

    if (!(def instanceof Defs.NetDef)) {
      throw new Error(`Undefined net: ${name}`)
    }

    return def.build()
  }

  findOperator(name: string): Defs.OperatorDef | undefined {
    const def = this.defs.get(name)
    if (!(def instanceof Defs.OperatorDef)) {
      return undefined
    }

    return def
  }

  defineRule(disconnect: [string, string], reconnect: Array<string>): this {
    this.rules.set(disconnect.join(" "), new Rule(disconnect, reconnect))
    return this
  }

  findRuleByPorts(start: Port, end: Port): Rule | undefined {
    if (!(start.isPrincipal() && end.isPrincipal())) {
      return undefined
    }

    const key = `${start.node.name} ${end.node.name}`
    return this.rules.get(key)
  }
}
