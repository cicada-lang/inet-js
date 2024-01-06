import { type Definition } from "../definition/index.js"
import { type Env } from "../env/index.js"
import { addNodeFromDefinition } from "../node/addNodeFromDefinition.js"
import { type Value } from "../value/index.js"
import { type EvaluateOptions } from "./evaluate.js"

export function evaluateDefinition(
  env: Env,
  definition: Definition,
  options: EvaluateOptions,
): Value {
  switch (definition["@kind"]) {
    case "NodeDefinition": {
      return addNodeFromDefinition(env.net, definition)
    }

    case "TypeDefinition": {
      if (definition.input.length === 0) {
        return {
          "@type": "Value",
          "@kind": "TypeTerm",
          mod: definition.mod,
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
