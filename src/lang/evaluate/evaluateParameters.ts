import { type Env } from "../env/index.js"
import { type Mod } from "../mod/index.js"
import { type Parameter, type ParameterExp } from "../parameter/index.js"
import { type EvaluateOptions } from "./evaluate.js"
import { evaluateOne } from "./evaluateOne.js"

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
