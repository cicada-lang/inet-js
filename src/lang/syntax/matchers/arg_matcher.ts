import * as pt from "@cicada-lang/partech"
import { Exp } from "../../exp"
import * as matchers from "../matchers"

export function arg_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "arg:plain": ({ arg }) => matchers.exp_matcher(arg),
  })(tree)
}

export function args_matcher(tree: pt.Tree): Array<Exp> {
  return pt.matcher({
    "args:args": ({ entries, last_entry }) => [
      ...pt.matchers.zero_or_more_matcher(entries).map(arg_matcher),
      arg_matcher(last_entry),
    ],
  })(tree)
}
