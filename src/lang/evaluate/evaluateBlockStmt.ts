import { defineLocals } from "../env/defineLocals.js"
import { type Env } from "../env/index.js"
import { appendReport } from "../errors/index.js"
import { type BlockStmt } from "../exp/BlockStmt.js"
import { formatBlockStmt } from "../exp/formatBlockStmt.js"
import { type Mod } from "../mod/index.js"
import { formatValue, type Value } from "../value/index.js"
import { evaluate, type EvaluateOptions } from "./evaluate.js"

export function evaluateBlockStmt(
  mod: Mod,
  env: Env,
  stmt: BlockStmt,
  options: EvaluateOptions,
): Array<Value> | null {
  try {
    switch (stmt["@kind"]) {
      case "Let": {
        const values = evaluate(mod, env, stmt.exp, options)
        defineLocals(env, stmt.names, values)
        return null
      }

      case "Evaluate": {
        const values = evaluate(mod, env, stmt.exp, options)
        if (values.length !== 0) {
          throw new Error(
            [
              `[evaluateBlockStmt / Evaluate] I expect the result of the evalutaion to have zero values.`,
              ``,
              `  block stmt: ${formatBlockStmt(stmt)}`,
              `  values: [${values
                .map((value) => formatValue(env, value))
                .join(", ")}]`,
            ].join("\n"),
          )
        }

        return null
      }

      case "Return": {
        return evaluate(mod, env, stmt.exp, options)
      }
    }
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[evaluateBlockStmt] I fail to evaluate a block stmt.`,
        ``,
        `  block stmt: ${formatBlockStmt(stmt)}`,
      ].join("\n"),
      context: {
        span: stmt.span,
        text: mod.text,
      },
    })
  }
}
