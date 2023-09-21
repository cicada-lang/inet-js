import { Env } from "../env"
import { BlockStmt } from "../exp/BlockStmt"
import { Mod } from "../mod"
import { EvaluateOptions } from "./evaluate"

export function evaluateBlockStmt(
  mod: Mod,
  env: Env,
  stmt: BlockStmt,
  options: EvaluateOptions,
): void {
  throw new Error("TODO")
}
