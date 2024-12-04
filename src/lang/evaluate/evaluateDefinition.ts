import { type Definition } from "../definition/index.ts"
import { type Env } from "../env/index.ts"
import { addNodeFromDefinition } from "../node/addNodeFromDefinition.ts"
import { type Value } from "../value/index.ts"
import { type EvaluateOptions } from "./evaluate.ts"

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
