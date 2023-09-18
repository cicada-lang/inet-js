type Nat: @Type

node zero {
  ------
  value!: Nat
}

node add1 {
  prev: Nat
  ----------
  value!: Nat
}

node add {
  target!: Nat,
  addend: Nat
  --------
  result: Nat
}

rule zero add {
  @connect(^add.addend, ^add.result)
}

rule add1 add {
  // @connect(
  //   add1(add(^add1.prev, ^add.addend)),
  //   ^add.result,
  // )

  add1(add(^add1.prev, ^add.addend), ^add.result)
}

declare one(): Nat
function one() {
  return add1(zero())
}

declare two(): Nat
function two() {
  return add(one(), one())
}

declare three(): Nat
function three() {
  return add(two(), one())
}

declare four(): Nat
function four() {
  return add(two(), two())
}

// To define `mul`, we first need `natErase` and `natDup`.

node natErase {
  target!: Nat
  --------
}

rule zero natErase {}

rule add1 natErase {
  natErase(^add1.prev)
}

node natDup {
  target!: Nat
  --------
  second: Nat,
  first: Nat
}

rule zero natDup {
  // @connect(zero(), ^natDup.first)
  // @connect(zero(), ^natDup.second)

  zero(^natDup.first)
  zero(^natDup.second)
}

rule add1 natDup {
  let first, second = natDup(^add1.prev)
  @connect(add1(first), ^natDup.first)
  @connect(add1(second), ^natDup.second)
}

node mul {
  target!: Nat,
  mulend: Nat
  --------
  result: Nat
}

rule zero mul {
  natErase(^mul.mulend)
  zero(^mul.result)
}

rule add1 mul {
  let first, second = natDup(^mul.mulend)
  add(second, mul(first, ^add1.prev), ^mul.result)
}

// To define `max`, we need `maxAux`.

node maxAux {
  first: Nat,
  second!: Nat
  --------
  result: Nat
}

node max {
  first!: Nat,
  second: Nat
  ----------
  result: Nat
}

rule zero max {
  @connect(^max.second, ^max.result)
}

rule add1 max {
  maxAux(^add1.prev, ^max.second, ^max.result)
}

rule zero maxAux {
  add1(^maxAux.first, ^maxAux.result)
}

rule add1 maxAux {
  add1(
    max(^maxAux.first, ^add1.prev),
    ^maxAux.result
  )
}
