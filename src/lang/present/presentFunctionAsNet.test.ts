import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher"
import { Loader } from "../../loader"
import { formatNet } from "../net/formatNet"
import { presentFunctionAsNet } from "./presentFunctionAsNet"

test("presentFunctionAsNet", async () => {
  const text = `

type Nat
node zero(-- value!: Nat)
node add1(prev: Nat -- value!: Nat)

node add(target!: Nat, addend: Nat -- result: Nat)

function one(): Nat {
  return add1(zero())
}

function two(): Nat {
  return add(one(), one())
}

function addadd(x: Nat, y: Nat, z: Nat): Nat {
  return add(add(x, y), z)
}

  `

  const fetcher = new Fetcher()
  const loader = new Loader({ fetcher })
  const url = new URL("test://presentFunctionAsNet")
  const mod = await loader.load(url, { text })

  expect(formatNet(presentFunctionAsNet(mod, "two"))).toMatchInlineSnapshot(`
    "(add₃)-target!value-(add1₃)
    (add₃)-addend value-(add1₄)
    (add1₃)-prev value-(zero₃)
    (add1₄)-prev value-(zero₄)"
  `)

  expect(formatNet(presentFunctionAsNet(mod, "addadd"))).toMatchInlineSnapshot(`
    "(@typeCap₃)-covering addend-(add₄)
    (@typeCap₄)-covering addend-(add₅)
    (@typeCap₅)-covering target-(add₅)
    (add₄)-target result-(add₅)"
  `)
})
