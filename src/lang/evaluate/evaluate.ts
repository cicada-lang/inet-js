import { apply } from "../apply"
import { Checking } from "../checking"
import { Env } from "../env"
import { Exp } from "../exp"
import { Mod, findDefinitionOrFail } from "../mod"
import { Node } from "../node"
import { Value } from "../value"
import { evaluateBlockStmt } from "./evaluateBlockStmt"
import { evaluateDefinition } from "./evaluateDefinition"
import { evaluateOne } from "./evaluateOne"

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
      return apply(
        env,
        evaluateOne(mod, env, exp.target, options),
        exp.args.map((arg) => evaluateOne(mod, env, arg, options)),
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

      const value = evaluateDefinition(env, definition, options)
      return [value]
    }

    case "Block": {
      for (const [index, stmt] of exp.body.entries()) {
        const values = evaluateBlockStmt(mod, env, stmt, options)
        if (values !== null) {
          if (index !== exp.body.length - 1) {
            throw new Error(
              [
                `[evaluate / Block] I expect the return stmt to be at the end of the block.`,
                ``,
                `  return stmt index: ${index}`,
                `  lenght of block: ${exp.body.length}`,
              ].join("\n"),
            )
          }

          return values
        }
      }

      return []
    }
  }
}
