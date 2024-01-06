import { defineLocals } from "../env/defineLocals.js"
import { type Env } from "../env/index.js"
import { disconnectNode } from "../net/disconnectNode.js"
import { formatNode, type Node } from "../node/index.js"
import {
  formatParameterWithoutType,
  type ParameterWithoutType,
} from "../parameter/index.js"

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
            `  parameter: ${formatParameterWithoutType(parameter)}`,
          ].join("\n"),
        )
      }

      defineLocals(env, [parameter.name], [halfEdge])
    }
  }
}
