[diary] 2023-09-20-concatenative-vs-applicative

[diary] 2023-09-20-optimization by partial evaluation

# new-syntax

[new-syntax] `std/` -- add `eval` to `TopLevelEvaluate`

[new-syntax] `grammers/` -- `parameter`
[new-syntax] `grammers/` -- `rule_target`

[new-syntax] `grammers/` -- `rule_target`
[new-syntax] `matchers/` -- `parameter`
[new-syntax] `matchers/` -- `stmt`

[new-syntax] test parse by `inet.js parse`

`formatExp`

`formatStmt` -- fix `execute` error report

[new-syntax] test parse by `inet.js format`

[new-syntax] `definition-next/`

[new-syntax] `execute` -- `DefineNode`
[new-syntax] `execute` -- `DefineRule`
[new-syntax] `execute` -- `DefineType`
[new-syntax] `execute` -- `DefineFunction`
[new-syntax] `execute` -- `TopLevelEvaluate`
[new-syntax] `execute` -- `TopLevelLet`

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
