import { capType } from "../cap/capType"
import { createChecking } from "../checking/createChecking"
import { collectWords } from "../compose/collectWords"
import { compose } from "../compose/compose"
import { connectPortWithHalfEdge } from "../connect/connectPortWithHalfEdge"
import { createEnv } from "../env/createEnv"
import { freshenType } from "../freshen/freshenType"
import { Mod } from "../mod"
import { addEdge } from "../net/addEdge"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail"
import { unifyTypes } from "../unify/unifyTypes"
import { formatValue } from "../value/formatValue"
import { Word } from "../word"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed"

export function checkWords(
  mod: Mod,
  input: Array<Word>,
  output: Array<Word>,
  words: Array<Word>,
): void {
  const checking = createChecking()
  const env = createEnv(mod)
  const occurredNames = new Map()

  const inputValues = collectWords(mod, env, input, {
    checking,
  }).map((t) => freshenType(checking.typeVarCounters, t, occurredNames))

  checkAllLocalsAreUsed(env.locals)

  const capOutputPorts = inputValues
    .reverse()
    .map((t) => capType(mod, env.net, t))

  for (const port of capOutputPorts) {
    const edge = addEdge(env.net)
    connectPortWithHalfEdge(env.net, port, edge.first)
    env.stack.push(edge.second)
  }

  for (const word of words) {
    compose(mod, env, word, {
      checking,
    })
  }

  checkAllLocalsAreUsed(env.locals)

  const outputValues = collectWords(mod, env, output, {
    checking,
  }).map((t) => freshenType(checking.typeVarCounters, t, occurredNames))

  checkAllLocalsAreUsed(env.locals)

  for (const t of [...outputValues].reverse()) {
    const value = env.stack.pop()
    if (value === undefined) {
      throw new Error(`[checkWords] I expect a value on top of the stack.`)
    }

    if (value["@kind"] !== "HalfEdge") {
      throw new Error(
        [
          `[checkWords] I expect the top value on the stack to be a HalfEdge.`,
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
    unifyTypes(env, checking.substitution, otherPort.t, t)
  }

  if (env.stack.length !== 0) {
    throw new Error(
      [
        `[checkWords] I expect the stack to be empty after checking.`,
        ``,
        `  stack length: ${env.stack.length}`,
        `  stack: [${env.stack
          .map((value) => formatValue(env, value))
          .join(", ")}]`,
        ``,
        `  Maybe this is due to extra input arity,`,
        `  or lack of output arity.`,
      ].join("\n"),
    )
  }
}
