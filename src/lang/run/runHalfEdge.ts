import { HalfEdge } from "../half-edge"
import { Mod } from "../mod"
import { Net } from "../net"
import { createNet } from "../net/createNet"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findHalfEdgePortOrFail } from "../net/findHalfEdgePortOrFail"
import { moveConnectedComponent } from "../net/moveConnectedComponent"
import { runNet } from "./runNet"

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
