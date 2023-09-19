# new-syntax

[new-syntax] `Exp` -- `syntax-next/`
[new-syntax] `Stmt` -- `syntax-next/`

[new-syntax] `execute`

[new-syntax] test parse by `inet.js parse`

`formatExp`
`formatStmt` -- fix `execute` error report

[new-syntax] test parse by `inet.js format`

[new-syntax] `definition-next/`

[new-syntax] `stmts-next/` -- `DefineNode` -- `execute`
[new-syntax] `stmts-next/` -- `DefineRule` -- `execute`
[new-syntax] `stmts-next/` -- `DefineType` -- `execute`
[new-syntax] `stmts-next/` -- `DefineFunction` -- `execute`
[new-syntax] `stmts-next/` -- `TopLevelEvaluate` -- `execute`
[new-syntax] `stmts-next/` -- `TopLevelLet` -- `execute`
[new-syntax] `evaluate/`
[new-syntax] use `Exp` instead of `Word`

# test new syntax

[new-syntax] `builtin/`
[new-syntax] `checking/`
[new-syntax] `module/`
[new-syntax] `statement/`
[new-syntax] `value/`
[new-syntax] Bin.i

# half-edge

[half-edge] `@edge` as a builtin to create two `HalfEdge`s
[half-edge] refactor

# later

[bug] `connectPortWithHalfEdge` should call `checkPortSigns`

- `@connect` -- should not call `checkPortSigns`

[refactor] check during `connect*` instead of before `connect*`
