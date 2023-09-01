import { checkPortSigns } from "../check/checkPortSigns"
import { edgeEqual } from "../edge/edgeEqual"
import { Net } from "../net"
import { findPortEntry } from "../net/findPortEntry"
import { findPortRecordOrFail } from "../net/findPortRecordOrFail"
import { Port } from "../port"
import { formatValue } from "../value/formatValue"

export function connect(net: Net, first: Port, second: Port): void {
  const firstPortEntry = findPortEntry(net, first)

  if (firstPortEntry?.connection !== undefined) {
    throw new Error(
      [
        `[connect] The first port is already connected.`,
        ``,
        `  first port: ${formatValue(first)}`,
        `  first connected port: ${formatValue(
          firstPortEntry.connection.port,
        )}`,
        `  second port: ${formatValue(second)}`,
      ].join("\n"),
    )
  }

  const secondPortEntry = findPortEntry(net, second)

  if (secondPortEntry?.connection !== undefined) {
    throw new Error(
      [
        `[connect] The second port is already connected.`,
        ``,
        `  first port: ${formatValue(first)}`,
        `  second port: ${formatValue(second)}`,
        `  second connected port: ${formatValue(
          secondPortEntry.connection.port,
        )}`,
      ].join("\n"),
    )
  }

  checkPortSigns(first, second)

  const edge = { first, second }

  const firstPortRecord = findPortRecordOrFail(net, first.node)
  firstPortRecord[first.name].connection = { port: second }

  const secondPortRecord = findPortRecordOrFail(net, second.node)
  secondPortRecord[second.name].connection = { port: first }

  if (
    first.isPrincipal &&
    second.isPrincipal &&
    !net.activeEdges.find((edge) => edgeEqual(edge, { first, second }))
  ) {
    net.activeEdges.push(edge)
  }
}
