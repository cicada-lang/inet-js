import { apply } from "../apply"
import { Checking } from "../checking"
import { Env } from "../env"
import { appendReport } from "../errors"
import { Exp, formatExp } from "../exp"
import { Mod, findDefinitionOrFail } from "../mod"
import { Value } from "../value"
import { evaluateBlock } from "./evaluateBlock"
import { evaluateDefinition } from "./evaluateDefinition"
import { evaluateOne } from "./evaluateOne"

export interface EvaluateOptions {
  checking?: Checking
}

export function evaluate(
  mod: Mod,
  env: Env,
  exp: Exp,
  options: EvaluateOptions,
): Array<Value> {
  try {
    switch (exp["@kind"]) {
      case "Var": {
        const found = env.locals.get(exp.name)
        if (found !== undefined) {
          env.locals.delete(exp.name)
          return [found]
        } else {
          const definition = findDefinitionOrFail(mod, exp.name)
          const value = evaluateDefinition(mod, env, definition, options)
          return [value]
        }
      }

      case "Ap": {
        return apply(
          mod,
          env,
          evaluateOne(mod, env, exp.target, options),
          exp.args.map((arg) => evaluateOne(mod, env, arg, options)),
          options,
        )
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
        const definition = mod.builtins.get(exp.name)
        if (definition === undefined) {
          throw new Error(
            [
              `[evaluate / Builtin] I meet undefined builtin.`,
              ``,
              `  name: ${exp.name}`,
            ].join("\n"),
          )
        }

        const value = evaluateDefinition(mod, env, definition, options)
        return [value]
      }

      case "Block": {
        return evaluateBlock(mod, env, exp.body, options)
      }
    }
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[evaluate] I fail to evaluate exp.`,
        ``,
        `  exp: ${formatExp(exp)}`,
      ].join("\n"),
      context: {
        span: exp.span,
        text: mod.text,
      },
    })
  }
}
