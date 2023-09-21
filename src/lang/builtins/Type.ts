import { Env } from "../env"

export function apply(env: Env): void {
  env.stack.push({
    "@type": "Value",
    "@kind": "Type",
  })
}
