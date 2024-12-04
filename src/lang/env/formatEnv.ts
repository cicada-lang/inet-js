import { indent } from "../../utils/indent.ts"
import { formatNet } from "../net/formatNet.ts"
import { netIsEmpty } from "../net/netIsEmpty.ts"
import { formatValues } from "../value/formatValues.ts"
import { formatValue } from "../value/index.ts"
import { type Env } from "./Env.ts"

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
