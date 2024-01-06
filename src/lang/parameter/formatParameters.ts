import { type Env } from "../env/index.js"
import { type Parameter } from "./Parameter.js"
import { formatParameter } from "./formatParameter.js"

export function formatParameters(
  env: Env,
  parameters: Array<Parameter>,
): string {
  return parameters
    .map((parameter) => formatParameter(env, parameter))
    .join(", ")
}
