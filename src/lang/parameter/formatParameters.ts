import { type Env } from "../env/index.ts"
import { type Parameter } from "./Parameter.ts"
import { formatParameter } from "./formatParameter.ts"

export function formatParameters(
  env: Env,
  parameters: Array<Parameter>,
): string {
  return parameters
    .map((parameter) => formatParameter(env, parameter))
    .join(", ")
}
