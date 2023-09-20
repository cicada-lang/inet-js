import { BlockStmt } from "./BlockStmt"
import { formatExp } from "./formatExp"

export function formatBlockStmt(stmt: BlockStmt): string {
  switch (stmt["@kind"]) {
    case "Let": {
      return `let ${stmt.names.join(", ")} = ${formatExp(stmt.exp)}`
    }

    case "Evaluate": {
      return `eval ${formatExp(stmt.exp)}`
    }

    case "Return": {
      return `return ${formatExp(stmt.exp)}`
    }
  }
}
