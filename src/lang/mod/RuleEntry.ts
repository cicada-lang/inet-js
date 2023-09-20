import { NodeWithoutId } from "../node"
import { Mod } from "./Mod"

export type RuleEntry = {
  name: string
  firstNode: NodeWithoutId
  secondNode: NodeWithoutId
  mod: Mod
}
