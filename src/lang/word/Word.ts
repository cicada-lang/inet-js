import { ActiveEdge, Net } from "../graph"
import { Mod } from "../mod"
import { Span } from "../span"

export interface WordOptions {
  activeEdge?: ActiveEdge
}

export interface Word {
  span: Span
  apply(mod: Mod, net: Net, options?: WordOptions): void
}
