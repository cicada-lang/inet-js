import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { Span } from "../span"
import { Parameter } from "./Parameter"

export class DefineFunction {
  constructor(
    public name: string,
    public input: Array<Parameter>,
    public ret: Parameter,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      // // First define the word, then check,
      // // so that the definition can be recursive.
      // checkWords(mod, definition.input, definition.output, this.words)
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[DefineFunction.execute] I fail to define word.`,
          ``,
          `  word: ${this.name}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
