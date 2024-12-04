import { type Span } from "../span/index.ts"
import { type Definition } from "./Definition.ts"

export function definitionMaybeSpan(definition: Definition): Span | undefined {
  switch (definition["@kind"]) {
    case "PrimitiveFunctionDefinition":
    case "ValueDefinition":
      return undefined
    default:
      return definition.span
  }
}
