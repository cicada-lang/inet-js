# new-syntax

[new-syntax] use `Exp` instead of `Word` -- disable tests for now

[new-syntax] `evaluateBlockStmt/`

[new-syntax] `evaluate/` -- `Var`
[new-syntax] `evaluate/` -- `Ap`
[new-syntax] `evaluate/` -- `Symbol`
[new-syntax] `evaluate/` -- `Builtin`
[new-syntax] `evaluate/` -- `Block`

[new-syntax] `mod/`

[new-syntax] `definition/`

[new-syntax] `execute` -- `DefineNode`
[new-syntax] `execute` -- `DefineRule`
[new-syntax] `execute` -- `DefineType`
[new-syntax] `execute` -- `DefineFunction`
[new-syntax] `execute` -- `TopLevelEvaluate`
[new-syntax] `execute` -- `TopLevelLet`

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
