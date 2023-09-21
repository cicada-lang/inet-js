import { formatExp } from "../exp"
import { ParameterExp } from "./Parameter"

export function formatParameterExp(parameter: ParameterExp): string {
  const t = formatExp(parameter.t)
  if (parameter.isPrincipal) {
    return `${parameter.name}!: ${t}`
  } else {
    return `${parameter.name}: ${t}`
  }
}
