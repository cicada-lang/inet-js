import { type Env } from "../env/index.ts"
import { type BlockStmt } from "../exp/BlockStmt.ts"
import { type Mod } from "../mod/index.ts"
import { type Value } from "../value/index.ts"
import { type EvaluateOptions } from "./evaluate.ts"
import { evaluateBlockStmt } from "./evaluateBlockStmt.ts"

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
