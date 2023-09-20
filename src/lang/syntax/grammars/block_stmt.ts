import { variable_names } from "./name"

export const block_stmt = {
  $grammar: {
    "block_stmt:let": [
      '"let"',
      { names: variable_names },
      '"="',
      { exp: "exp" },
    ],
    "block_stmt:evaluate": [{ exp: "exp" }],
    "block_stmt:return": ['"return"', { exp: "exp" }],
  },
}

export const block_stmts = {
  $grammar: {
    "block_stmts:block_stmts": [
      { entries: { $ap: ["zero_or_more", "block_stmt"] } },
    ],
  },
}
