# evaluate

[evaluate] `apply` -- `Node`
[evaluate] `apply` -- `Function`
[evaluate] `apply` -- `TypeCtor`
[evaluate] `apply` -- `BuiltinFunction`

- fix `BuiltinFunctionDefinition` -- use `apply` instead of `compose`

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

`Node` -- has `modId` instead of `url`
