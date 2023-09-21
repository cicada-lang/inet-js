import { Value, formatValue } from "../value"
import { Env } from "./Env"

export function defineLocals(
  env: Env,
  names: Array<string>,
  values: Array<Value>,
): void {
  if (names.length !== values.length) {
    throw new Error(
      [
        `[defineLocals] I expect the number of names and values to be the same.`,
        ``,
        `  values length: ${values.length}`,
        `  names length: ${names.length}`,
        `  values: [${values
          .map((value) => formatValue(env, value))
          .join(", ")}]`,
        `  names: [${names.join(", ")}]`,
      ].join("\n"),
    )
  }

  for (const [index, name] of names.entries()) {
    const found = env.locals.get(name)
    if (found !== undefined) {
      throw new Error(
        [
          `[defineLocals] The local name is already defined.`,
          ``,
          `  found value: ${formatValue(env, found)}`,
          `  name: ${name}`,
          `  index: ${index}`,
        ].join("\n"),
      )
    }

    env.locals.set(name, values[index])
  }
}
