import { capNodeNonPrinciplePorts } from "../cap"
import { connectPorts } from "../connect/connectPorts"
import { createEnv } from "../env/createEnv"
import { evaluateBlock } from "../evaluate/evaluateBlock"
import { Mod, findDefinitionOrFail } from "../mod"
import { findRuleByName } from "../mod/findRuleByName"
import { Net, copyConnectedComponent, createNet } from "../net"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { disconnectPort } from "../net/disconnectPort"
import { findPrincipalPort } from "../net/findPrincipalPort"
import { Node } from "../node"
import { addNodeFromDefinition } from "../node/addNodeFromDefinition"
import { exposeRuleTargets } from "../rule/exposeRuleTargets"

export function presentRule(mod: Mod, ruleName: string): [Net, Net] {
  const env = createEnv(mod)

  const rule = findRuleByName(mod, ruleName)
  if (rule === undefined) {
    throw new Error(
      [
        `[presentRule] I meet undefined rule.`,
        ``,
        `  ruleName: ${ruleName}`,
      ].join("\n"),
    )
  }

  const [firstName, secondName] = ruleName.split(" ")

  const firstNode = addNodeFromDefinition(
    env.net,
    findDefinitionOrFail(mod, firstName),
  )

  const secondNode = addNodeFromDefinition(
    env.net,
    findDefinitionOrFail(mod, secondName),
  )

  capNodeNonPrinciplePorts(mod, env.net, firstNode)
  capNodeNonPrinciplePorts(mod, env.net, secondNode)

  const initial = collectInitialNet(env.net, firstNode, secondNode)

  exposeRuleTargets(env, rule, [firstNode, secondNode])
  evaluateBlock(mod, env, rule.body, {})

  deleteNodeEntry(env.net, firstNode)
  deleteNodeEntry(env.net, secondNode)

  const final = env.net

  return [initial, final]
}

function collectInitialNet(net: Net, first: Node, second: Node): Net {
  const initial = createNet()

  copyConnectedComponent(net, initial, first)
  copyConnectedComponent(net, initial, second)

  const firstPrincipalPort = findPrincipalPort(initial, first)
  const secondPrincipalPort = findPrincipalPort(initial, second)

  disconnectPort(initial, firstPrincipalPort)
  disconnectPort(initial, secondPrincipalPort)

  connectPorts(initial, firstPrincipalPort, secondPrincipalPort)

  return initial
}
