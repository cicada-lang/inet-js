import { Definition } from "../definition"
import { Env } from "../env"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { Value } from "../value"
import { EvaluateOptions } from "./evaluate"

export function evaluateDefinition(
  env: Env,
  definition: Definition,
  options: EvaluateOptions,
): Value {
  switch (definition["@kind"]) {
    case "NodeDefinition": {
      return createNodeFromDefinition(env.net, definition)
    }

    case "TypeDefinition": {
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
  }
}
