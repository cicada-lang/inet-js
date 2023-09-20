import { formatExp } from "../exp"
import { Parameter } from "./Parameter"

export function formatParameter(parameter: Parameter): string {
  const t = formatExp(parameter.t)
  if (parameter.isPrincipal) {
    return `${parameter.name}!: ${t}`
  } else {
    return `${parameter.name}: ${t}`
  }
}
