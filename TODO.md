# new-syntax

[new-syntax] `stmts-next/` -- `DefineRule`
[new-syntax] `stmts-next/` -- `DefineType`
[new-syntax] `stmts-next/` -- `DefineFunction`
[new-syntax] `stmts-next/` -- `TopLevelEvaluate`
[new-syntax] `stmts-next/` -- `TopLevelLet`

[new-syntax] `Exp` -- `syntax-next/`

[new-syntax] `definition-next/`

[new-syntax] `stmts-next/` -- `DefineNode` -- `execute`
[new-syntax] `stmts-next/` -- `DefineRule` -- `execute`
[new-syntax] `stmts-next/` -- `DefineType` -- `execute`
[new-syntax] `stmts-next/` -- `DefineFunction` -- `execute`
[new-syntax] `stmts-next/` -- `TopLevelEvaluate` -- `execute`
[new-syntax] `stmts-next/` -- `TopLevelLet` -- `execute`

[new-syntax] `evaluate/`

[new-syntax] use `Exp` instead of `Word`

[new-syntax] Bin.i

[new-syntax] `builtin/`
[new-syntax] `checking/`
[new-syntax] `module/`
[new-syntax] `statement/`
[new-syntax] `value/`

# half-edge

[half-edge] `@edge` as a builtin to create two `HalfEdge`s

[half-edge] refactor

# later

[bug] `connectPortWithHalfEdge` should call `checkPortSigns`

- `@connect` -- should not call `checkPortSigns`

[refactor] check during `connect*` instead of before `connect*`
