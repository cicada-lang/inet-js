import { capNodeAllPorts } from "../cap"
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
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { exposeRuleTargets } from "../rule/exposeRuleTargets"

export function presentRuleAsNets(mod: Mod, ruleName: string): [Net, Net] {
  const env = createEnv(mod)

  const rule = findRuleByName(mod, ruleName)
  if (rule === undefined) {
    throw new Error(
      [
        `[presentRuleAsNets] I meet undefined rule.`,
        ``,
        `  ruleName: ${ruleName}`,
      ].join("\n"),
    )
  }

  const [firstName, secondName] = ruleName.split(" ")

  const firstNode = createNodeFromDefinition(
    env.net,
    findDefinitionOrFail(mod, firstName),
  )

  const secondNode = createNodeFromDefinition(
    env.net,
    findDefinitionOrFail(mod, secondName),
  )

  capNodeAllPorts(mod, env.net, firstNode)
  capNodeAllPorts(mod, env.net, secondNode)

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
