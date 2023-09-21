import { Env } from "../env"
import { BlockStmt } from "../exp/BlockStmt"
import { Mod } from "../mod"
import { Value } from "../value"
import { EvaluateOptions } from "./evaluate"
import { evaluateBlockStmt } from "./evaluateBlockStmt"

export function evaluateBlock(
  mod: Mod,
  env: Env,
  body: Array<BlockStmt>,
  options: EvaluateOptions,
): Array<Value> {
  for (const [index, stmt] of body.entries()) {
    const values = evaluateBlockStmt(mod, env, stmt, options)
    if (values !== null) {
      if (index !== body.length - 1) {
        throw new Error(
          [
            `[evaluateBlock] I expect the return stmt to be at the end of the block.`,
            ``,
            `  return stmt index: ${index}`,
            `  lenght of block: ${body.length}`,
          ].join("\n"),
        )
      }

      return values
    }
  }

  return []
}
