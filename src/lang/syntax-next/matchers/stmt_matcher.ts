import * as pt from "@cicada-lang/partech"
import type { Stmt } from "../../stmt-next"
import * as matchers from "../matchers"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:node": ({ name, input, output }, { span }) => ({
      "@type": "Stmt",
      "@kind": "DefineNode",
      name: pt.str(name),
      input: matchers.parameters_matcher(input),
      output: matchers.parameters_matcher(output),
      span,
    }),
    "stmt:type": ({ name, input }, { span }) => ({
      "@type": "Stmt",
      "@kind": "DefineType",
      name: pt.str(name),
      input: matchers.parameters_matcher(input),
      span,
    }),
    "stmt:rule": ({ first, second, body }, { span }) => ({
      "@type": "Stmt",
      "@kind": "DefineRule",
      first: matchers.rule_target_matcher(first),
      second: matchers.rule_target_matcher(second),
      body: matchers.block_stmts_matcher(body),
      span,
    }),
    "stmt:function": ({ name, input, retType, body }, { span }) => ({
      "@type": "Stmt",
      "@kind": "DefineFunction",
      name: pt.str(name),
      input: matchers.parameters_matcher(input),
      retType: matchers.exp_matcher(retType),
      body: matchers.block_stmts_matcher(body),
      span,
    }),
    "stmt:evaluate": ({ exp }, { span }) => ({
      "@type": "Stmt",
      "@kind": "TopLevelEvaluate",
      exp: matchers.exp_matcher(exp),
      span,
    }),
    "stmt:let": ({ names, exp }, { span }) => ({
      "@type": "Stmt",
      "@kind": "TopLevelLet",
      names: matchers.variable_names_matcher(names),
      exp: matchers.exp_matcher(exp),
      span,
    }),
  })(tree)
}

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}
