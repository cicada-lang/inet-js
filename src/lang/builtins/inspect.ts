import { indent } from "../../utils/indent.ts"
import { type PrimitiveApply } from "../definition/index.ts"
import { findConnectedComponent } from "../net/findConnectedComponent.ts"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.ts"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail.ts"
import { formatNet } from "../net/formatNet.ts"
import { formatPort } from "../port/formatPort.ts"
import { formatValue } from "../value/formatValue.ts"

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
