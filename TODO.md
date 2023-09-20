# execute

[execute] `execute` -- `TopLevelEvaluate`
[execute] `execute` -- `TopLevelLet`
[execute] `execute` -- `Require`
[execute] `execute` -- `Import`

`Node` -- rename `url` to `modId`

`OperatorDefinition` rename `compose` to `apply`



# later

fix `createNodeFromDefinition`

# evaluate

[evaluate] `evaluate/` -- `Var`
[evaluate] `evaluate/` -- `Ap`
[evaluate] `evaluate/` -- `Symbol`
[evaluate] `evaluate/` -- `Builtin`
[evaluate] `evaluate/` -- `Block`

[evaluate] `evaluateBlockStmt/`

# check

restore `check/`

# present

restore `present/`

restore `npm run test:ts`

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
