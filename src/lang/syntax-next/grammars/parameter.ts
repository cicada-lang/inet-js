export const parameter = {
  $grammar: {
    "parameter:normal": [{ name: "variable_name" }, '":"', { t: "exp" }],
    "parameter:is_principal": [
      { name: "variable_name" },
      '"!"',
      '":"',
      { t: "exp" },
    ],
  },
}

export const parameters = {
  $grammar: {
    "parameters:parameters": [
      { entries: { $ap: ["zero_or_more", "parameter", '","'] } },
      { last_entry: "parameter" },
      { $ap: ["optional", '","'] },
    ],
  },
}

export const parameter_without_type = {
  $grammar: {
    "parameter_without_type:normal": [{ name: "variable_name" }],
    "parameter_without_type:is_principal": [{ name: "variable_name" }, '"!"'],
  },
}

export const parameters_without_type = {
  $grammar: {
    "parameters_without_type:parameters_without_type": [
      { entries: { $ap: ["zero_or_more", "parameter_without_type", '","'] } },
      { last_entry: "parameter_without_type" },
      { $ap: ["optional", '","'] },
    ],
  },
}
