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
    "stmt:node_no_input": [
      '"node"',
      { name: "variable_name" },
      '"("',
      "dashline",
      { output: "parameters" },
      '")"',
    ],
    "stmt:node_no_output": [
      '"node"',
      { name: "variable_name" },
      '"("',
      { input: "parameters" },
      "dashline",
      '")"',
    ],
    "stmt:type": [
      '"type"',
      { name: "variable_name" },
      '"("',
      { input: "parameters" },
      '")"',
    ],
    "stmt:type_no_input": ['"type"', { name: "variable_name" }],
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
    "stmt:function_no_input": [
      '"function"',
      { name: "variable_name" },
      '"("',
      '")"',
      '":"',
      { retType: "exp" },
      '"{"',
      { body: "block_stmts" },
      '"}"',
    ],
    "stmt:evaluate": ['"eval"', { exp: "exp" }],
    "stmt:let": ['"let"', { names: "variable_names" }, '"="', { exp: "exp" }],
    "stmt:require": ['"require"', { path: { $pattern: ["string"] } }],
    "stmt:import": [
      '"import"',
      '"{"',
      { bindings: "import_bindings" },
      '"}"',
      '"from"',
      { path: { $pattern: ["string"] } },
    ],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
