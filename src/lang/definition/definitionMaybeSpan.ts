import { type Span } from "../span/index.js"
import { type Definition } from "./Definition.js"

export function definitionMaybeSpan(definition: Definition): Span | undefined {
  switch (definition["@kind"]) {
    case "PrimitiveFunctionDefinition":
    case "ValueDefinition":
      return undefined
    default:
      return definition.span
  }
}
