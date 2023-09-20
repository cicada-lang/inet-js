import * as pt from "@cicada-lang/partech"
import { Exp } from "../../exp"

export function exp_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    //
  })(tree)
}
