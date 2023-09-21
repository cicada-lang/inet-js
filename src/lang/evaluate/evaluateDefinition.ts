import { Definition } from "../definition"
import { Env } from "../env"
import { Mod } from "../mod"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { Value } from "../value"
import { EvaluateOptions } from "./evaluate"

export function evaluateDefinition(
  mod: Mod,
  env: Env,
  definition: Definition,
  options: EvaluateOptions,
): Value {
  switch (definition["@kind"]) {
    case "NodeDefinition": {
      return createNodeFromDefinition(env.net, definition)
    }

    case "TypeDefinition": {
      if (definition.input.length === 0) {
        return {
          "@type": "Value",
          "@kind": "TypeTerm",
          mod,
          name: definition.name,
          args: [],
        }
      }

      return {
        "@type": "Value",
        "@kind": "TypeCtor",
        definition,
      }
    }

    case "FunctionDefinition": {
      return {
        "@type": "Value",
        "@kind": "Function",
        definition,
      }
    }

    case "PrimitiveFunctionDefinition": {
      return {
        "@type": "Value",
        "@kind": "PrimitiveFunction",
        definition,
      }
    }

    case "ValueDefinition": {
      return definition.value
    }
  }
}
