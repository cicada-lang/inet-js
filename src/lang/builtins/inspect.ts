import { indent } from "../../utils/indent"
import { PrimitiveApply } from "../definition"
import { findConnectedComponent } from "../net/findConnectedComponent"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail"
import { formatNet } from "../net/formatNet"
import { formatPort } from "../port/formatPort"
import { formatValue } from "../value/formatValue"

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
      env.mod.loader.onOutput(
        `netFromPort ${formatPort(env.net, otherPort)} end`,
      )
    } else {
      env.mod.loader.onOutput(`netFromPort ${formatPort(env.net, otherPort)}`)
      env.mod.loader.onOutput(indent(netText))
      env.mod.loader.onOutput("end")
    }
  } else {
    env.mod.loader.onOutput(formatValue(env, value))
  }

  return [value]
}
