import { Ctx } from "../ctx"
import { Port } from "../graph"
import { Net } from "../net"
import { SignedType } from "../type"

export function compose(net: Net): void {
  const x2 = net.ports.pop() as Port
  const x1 = net.ports.pop() as Port
  const x0 = net.ports.pop() as Port
  net.ports.push(x1, x2, x0)
}

export function cut(ctx: Ctx): void {
  const x2 = ctx.signedTypes.pop() as SignedType
  const x1 = ctx.signedTypes.pop() as SignedType
  const x0 = ctx.signedTypes.pop() as SignedType
  ctx.signedTypes.push(x1, x2, x0)
}