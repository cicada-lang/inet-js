import { type BlockStmt } from "./BlockStmt.js"
import { formatExp } from "./formatExp.js"

export function formatBlockStmt(stmt: BlockStmt): string {
  switch (stmt["@kind"]) {
    case "Let": {
      return `let ${stmt.names.join(", ")} = ${formatExp(stmt.exp)}`
    }

    case "Evaluate": {
      return `${formatExp(stmt.exp)}`
    }

    case "Return": {
      return `return ${formatExp(stmt.exp)}`
    }
  }
}
