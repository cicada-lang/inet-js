import { Mod } from "../mod"
import { defineBuiltinValue } from "./defineBuiltinValue"
// import * as connect from "./connect"
// import { defineBuiltinPrimitiveFunction } from "./defineBuiltinPrimitiveFunction"
// import * as inspect from "./inspect"
// import * as run from "./run"

export function defineBuiltins(mod: Mod): void {
  // defineBuiltinPrimitiveFunction(mod, "connect", connect)
  // defineBuiltinPrimitiveFunction(mod, "inspect", inspect)
  // defineBuiltinPrimitiveFunction(mod, "run", run)

  defineBuiltinValue(mod, "Type", {
    "@type": "Value",
    "@kind": "Type",
  })
}
