import { appendReport } from "../errors/appendReport"
import { BlockStmt } from "../exp/BlockStmt"
import { Mod } from "../mod"
import { Span } from "../span"
import { ParameterWithoutType } from "./Parameter"

export type RuleTarget = {
  name: string
  parameters: Array<ParameterWithoutType>
}

export class DefineRule {
  constructor(
    public first: RuleTarget,
    public second: RuleTarget,
    public body: Array<BlockStmt>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      // checkRuleIsAboutOwnNode(mod, this.first, this.second)
      // checkRuleNodeOrder(mod, this.first, this.second)
      // checkRule(mod, this.first, this.second, this.words)
      // defineRule(mod, this.first, this.second, this.words)
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[DefineRule.execute] I fail to define rule.`,
          ``,
          `  rule nodes: ${this.first} ${this.second}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
