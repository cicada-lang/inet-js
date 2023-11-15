import { Env } from "../env"
import { Mod } from "../mod"
import { Parameter, ParameterExp } from "../parameter"
import { EvaluateOptions } from "./evaluate"
import { evaluateOne } from "./evaluateOne"

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
