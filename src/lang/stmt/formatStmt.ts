import { indent } from "../../utils/indent.js"
import { formatBlockStmt } from "../exp/formatBlockStmt.js"
import { formatExp } from "../exp/index.js"
import { formatImportBinding } from "../import/formatImportBinding.js"
import { formatParameterExp } from "../parameter/index.js"
import { formatRuleTarget } from "../rule/index.js"
import { type Stmt } from "./Stmt.js"

export function formatStmt(stmt: Stmt): string {
  switch (stmt["@kind"]) {
    case "DefineNode": {
      const input = stmt.input.map(formatParameterExp).join(", ")
      const output = stmt.output.map(formatParameterExp).join(", ")
      if (input && output) {
        return `node ${stmt.name}(${input} -- ${output})`
      } else if (input && !output) {
        return `node ${stmt.name}(${input} --)`
      } else if (!input && output) {
        return `node ${stmt.name}(-- ${output})`
      } else if (!input && !output) {
        return `node ${stmt.name}(--)`
      }
    }

    case "DefineType": {
      const input = stmt.input.map(formatParameterExp).join(", ")
      return `type ${stmt.name}(${input})`
    }

    case "DefineRule": {
      const first = formatRuleTarget(stmt.first)
      const second = formatRuleTarget(stmt.second)
      const body = stmt.body.map(formatBlockStmt).join("\n")
      if (body) {
        return `rule ${first} ${second} {\n${indent(body)}\n}`
      } else {
        return `rule ${first} ${second} {}`
      }
    }

    case "DefineFunction": {
      const input = stmt.input.map(formatParameterExp).join(", ")
      const retType = formatExp(stmt.retType)
      const body = stmt.body.map(formatBlockStmt).join("\n")
      if (body) {
        return `function ${stmt.name}(${input}): ${retType} {\n${indent(
          body,
        )}\n}`
      } else {
        return `function ${stmt.name}(${input}): ${retType} {}`
      }
    }

    case "TopLevelEvaluate": {
      const exp = formatExp(stmt.exp)
      return `eval ${exp}`
    }

    case "TopLevelLet": {
      const names = stmt.names.join(", ")
      const exp = formatExp(stmt.exp)
      return `let ${names} = ${exp}`
    }

    case "Require": {
      return `require "${stmt.path}"`
    }

    case "Import": {
      const bindings = stmt.bindings.map(formatImportBinding).join(", ")
      return `import { ${bindings} } "${stmt.path}"`
    }
  }
}
