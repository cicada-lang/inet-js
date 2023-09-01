import { portEqual } from "../port/portEqual"
import { Edge } from "./Edge"

export function edgeEqual(x: Edge, y: Edge): boolean {
  return (
    (portEqual(x.first, y.first) && portEqual(x.second, y.second)) ||
    (portEqual(x.first, y.second) && portEqual(x.second, y.first))
  )
}
