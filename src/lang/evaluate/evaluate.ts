import { apply } from "../apply/index.js"
import { type Checking } from "../checking/index.js"
import { type Env } from "../env/index.js"
import { appendReport } from "../errors/index.js"
import { formatExp, type Exp } from "../exp/index.js"
import { findDefinitionOrFail, type Mod } from "../mod/index.js"
import { type Value } from "../value/index.js"
import { evaluateBlock } from "./evaluateBlock.js"
import { evaluateDefinition } from "./evaluateDefinition.js"
import { evaluateOne } from "./evaluateOne.js"

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
          const value = evaluateDefinition(env, definition, options)
          return [value]
        }
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

        const value = evaluateDefinition(env, definition, options)
        return [value]
      }

      case "Ap": {
        return apply(
          env,
          evaluateOne(mod, env, exp.target, options),
          exp.args.map((arg) => evaluateOne(mod, env, arg, options)),
          options,
        )
      }

      case "QuoteSymbol": {
        return [
          {
            "@type": "Value",
            "@kind": "Symbol",
            name: exp.name,
          },
        ]
      }

      case "Block": {
        return evaluateBlock(mod, env, exp.body, options)
      }
    }
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[evaluate] I fail to evaluate an exp.`,
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
