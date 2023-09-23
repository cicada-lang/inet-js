import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher"
import { Loader } from "../../loader"
import { formatNet } from "../net/formatNet"
import { presentNode } from "./presentNode"

test("presentNode", async () => {
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
  const url = new URL("test://presentNode")
  const mod = await loader.load(url, { text })
  const net = presentNode(mod, "add")

  expect(formatNet(net)).toMatchInlineSnapshot(`
    "(add₀)-target covering-(@inputPortCap₀)
    (add₀)-addend covering-(@inputPortCap₁)
    (add₀)-result covering-(@ouputPortCap₀)"
  `)
})
