import { Checking } from "../checking"
import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Node } from "../node"
import { Value } from "../value"

export interface EvaluateOptions {
  current?: { first: Node; second: Node }
  checking?: Checking
}

export function evaluate(
  mod: Mod,
  env: Env,
  exp: Exp,
  options: EvaluateOptions,
): Value {
  throw new Error("TODO")
}
