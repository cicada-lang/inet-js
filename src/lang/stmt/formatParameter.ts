import { Env } from "../env"
import { formatValue } from "../value"
import { Parameter } from "./Parameter"

export function formatParameter(env: Env, parameter: Parameter): string {
  const t = formatValue(env, parameter.t)
  if (parameter.isPrincipal) {
    return `${parameter.name}!: ${t}`
  } else {
    return `${parameter.name}: ${t}`
  }
}
