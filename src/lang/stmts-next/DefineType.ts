import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { Span } from "../span"
import { Parameter } from "./Parameter"

export class DefineType {
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
          `[DefineType.execute] I fail to define node.`,
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
