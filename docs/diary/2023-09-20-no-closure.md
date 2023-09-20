---
title: No closure
author: Xie Yuheng
date: 2023-09-20
---

We have top level `function` keyword,
but we do not have closure.

Because it does not make sense for closure to capture linear local variables.

And the semantic of `function` is actually like `node`.

Imagining we have a keyword `net`.

The semantic of `addadd`

```
function addadd(x: Nat, y: Nat, z: Nat): Nat {
  return add(add(x, y), z)
}
```

is actually

```
net addadd(x: Nat, y: Nat, z: Nat -- result: Nat) {
  @connect(result, add(add(x, y), z))
}
```
