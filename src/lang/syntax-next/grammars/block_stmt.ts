export const block_stmt = {
  $grammar: {
    "block_stmt:let": [],
    "block_stmt:evaluate": [],
    "block_stmt:return": [],
  },
}

export const block_stmts = {
  $grammar: {
    "block_stmts:block_stmts": [
      { entries: { $ap: ["zero_or_more", "block_stmt"] } },
    ],
  },
}
