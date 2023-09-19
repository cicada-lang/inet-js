import { appendReport } from "../errors/appendReport"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt-next"

export type NodeParameter = {
  name: string
  t: Exp
  isPrincipal: boolean
}

export class DefineNode implements Stmt {
  constructor(
    public name: string,
    public input: Array<NodeParameter>,
    public output: Array<NodeParameter>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      // const { inputPortExps, outputPortExps } = checkNode(
      //   mod,
      //   this.input,
      //   this.output,
      // )
      // define(mod, this.name, {
      //   "@type": "Definition",
      //   "@kind": "NodeDefinition",
      //   mod,
      //   span: this.span,
      //   name: this.name,
      //   input: inputPortExps,
      //   output: outputPortExps,
      // })
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[DefineNode.execute] I fail to define node.`,
          ``,
          `  node name: ${this.name}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
