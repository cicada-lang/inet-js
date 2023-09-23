import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher"
import { Loader } from "../../loader"
import { formatNet } from "../net/formatNet"
import { presentRuleAsNets } from "./presentRuleAsNets"

test("presentRuleAsNets", async () => {
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
  const url = new URL("test://presentRuleAsNets")
  const mod = await loader.load(url, { text })
  const [initial, final] = presentRuleAsNets(mod, "add1 add")

  expect(formatNet(initial)).toMatchInlineSnapshot(`
    "(add1₂)-prev covering-(@inputPortCap₅)
    (add1₂)-value!target-(add₃)
    (add₃)-addend covering-(@inputPortCap₇)
    (add₃)-result covering-(@ouputPortCap₅)"
  `)

  expect(formatNet(final)).toMatchInlineSnapshot(`
    "(@inputPortCap₅)-covering target-(add₄)
    (@inputPortCap₇)-covering addend-(add₄)
    (@ouputPortCap₅)-covering value-(add1₃)
    (add1₃)-prev result-(add₄)"
  `)
})
