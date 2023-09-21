import { Span } from "../span"
import { Definition } from "./Definition"

export function definitionMaybeSpan(definition: Definition): Span | undefined {
  switch (definition["@kind"]) {
    case "PrimitiveFunctionDefinition":
    case "ValueDefinition":
      return undefined
    default:
      return definition.span
  }
}
