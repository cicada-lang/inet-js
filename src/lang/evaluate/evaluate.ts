import { Checking } from "../checking"
import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Node } from "../node"
import { Value } from "../value"

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
      return []
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
