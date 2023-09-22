import { Mod } from "../mod"
import { Parameter } from "../stmt/Parameter"
import { formatParameters } from "../stmt/formatParameters"

export function checkNode(
  mod: Mod,
  input: Array<Parameter>,
  output: Array<Parameter>,
): void {
  const principalParameters = [...input, ...output].filter(
    (parameters) => parameters.isPrincipal,
  )

  if (principalParameters.length !== 1) {
    throw new Error(
      [
        `[checkNode] I expect a node to have one and only one principal port.`,
        ``,
        `  declared principal ports: [${formatParameters(
          mod.env,
          principalParameters,
        )}]`,
      ].join("\n"),
    )
  }
}
