import { type Mod } from "../mod/index.ts"
import { formatParameters, type Parameter } from "../parameter/index.ts"

export function checkNodeParameters(
  mod: Mod,
  input: Array<Parameter>,
  output: Array<Parameter>,
): void {
  const parameters = [...input, ...output]
  for (const parameter of parameters) {
    if (
      parameter.t["@kind"] !== "Symbol" &&
      parameter.t["@kind"] !== "TypeTerm"
    ) {
      throw new Error(
        [
          `[checkNodeParameters] I expect all parameters of a node to be Symbol or TypeTerm.`,
          ``,
          `  parameters: [${formatParameters(mod.env, parameters)}]`,
        ].join("\n"),
      )
    }
  }

  const principalParameters = parameters.filter(
    (parameters) => parameters.isPrincipal,
  )

  if (principalParameters.length !== 1) {
    throw new Error(
      [
        `[checkNodeParameters] I expect a node to have one and only one principal port.`,
        ``,
        `  declared principal ports: [${formatParameters(
          mod.env,
          principalParameters,
        )}]`,
      ].join("\n"),
    )
  }
}
