import { Checking } from "../checking"
import { connectHalfEdges } from "../connect/connectHalfEdges"
import { Env } from "../env"
import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { findDefinitionOrFail } from "../mod/findDefinitionOrFail"
import { disconnectHalfEdge } from "../net/disconnectHalfEdge"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail"
import { Node } from "../node"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { unifyTypes } from "../unify/unifyTypes"
import { Word } from "../word"
import { formatWord } from "../word/formatWord"
import { composeDefinition } from "./composeDefinition"
import { findExposedHalfEdgeOrFail } from "./findExposedHalfEdgeOrFail"

export interface ComposeOptions {
  current?: { first: Node; second: Node }
  checking?: Checking
}

export function compose(
  mod: Mod,
  env: Env,
  word: Word,
  options: ComposeOptions,
): null {
  try {
    switch (word["@kind"]) {
      case "Call": {
        const found = env.locals.get(word.name)
        if (found !== undefined) {
          env.stack.push(found)
          env.locals.delete(word.name)
          return null
        } else {
          const definition = findDefinitionOrFail(mod, word.name)
          composeDefinition(env, definition, options)
          return null
        }
      }

      case "LiteralNode": {
        const definition = findDefinitionOrFail(mod, word.name)
        const node = createNodeFromDefinition(env.net, definition)
        env.stack.push(node)
        return null
      }

      case "Builtin": {
        const definition = mod.builtins.get(word.name)
        if (definition === undefined) {
          throw new Error(
            [
              `[compose / Builtin] I meet undefined builtin.`,
              ``,
              `  name: ${word.name}`,
            ].join("\n"),
          )
        }

        composeDefinition(env, definition, options)
        return null
      }

      case "Local": {
        const port = env.stack.pop()
        if (port === undefined) {
          throw new Error(
            `[compose / Local] expect a port on the top of the stack.`,
          )
        }

        env.locals.set(word.name, port)
        return null
      }

      case "PortPush": {
        const exposedHalfEdge = findExposedHalfEdgeOrFail(
          env.net,
          word.nodeName,
          word.portName,
          options,
        )

        disconnectHalfEdge(env.net, exposedHalfEdge)
        env.stack.push(exposedHalfEdge)
        return null
      }

      case "PortReconnect": {
        const exposedHalfEdge = findExposedHalfEdgeOrFail(
          env.net,
          word.nodeName,
          word.portName,
          options,
        )

        const exposedPort = findHalfEdgePortOrFail(env.net, exposedHalfEdge)

        const value = env.stack.pop()
        if (value === undefined) {
          throw new Error(
            `[compose / PortReconnect] I expect top value on the stack.`,
          )
        }

        if (value["@kind"] !== "HalfEdge") {
          throw new Error(
            [
              `[compose / PortReconnect] I expect the top value to be a HalfEdge.`,
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

        if (options.checking) {
          unifyTypes(
            env,
            options.checking.substitution,
            otherPort.t,
            exposedPort.t,
          )
        }

        disconnectHalfEdge(env.net, exposedHalfEdge)
        connectHalfEdges(env.net, value, exposedHalfEdge)

        return null
      }

      case "GenerateSymbol": {
        env.stack.push({
          "@type": "Value",
          "@kind": "Symbol",
          name: word.name,
        })

        return null
      }

      case "Label": {
        const value = env.stack.pop()
        if (value === undefined) {
          throw new Error(`[compose / Label] I expect top value on the stack.`)
        }

        env.stack.push({
          "@type": "Value",
          "@kind": "Labeled",
          value,
          label: word.label,
          isImportant: word.isImportant,
        })

        return null
      }
    }
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[compose] I fail compose word.`,
        ``,
        `  word: ${formatWord(word)}`,
      ].join("\n"),
      context: {
        span: word.span,
        text: mod.text,
      },
    })
  }
}
