import { type BlockStmt } from "./BlockStmt.ts"
import { formatExp } from "./formatExp.ts"

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
