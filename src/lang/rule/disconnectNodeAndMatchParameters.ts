import { Env } from "../env"
import { defineLocals } from "../env/defineLocals"
import { disconnectNode } from "../net/disconnectNode"
import { Node, formatNode } from "../node"
import { ParameterWithoutType } from "../stmt/Parameter"
import { formatParameterWithoutType } from "../stmt/formatParameterWithoutType"

export function disconnectNodeAndMatchParameters(
  env: Env,
  node: Node,
  parameters: Array<ParameterWithoutType>,
): void {
  const halfEdges = disconnectNode(env.net, node)

  for (const [index, parameter] of parameters.entries()) {
    if (!parameter.isPrincipal) {
      const halfEdge = halfEdges[index]
      if (halfEdge === undefined) {
        throw new Error(
          [
            `[exposeRuleTarget] I expect a halfEdge at the index.`,
            ``,
            `  node: ${formatNode(env.net, node)}`,
            `  index: ${index}`,
            `  paramenter: ${formatParameterWithoutType(parameter)}`,
          ].join("\n"),
        )
      }

      defineLocals(env, [parameter.name], [halfEdge])
    }
  }
}
