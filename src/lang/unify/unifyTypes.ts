import { type Env } from "../env/index.ts"
import { appendReport } from "../errors/appendReport.ts"
import { createReport } from "../errors/createReport.ts"
import { formatValue } from "../value/formatValue.ts"
import { type Value } from "../value/index.ts"
import { deepWalkType } from "./deepWalkType.ts"
import { occurInType } from "./occurInType.ts"
import { walkType } from "./walkType.ts"

export function unifyTypes(
  env: Env,
  substitution: Map<string, Value>,
  left: Value,
  right: Value,
): void {
  try {
    left = walkType(substitution, left)
    right = walkType(substitution, right)

    if (
      left["@kind"] === "Symbol" &&
      right["@kind"] === "Symbol" &&
      left.name === right.name
    ) {
      return
    }

    if (left["@kind"] === "Symbol") {
      if (occurInType(substitution, left.name, right)) {
        throw new Error(
          [
            `[unifyTypes] I find the left type variable occurs in the right type.`,
            ``,
            `  left type variable: '${left.name}`,
            `  right type: ${formatValue(
              env,
              deepWalkType(substitution, right),
            )}`,
          ].join("\n"),
        )
      }

      substitution.set(left.name, right)
      return
    }

    if (right["@kind"] === "Symbol") {
      if (occurInType(substitution, right.name, left)) {
        throw new Error(
          [
            `[unifyTypes] I find the right type variable occurs in the left type.`,
            ``,
            `  right type variable: '${right.name}`,
            `  left type: ${formatValue(
              env,
              deepWalkType(substitution, left),
            )}`,
          ].join("\n"),
        )
      }

      substitution.set(right.name, left)
      return
    }

    if (
      left["@kind"] === "TypeTerm" &&
      right["@kind"] === "TypeTerm" &&
      left.name === right.name &&
      left.mod.url.href === right.mod.url.href
    ) {
      for (const [index, leftArg] of left.args.entries()) {
        const rightArg = right.args[index]
        unifyTypes(env, substitution, leftArg, rightArg)
      }

      return
    }
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[unifyTypes] I fail to unify types.`,
        ``,
        `  left: ${formatValue(env, deepWalkType(substitution, left))}`,
        `  right: ${formatValue(env, deepWalkType(substitution, right))}`,
      ].join("\n"),
    })
  }

  throw createReport({
    message: [
      `[unifyTypes] I fail to unify types.`,
      ``,
      `  left: ${formatValue(env, deepWalkType(substitution, left))}`,
      `  right: ${formatValue(env, deepWalkType(substitution, right))}`,
    ].join("\n"),
  })
}
