import { type Env } from "../env/index.ts"
import { formatValue } from "../value/index.ts"
import { type Parameter } from "./Parameter.ts"

export function formatParameter(env: Env, parameter: Parameter): string {
  const t = formatValue(env, parameter.t)
  if (parameter.isPrincipal) {
    return `${parameter.name}!: ${t}`
  } else {
    return `${parameter.name}: ${t}`
  }
}
