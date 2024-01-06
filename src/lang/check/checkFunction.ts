import { capType } from "../cap/capType.js"
import { createChecking } from "../checking/createChecking.js"
import { connectHalfEdgeWithPort } from "../connect/connectHalfEdgeWithPort.js"
import { createEnv } from "../env/createEnv.js"
import { defineLocals } from "../env/defineLocals.js"
import { evaluateBlock } from "../evaluate/evaluateBlock.js"
import { type BlockStmt } from "../exp/BlockStmt.js"
import { freshenType } from "../freshen/freshenType.js"
import { type Mod } from "../mod/index.js"
import { addEdge } from "../net/addEdge.js"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.js"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail.js"
import { type Parameter } from "../parameter/index.js"
import { unifyTypes } from "../unify/unifyTypes.js"
import { formatValues } from "../value/formatValues.js"
import { type Value } from "../value/index.js"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed.js"

export function checkFunction(
  mod: Mod,
  input: Array<Parameter>,
  retType: Value,
  body: Array<BlockStmt>,
): void {
  const checking = createChecking()
  const env = createEnv(mod)
  const occurredNames = new Map()

  const inputTypes = input.map((parameter) =>
    freshenType(checking.typeVarCounters, parameter.t, occurredNames),
  )

  const capOutputPorts = inputTypes
    .reverse()
    .map((t) => capType(mod, env.net, t))

  for (const [index, port] of capOutputPorts.entries()) {
    const parameter = input[index]
    const edge = addEdge(env.net)
    connectHalfEdgeWithPort(env.net, edge.first, port)
    defineLocals(env, [parameter.name], [edge.second])
  }

  const values = evaluateBlock(mod, env, body, { checking })

  if (values.length !== 1) {
    throw new Error(
      [
        `[checkFunciton] I expect number of return values to be one.`,
        ``,
        `  values: ${formatValues(env, values)}`,
      ].join("\n"),
    )
  }

  const [value] = values

  retType = freshenType(checking.typeVarCounters, retType, occurredNames)

  if (value["@kind"] !== "HalfEdge") {
    throw new Error(
      [
        `[checkFunciton] I expect the top value on the stack to be a HalfEdge.`,
        ``,
        `  value['@kind']: ${value["@kind"]}`,
      ].join("\n"),
    )
  }

  const valueHalfEdgeEntry = findHalfEdgeEntryOrFail(env.net, value)
  const otherPort = findHalfEdgePortOrFail(
    env.net,
    valueHalfEdgeEntry.otherHalfEdge,
  )
  unifyTypes(env, checking.substitution, otherPort.t, retType)

  checkAllLocalsAreUsed(env.locals)
}
