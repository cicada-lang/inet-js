import { type HalfEdge } from "../half-edge/index.js"
import { type Mod } from "../mod/index.js"
import { createNet } from "../net/createNet.js"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail.js"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail.js"
import { type Net } from "../net/index.js"
import { moveConnectedComponent } from "../net/moveConnectedComponent.js"
import { runNet } from "./runNet.js"

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
