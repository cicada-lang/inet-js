import { appendReport } from "../errors/appendReport.js"
import { Exp } from "../exp/Exp.js"
import { formatExp } from "../exp/formatExp.js"
import { Mod } from "../mod/index.js"
import { Span } from "../span/index.js"
import { Stmt } from "../stmt/index.js"

export class TopLevelEvaluate implements Stmt {
  constructor(
    public exp: Exp,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      // compose(mod, mod.env, this.word, {
      //   checking: mod.checking,
      // })
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[TopLevelEvaluate.execute] I fail to evaluate top level exp.`,
          ``,
          `  exp: ${formatExp(this.exp)}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
