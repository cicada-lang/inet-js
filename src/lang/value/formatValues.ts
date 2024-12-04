import { type Env } from "../env/index.ts"
import { type Value } from "./Value.ts"
import { formatValue } from "./formatValue.ts"

export function formatValues(env: Env, values: Array<Value>): string {
  return values.map((value) => formatValue(env, value)).join(", ")
}
