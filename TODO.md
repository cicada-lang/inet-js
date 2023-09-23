[refactor] extract `checkHalfEdgeWithPort`

[refactor] check during `connect*` instead of before `connect*`

- `connectPortWithHalfEdge` should call `checkPortSigns`
  `@connect` -- should not call `checkPortSigns`
