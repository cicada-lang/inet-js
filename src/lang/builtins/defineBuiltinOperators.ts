import { Mod } from "../mod"
import * as Type from "./Type"
import * as connect from "./connect"
import { defineBuiltinOperator } from "./defineBuiltinOperator"
import * as inspect from "./inspect"
import * as run from "./run"

export function defineBuiltinOperators(mod: Mod): void {
  defineBuiltinOperator(mod, "connect", connect)
  defineBuiltinOperator(mod, "inspect", inspect)
  defineBuiltinOperator(mod, "run", run)
  defineBuiltinOperator(mod, "Type", Type)
}
