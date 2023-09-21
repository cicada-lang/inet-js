import { Env } from "../env"
import { EvaluateOptions } from "../evaluate"
import { Function, Value } from "../value"

export function applyFunction(
  env: Env,
  target: Function,
  args: Array<Value>,
  options: EvaluateOptions,
): Array<Value> {
  throw new Error("TODO")
}
