import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher"
import { Loader } from "../../loader"
import { formatNet } from "../net/formatNet"
import { presentNodeAsNet } from "./presentNodeAsNet"

test("presentNodeAsNet", async () => {
  const text = `

type Nat

node add(
  target!: Nat,
  addend: Nat
  --------
  result: Nat
)

`

  const fetcher = new Fetcher()
  const loader = new Loader({ fetcher })
  const url = new URL("test://presentNodeAsNet")
  const mod = await loader.load(url, { text })
  const net = presentNodeAsNet(mod, "add")

  expect(formatNet(net)).toMatchInlineSnapshot(`
    "(add₀)-target covering-(@inputPortCap₀)
    (add₀)-addend covering-(@inputPortCap₁)
    (add₀)-result covering-(@ouputPortCap₀)"
  `)
})
