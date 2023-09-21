import { Env } from "../env"
import { defineLocals } from "../env/defineLocals"
import { BlockStmt } from "../exp/BlockStmt"
import { formatBlockStmt } from "../exp/formatBlockStmt"
import { Mod } from "../mod"
import { Value, formatValue } from "../value"
import { EvaluateOptions, evaluate } from "./evaluate"

export function evaluateBlockStmt(
  mod: Mod,
  env: Env,
  blockStmt: BlockStmt,
  options: EvaluateOptions,
): Array<Value> | null {
  switch (blockStmt["@kind"]) {
    case "Let": {
      const values = evaluate(mod, env, blockStmt.exp, options)
      defineLocals(env, blockStmt.names, values)
      return null
    }

    case "Evaluate": {
      const values = evaluate(mod, env, blockStmt.exp, options)
      if (values.length !== 0) {
        throw new Error(
          [
            `[evaluateBlockStmt / Evaluate] I expect the result of the evalutaion to have zero values.`,
            ``,
            `  block stmt: ${formatBlockStmt(blockStmt)}`,
            `  values: [${values
              .map((value) => formatValue(env, value))
              .join(", ")}]`,
          ].join("\n"),
        )
      }

      return null
    }

    case "Return": {
      return evaluate(mod, env, blockStmt.exp, options)
    }
  }
}
