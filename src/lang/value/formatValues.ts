import { Env } from "../env"
import { Value } from "./Value"
import { formatValue } from "./formatValue"

export function formatValues(env: Env, values: Array<Value>): string {
  return values.map((value) => formatValue(env, value)).join(", ")
}
