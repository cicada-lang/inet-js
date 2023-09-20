import * as pt from "@cicada-lang/partech"
import { RuleTarget } from "../../stmt"
import * as matchers from "../matchers"

export function rule_target_matcher(tree: pt.Tree): RuleTarget {
  return pt.matcher<RuleTarget>({
    "rule_target:rule_target": ({ name, parameters }, { span }) => ({
      name: pt.str(name),
      parameters: matchers.parameters_without_type_matcher(parameters),
    }),
  })(tree)
}
