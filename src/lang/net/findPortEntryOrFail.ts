import { type Port } from "../port/index.ts"
import { type Net, type PortEntry } from "./Net.ts"
import { findPortEntry } from "./findPortEntry.ts"

export function findPortEntryOrFail(net: Net, port: Port): PortEntry {
  const portEntry = findPortEntry(net, port)
  if (portEntry === undefined) {
    throw new Error(`[findPortEntryOrFail] Undefined port`)
  }

  return portEntry
}
