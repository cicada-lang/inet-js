import { type Env } from "../env/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Parameter, type ParameterExp } from "../parameter/index.ts"
import { type EvaluateOptions } from "./evaluate.ts"
import { evaluateOne } from "./evaluateOne.ts"

export function evaluateParameters(
  mod: Mod,
  env: Env,
  parameterExps: Array<ParameterExp>,
  options: EvaluateOptions,
): Array<Parameter> {
  return parameterExps.map(({ name, t, isPrincipal }) => ({
    name,
    t: evaluateOne(mod, env, t, options),
    isPrincipal,
  }))
}
