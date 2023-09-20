import * as pt from "@cicada-lang/partech"
import { RuleTarget } from "../../stmt-next"
import * as matchers from "../matchers"

export function rule_target_matcher(tree: pt.Tree): RuleTarget {
  return pt.matcher<RuleTarget>({
    "rule_target:rule_target": ({ name, parameters }, { span }) => ({
      name: pt.str(name),
      parameters: matchers.parameters_matcher(parameters),
    }),
  })(tree)
}
