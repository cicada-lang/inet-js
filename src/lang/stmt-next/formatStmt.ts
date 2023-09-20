import { Stmt } from "./Stmt"

export function formatStmt(stmt: Stmt): string {
  switch (stmt["@kind"]) {
    case "DefineNode": {
      return ""
    }

    case "DefineType": {
      return ""
    }

    case "DefineRule": {
      return ""
    }

    case "DefineFunction": {
      return ""
    }

    case "TopLevelEvaluate": {
      return ""
    }

    case "TopLevelLet": {
      return ""
    }

    case "Require": {
      return ""
    }

    case "Import": {
      return ""
    }
  }
}
