import * as pt from "@cicada-lang/partech"
import { Exp } from "../../exp"
import * as matchers from "../matchers"

export function exp_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "exp:operator": ({ operator }) => operator_matcher(operator),
    "exp:operand": ({ operand }) => operand_matcher(operand),
  })(tree)
}

export function operator_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "operator:var": ({ name }, { span }) => ({
      "@type": "Exp",
      "@kind": "Var",
      name: pt.str(name),
      span,
    }),
    "operator:builtin": ({ name }, { span }) => ({
      "@type": "Exp",
      "@kind": "Builtin",
      name: pt.str(name),
      span,
    }),
  })(tree)
}

export function operand_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "operand:ap": ({ target, args }, { span }) => ({
      "@type": "Exp",
      "@kind": "Ap",
      target: operator_matcher(target),
      args: matchers.args_matcher(args),
      span,
    }),
    "operand:symbol": ({ name }, { span }) => ({
      "@type": "Exp",
      "@kind": "Symbol",
      name: pt.str(name),
      span,
    }),
    "operand:block": ({ body }, { span }) => ({
      "@type": "Exp",
      "@kind": "Block",
      body: matchers.block_stmts_matcher(body),
      span,
    }),
  })(tree)
}
