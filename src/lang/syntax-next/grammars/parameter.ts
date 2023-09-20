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
