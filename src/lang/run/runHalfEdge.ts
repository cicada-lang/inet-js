import { type HalfEdge } from "../half-edge/index.ts"
import { type Mod } from "../mod/index.ts"
import { createNet } from "../net/createNet.ts"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.ts"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail.ts"
import { type Net } from "../net/index.ts"
import { moveConnectedComponent } from "../net/moveConnectedComponent.ts"
import { runNet } from "./runNet.ts"

export function runHalfEdge(mod: Mod, net: Net, halfEdge: HalfEdge): void {
  const component = createNet()

  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)

  const otherPort = findHalfEdgePortOrFail(net, halfEdgeEntry.otherHalfEdge)
  moveConnectedComponent(net, component, otherPort.node)

  runNet(mod, component)

  const resultPort = findHalfEdgePortOrFail(
    component,
    halfEdgeEntry.otherHalfEdge,
  )
  moveConnectedComponent(component, net, resultPort.node)
}
