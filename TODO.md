# check

[check] `applyFunction` -- check all locals are used
[check] `interact` and `checkRule` -- check all locals are used -- after `exposeRuleTargets`
[check] `apply` -- `TypeCtor` -- check `args` by `input` parameters

[test] `checking/`

# apply

[apply] `applyFunction` -- handle extra one argument
[apply] `applyFunction` -- handle not enough arguments

# present

restore `present/`
restore `npm run test:ts`

# half-edge

[half-edge] `@edge` as a builtin to create two `HalfEdge`s

- std/tests/builtin/edge.i

[half-edge] refactor

# later

[bug] `connectPortWithHalfEdge` should call `checkPortSigns`

- `@connect` -- should not call `checkPortSigns`

[refactor] check during `connect*` instead of before `connect*`

`Node` -- has `modId` instead of `url`
