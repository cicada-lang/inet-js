import { indent } from "../../utils/indent.js"
import { type Exp } from "./Exp.js"
import { formatBlockStmt } from "./formatBlockStmt.js"

export function formatExp(exp: Exp): string {
  switch (exp["@kind"]) {
    case "Var": {
      return exp.name
    }

    case "Builtin": {
      return `@${exp.name}`
    }

    case "Ap": {
      const target = formatExp(exp.target)
      const args = exp.args.map(formatExp)
      return `${target}(${args.join(", ")})`
    }

    case "QuoteSymbol": {
      return `'${exp.name}`
    }

    case "Block": {
      const body = exp.body.map(formatBlockStmt)
      if (body.length === 0) {
        return `{}`
      } else {
        return `{\n${indent(body.join("\n"))}\n}`
      }
    }
  }
}
