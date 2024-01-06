import { type Env } from "../env/index.js"
import { type BlockStmt } from "../exp/BlockStmt.js"
import { type Mod } from "../mod/index.js"
import { type Value } from "../value/index.js"
import { type EvaluateOptions } from "./evaluate.js"
import { evaluateBlockStmt } from "./evaluateBlockStmt.js"

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
