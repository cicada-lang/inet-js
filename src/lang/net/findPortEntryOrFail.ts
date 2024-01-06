import { type Port } from "../port/index.js"
import { type Net, type PortEntry } from "./Net.js"
import { findPortEntry } from "./findPortEntry.js"

export function findPortEntryOrFail(net: Net, port: Port): PortEntry {
  const portEntry = findPortEntry(net, port)
  if (portEntry === undefined) {
    throw new Error(`[findPortEntryOrFail] Undefined port`)
  }

  return portEntry
}
