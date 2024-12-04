import { formatExp } from "../exp/index.ts"
import { type ParameterExp } from "./Parameter.ts"

export function formatParameterExp(parameter: ParameterExp): string {
  const t = formatExp(parameter.t)
  if (parameter.isPrincipal) {
    return `${parameter.name}!: ${t}`
  } else {
    return `${parameter.name}: ${t}`
  }
}
