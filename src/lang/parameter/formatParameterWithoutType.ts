import { type ParameterWithoutType } from "./Parameter.js"

export function formatParameterWithoutType(
  parameter: ParameterWithoutType,
): string {
  if (parameter.isPrincipal) {
    return `${parameter.name}!`
  } else {
    return `${parameter.name}`
  }
}
