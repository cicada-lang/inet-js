import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher/index.ts"
import { Loader } from "../../loader/index.ts"
import { formatNet } from "../net/formatNet.ts"
import { presentNode } from "./presentNode.ts"

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
