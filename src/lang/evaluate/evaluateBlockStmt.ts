import { Env } from "../env"
import { BlockStmt } from "../exp/BlockStmt"
import { Mod } from "../mod"
import { Value } from "../value"
import { EvaluateOptions } from "./evaluate"

export function evaluateBlockStmt(
  mod: Mod,
  env: Env,
  stmt: BlockStmt,
  options: EvaluateOptions,
): Value {
  throw new Error("TODO")
}
