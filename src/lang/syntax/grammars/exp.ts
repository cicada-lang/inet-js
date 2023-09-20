export const exp = {
  $grammar: {
    "exp:operator": [{ operator: "operator" }],
    "exp:operand": [{ operand: "operand" }],
  },
}

export const operator = {
  $grammar: {
    "operator:var": [{ name: "variable_name" }],
    "operator:builtin": ['"@"', { name: "variable_name" }],
  },
}

export const operand = {
  $grammar: {
    "operand:ap": [{ target: "operator" }, '"("', { args: "args" }, '")"'],
    "operand:ap_nullary": [{ target: "operator" }, '"("', '")"'],
    "operand:symbol": ['"\'"', { name: "variable_name" }],
    "operand:block": ['"{"', { body: "block_stmts" }, '"}"'],
  },
}
