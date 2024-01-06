import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher/index.js"
import { Loader } from "../../loader/index.js"
import { formatEnv } from "../env/index.js"
import { presentFunction } from "./presentFunction.js"

test("presentFunction", async () => {
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
  const url = new URL("test://presentFunction")
  const mod = await loader.load(url, { text })

  expect(formatEnv(presentFunction(mod, "two"))).toMatchInlineSnapshot(`
    "env {
      net {
        (add₃)-target!value-(add1₃)
        (add₃)-addend value-(add1₄)
        (add1₃)-prev value-(zero₃)
        (add1₄)-prev value-(zero₄)
      }
      locals {}
      stack [#HalfEdge(#unconnected, result-(add₃))]
    }"
  `)

  expect(formatEnv(presentFunction(mod, "addadd"))).toMatchInlineSnapshot(`
    "env {
      net {
        (@typeCap₃)-covering addend-(add₄)
        (@typeCap₄)-covering addend-(add₅)
        (@typeCap₅)-covering target-(add₅)
        (add₄)-target result-(add₅)
      }
      locals {}
      stack [#HalfEdge(#unconnected, result-(add₄))]
    }"
  `)
})
