import { type Env } from "../env/index.js"
import { type Value } from "./Value.js"
import { formatValue } from "./formatValue.js"

export function formatValues(env: Env, values: Array<Value>): string {
  return values.map((value) => formatValue(env, value)).join(", ")
}
