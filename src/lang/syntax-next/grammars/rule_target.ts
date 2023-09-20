export const rule_target = {
  $grammar: {
    "rule_target:rule_target": [
      { name: "variable_name" },
      '"("',
      { parameters: "parameters_without_type" },
      '")"',
    ],
  },
}
