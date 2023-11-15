import { Mod } from "../mod"
import { Parameter, formatParameters } from "../parameter"

export function checkTypeParameters(mod: Mod, input: Array<Parameter>): void {
  for (const parameter of input) {
    if (parameter.t["@kind"] !== "Type") {
      throw new Error(
        [
          `[checkTypeParameters] I expect the claimed input parameters`,
          `  of a type definition to be Type.`,
          ``,
          `  input parameters: [${formatParameters(mod.env, input)}]`,
        ].join("\n"),
      )
    }
  }
}
