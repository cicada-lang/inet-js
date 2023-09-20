import { compose } from "../compose/compose"
import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod/index"
import { Span } from "../span/index"
import { Stmt } from "../stmt/index"
import { formatWord } from "../word/formatWord"
import { Word } from "../word/index"

export class Compose implements Stmt {
  constructor(
    public word: Word,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      compose(mod, mod.env, this.word, {
        checking: mod.checking,
      })
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[Compose.execute] I fail to compose word.`,
          ``,
          `  word: ${formatWord(this.word)}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
