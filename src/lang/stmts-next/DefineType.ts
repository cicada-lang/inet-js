import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt-next"
import { Parameter } from "./Parameter"

export class DefineType implements Stmt {
  constructor(
    public name: string,
    public input: Array<Parameter>,
    public output: Array<Parameter>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      // TODO
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
