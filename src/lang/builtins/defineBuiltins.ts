import { type Mod } from "../mod/index.js"
import * as connect from "./connect.js"
import { defineBuiltinPrimitiveFunction } from "./defineBuiltinPrimitiveFunction.js"
import { defineBuiltinValue } from "./defineBuiltinValue.js"
import * as inspect from "./inspect.js"
import * as run from "./run.js"

export function defineBuiltins(mod: Mod): void {
  defineBuiltinPrimitiveFunction(mod, "connect", connect)
  defineBuiltinPrimitiveFunction(mod, "inspect", inspect)
  defineBuiltinPrimitiveFunction(mod, "run", run)

  defineBuiltinValue(mod, "Type", {
    "@type": "Value",
    "@kind": "Type",
  })
}
