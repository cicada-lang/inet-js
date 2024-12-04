import { defineLocals } from "../env/defineLocals.ts"
import { type Env } from "../env/index.ts"
import { disconnectNode } from "../net/disconnectNode.ts"
import { formatNode, type Node } from "../node/index.ts"
import {
  formatParameterWithoutType,
  type ParameterWithoutType,
} from "../parameter/index.ts"

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
