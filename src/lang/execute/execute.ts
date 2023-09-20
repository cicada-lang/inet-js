import { appendReport } from "../errors"
import { Mod, define } from "../mod"
import { Stmt } from "../stmt"
import { formatStmt } from "../stmt/formatStmt"

export async function execute(mod: Mod, stmt: Stmt): Promise<null> {
  try {
    switch (stmt["@kind"]) {
      case "DefineNode": {
        define(mod, stmt.name, {
          "@type": "Definition",
          "@kind": "NodeDefinition",
          mod,
          name: stmt.name,
          input: stmt.input,
          output: stmt.output,
          span: stmt.span,
        })

        return null
      }

      case "DefineRule": {
        return null
      }

      case "DefineType": {
        return null
      }

      case "DefineFunction": {
        return null
      }

      case "TopLevelEvaluate": {
        return null
      }

      case "TopLevelLet": {
        return null
      }

      case "Require": {
        return null
      }

      case "Import": {
        return null
      }
    }
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[execute] I fail to execute a statement.`,
        ``,
        `  stmt: ${formatStmt(stmt)}`,
      ].join("\n"),
      context: {
        span: stmt.span,
        text: mod.text,
      },
    })
  }
}
