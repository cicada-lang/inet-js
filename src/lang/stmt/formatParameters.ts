import { Env } from "../env"
import { Parameter } from "./Parameter"
import { formatParameter } from "./formatParameter"

export function formatParameters(
  env: Env,
  parameters: Array<Parameter>,
): string {
  return parameters
    .map((parameter) => formatParameter(env, parameter))
    .join(", ")
}
