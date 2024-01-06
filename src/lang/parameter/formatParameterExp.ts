import { formatExp } from "../exp/index.js"
import { type ParameterExp } from "./Parameter.js"

export function formatParameterExp(parameter: ParameterExp): string {
  const t = formatExp(parameter.t)
  if (parameter.isPrincipal) {
    return `${parameter.name}!: ${t}`
  } else {
    return `${parameter.name}: ${t}`
  }
}
