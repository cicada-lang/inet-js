export const stmt = {
  $grammar: {
    "stmt:node": [
      '"node"',
      { name: "variable_name" },
      '"("',
      { input: "parameters" },
      "dashline",
      { output: "parameters" },
      '")"',
    ],
    "stmt:type": [
      '"type"',
      { name: "variable_name" },
      '"("',
      { input: "parameters" },
      '")"',
    ],
    "stmt:rule": [
      '"rule"',
      { first: "rule_target" },
      { second: "rule_target" },
      '"{"',
      { body: "block_stmts" },
      '"}"',
    ],
    "stmt:function": [
      '"function"',
      { name: "variable_name" },
      '"("',
      { input: "parameters" },
      '")"',
      '":"',
      { retType: "exp" },
      '"{"',
      { body: "block_stmts" },
      '"}"',
    ],
    "stmt:evaluate": ['"eval"', { exp: "exp" }],
    "stmt:let": ['"let"', { names: "variable_names" }, '"="', { exp: "exp" }],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
