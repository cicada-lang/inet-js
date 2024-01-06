import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher/index.js"
import { Loader } from "../../loader/index.js"
import { formatNet } from "../net/formatNet.js"
import { presentRule } from "./presentRule.js"

test("presentRule", async () => {
  const text = `

type Nat
node zero(-- value!: Nat)
node add1(prev: Nat -- value!: Nat)

node add(target!: Nat, addend: Nat -- result: Nat)

rule add(target!, addend, result) zero(value!) {
  @connect(addend, result)
}

rule add(target!, addend, result) add1(prev, value!) {
  add1(add(prev, addend), result)
}

  `

  const fetcher = new Fetcher()
  const loader = new Loader({ fetcher })
  const url = new URL("test://presentRule")
  const mod = await loader.load(url, { text })
  const [initial, final] = presentRule(mod, "add1 add")

  expect(formatNet(initial)).toMatchInlineSnapshot(`
    "(add1₂)-prev covering-(@inputPortCap₃)
    (add1₂)-value!target-(add₃)
    (add₃)-addend covering-(@inputPortCap₄)
    (add₃)-result covering-(@ouputPortCap₂)"
  `)

  expect(formatNet(final)).toMatchInlineSnapshot(`
    "(@inputPortCap₃)-covering target-(add₄)
    (@inputPortCap₄)-covering addend-(add₄)
    (@ouputPortCap₂)-covering value-(add1₃)
    (add1₃)-prev result-(add₄)"
  `)
})
