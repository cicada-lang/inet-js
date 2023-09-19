import { appendReport } from "../errors"
import { Mod } from "../mod"
import { Stmt } from "../stmt-next"

export async function execute(mod: Mod, stmt: Stmt): Promise<void> {
  try {
    switch (stmt["@kind"]) {
    }
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[execute] I fail to execute a statement.`,
        ``,
        // `  stmt: ${formatStmt(stmt)}`,
      ].join("\n"),
      context: {
        span: stmt.span,
        text: mod.text,
      },
    })
  }
}
