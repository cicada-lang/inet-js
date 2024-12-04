import { type Mod } from "../mod/index.ts"
import * as connect from "./connect.ts"
import { defineBuiltinPrimitiveFunction } from "./defineBuiltinPrimitiveFunction.ts"
import { defineBuiltinValue } from "./defineBuiltinValue.ts"
import * as inspect from "./inspect.ts"
import * as run from "./run.ts"

export function defineBuiltins(mod: Mod): void {
  defineBuiltinPrimitiveFunction(mod, "connect", connect)
  defineBuiltinPrimitiveFunction(mod, "inspect", inspect)
  defineBuiltinPrimitiveFunction(mod, "run", run)

  defineBuiltinValue(mod, "Type", {
    "@type": "Value",
    "@kind": "Type",
  })
}
