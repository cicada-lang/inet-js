import { indent } from "../../utils/indent"
import { formatNet } from "../net/formatNet"
import { netIsEmpty } from "../net/netIsEmpty"
import { formatValue } from "../value"
import { formatValues } from "../value/formatValues"
import { Env } from "./Env"

export function formatEnv(env: Env): string {
  const netText = netIsEmpty(env.net)
    ? "net {}"
    : `net {\n${indent(formatNet(env.net))}\n}`

  const localsText =
    env.locals.size === 0
      ? "locals {}"
      : `locals {\n${indent(
          Array.from(env.locals.entries())
            .map(([name, value]) => `${name}: ${formatValue(env, value)}.`)
            .join("\n"),
        )}\n}`

  const stackText =
    env.stack.length === 0
      ? "stack []"
      : `stack [${formatValues(env, env.stack)}]`

  return [
    `env {`,
    indent(netText),
    indent(localsText),
    indent(stackText),
    `}`,
  ].join("\n")
}
