export const stmt = {
  $grammar: {
    "stmt:defcons": [
      '"defcons"',
      { name: "variable_name" },
      { inputArity: { $pattern: ["number"] } },
      { outputArity: { $pattern: ["number"] } },
      '"end"',
    ],
    "stmt:defelim": [
      '"defelim"',
      { name: "variable_name" },
      { inputArity: { $pattern: ["number"] } },
      { outputArity: { $pattern: ["number"] } },
      '"end"',
    ],
    "stmt:defru": [
      '"defru"',
      { start: "variable_name" },
      { end: "variable_name" },
      { words: "words" },
      '"end"',
    ],
    "stmt:defnet": [
      '"defnet"',
      { name: "variable_name" },
      { words: "words" },
      '"end"',
    ],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}