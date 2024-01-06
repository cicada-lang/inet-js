import { indent } from "../../utils/indent.js"
import { type PrimitiveApply } from "../definition/index.js"
import { findConnectedComponent } from "../net/findConnectedComponent.js"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.js"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail.js"
import { formatNet } from "../net/formatNet.js"
import { formatPort } from "../port/formatPort.js"
import { formatValue } from "../value/formatValue.js"

export const apply: PrimitiveApply = (env, args) => {
  if (args.length !== 1) {
    throw new Error([`[@inspect] I expect one argument.`].join("\n"))
  }

  const [value] = args

  if (value["@kind"] === "HalfEdge") {
    const valueHalfEdgeEntry = findHalfEdgeEntryOrFail(env.net, value)
    const otherPort = findHalfEdgePortOrFail(
      env.net,
      valueHalfEdgeEntry.otherHalfEdge,
    )
    const connectedcomponent = findConnectedComponent(env.net, otherPort.node)
    const netText = formatNet(connectedcomponent)
    if (netText.length === 0) {
      env.mod.loader.onOutput(`net ${formatPort(env.net, otherPort)} {}`)
    } else {
      env.mod.loader.onOutput(
        `net ${formatPort(env.net, otherPort)} {\n${indent(netText)}\n}`,
      )
    }
  } else {
    env.mod.loader.onOutput(formatValue(env, value))
  }

  return [value]
}
