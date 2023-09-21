import { Checking } from "../checking"
import { Env } from "../env"
import { Exp } from "../exp"
import { Mod, findDefinitionOrFail } from "../mod"
import { Node } from "../node"
import { Value } from "../value"
import { evaluateDefinition } from "./evaluateDefinition"

export interface EvaluateOptions {
  current?: { first: Node; second: Node }
  checking?: Checking
}

export function evaluate(
  mod: Mod,
  env: Env,
  exp: Exp,
  options: EvaluateOptions,
): Array<Value> {
  switch (exp["@kind"]) {
    case "Var": {
      const found = env.locals.get(exp.name)
      if (found !== undefined) {
        env.locals.delete(exp.name)
        return [found]
      } else {
        const definition = findDefinitionOrFail(mod, exp.name)
        const value = evaluateDefinition(env, definition, options)
        return [value]
      }
    }

    case "Ap": {
      return []
    }

    case "Symbol": {
      return [
        {
          "@type": "Value",
          "@kind": "Symbol",
          name: exp.name,
        },
      ]
    }

    case "Builtin": {
      return []
    }

    case "Block": {
      return []
    }
  }
}
