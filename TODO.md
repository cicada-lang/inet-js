# evaluate

fix `defineBuiltins`

# test new syntax

[new-syntax] `builtin/`
[new-syntax] `checking/`
[new-syntax] `module/`
[new-syntax] `statement/`
[new-syntax] `value/`

[new-syntax] Bin.i

# apply

[apply] `applyFunction` -- handle extra one argument
[apply] `applyFunction` -- handle not enough arguments

# check

[check] `applyFunction` -- check all locals are used

[check] `apply` -- `TypeCtor` -- check `args` by `input` parameters

# present

restore `present/`

restore `npm run test:ts`

# half-edge

[half-edge] `@edge` as a builtin to create two `HalfEdge`s
[half-edge] refactor

# later

[bug] `connectPortWithHalfEdge` should call `checkPortSigns`

- `@connect` -- should not call `checkPortSigns`

[refactor] check during `connect*` instead of before `connect*`

`Node` -- has `modId` instead of `url`
