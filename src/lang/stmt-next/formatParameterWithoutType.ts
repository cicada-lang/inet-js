import { ParameterWithoutType } from "./Parameter"

export function formatParameterWithoutType(
  parameter: ParameterWithoutType,
): string {
  if (parameter.isPrincipal) {
    return `${parameter.name}!`
  } else {
    return `${parameter.name}`
  }
}
