import { type Env } from "../env/index.js"
import { formatValue } from "../value/index.js"
import { type Parameter } from "./Parameter.js"

export function formatParameter(env: Env, parameter: Parameter): string {
  const t = formatValue(env, parameter.t)
  if (parameter.isPrincipal) {
    return `${parameter.name}!: ${t}`
  } else {
    return `${parameter.name}: ${t}`
  }
}
