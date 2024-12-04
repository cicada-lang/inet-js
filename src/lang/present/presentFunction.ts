import { capType } from "../cap/index.ts"
import { connectHalfEdgeWithPort } from "../connect/connectHalfEdgeWithPort.ts"
import { createEnv } from "../env/createEnv.ts"
import { defineLocals } from "../env/defineLocals.ts"
import { type Env } from "../env/index.ts"
import { evaluateBlock } from "../evaluate/evaluateBlock.ts"
import { findDefinitionOrFail, type Mod } from "../mod/index.ts"
import { addEdge } from "../net/addEdge.ts"

export function presentFunction(mod: Mod, name: string): Env {
  const definition = findDefinitionOrFail(mod, name)

  if (definition["@kind"] !== "FunctionDefinition") {
    throw new Error(
      [
        `[presentFunction] I expect to find a FunctionDefinition from the name.`,
        ``,
        `  name: ${name}`,
        `  definition kind: ${definition["@kind"]}`,
      ].join("\n"),
    )
  }

  const env = createEnv(mod)

  const { input, body } = definition

  const capOutputPorts = input
    .reverse()
    .map((parameter) => capType(mod, env.net, parameter.t))

  for (const [index, port] of capOutputPorts.entries()) {
    const parameter = input[index]
    const edge = addEdge(env.net)
    connectHalfEdgeWithPort(env.net, edge.first, port)
    defineLocals(env, [parameter.name], [edge.second])
  }

  const values = evaluateBlock(mod, env, body, {})

  env.stack.push(...values)

  return env
}
