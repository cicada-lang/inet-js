type Nat

node zero(
  ------
  value!: Nat
)

node add1(
  prev: Nat
  ----------
  value!: Nat
)

node add(
  target!: Nat,
  addend: Nat
  --------
  result: Nat
)

rule add(target!, addend, result) zero(value!) {
  @connect(addend, result)
}

rule add(target!, addend, result) add1(prev, value!) {
  add1(add(prev, addend), result)
}

function one(): Nat {
  return add1(zero())
}

function two(): Nat {
  return add(one(), one())
}

function three(): Nat {
  return add(two(), one())
}

function four(): Nat {
  return add(two(), two())
}

// To define `mul`, we first need `natErase` and `natDup`.

node natErase(
  target!: Nat
  --------
)

rule natErase(target!) zero(value!) {}

rule natErase(target!) add1(prev, value!) {
  natErase(prev)
}

node natDup(
  target!: Nat
  --------
  second: Nat,
  first: Nat
)

rule natDup(target!, second, first) zero(value!) {
  @connect(zero(), first)
  @connect(zero(), second)
}

rule natDup(target!, second, first) add1(prev, value!) {
  let prevFirst, prevSecond = natDup(prev)
  @connect(add1(prevFirst), first)
  @connect(add1(prevSecond), second)
}

node mul(
  target!: Nat,
  mulend: Nat
  --------
  result: Nat
)

rule mul(target!, mulend, result) zero(value!) {
  natErase(mulend)
  zero(result)
}

rule mul(target!, mulend, result) add1(prev, value!) {
  let first, second = natDup(mulend)
  add(second, mul(first, prev), result)
}

// To define `max`, we need `maxAux`.

node maxAux(
  first: Nat,
  second!: Nat
  --------
  result: Nat
)

node max(
  first!: Nat,
  second: Nat
  ----------
  result: Nat
)

rule max(first!, second, result) zero(value!) {
  @connect(second, result)
}

rule max(first!, second, result) add1(prev, value!) {
  maxAux(prev, second, result)
}

rule maxAux(first, second!, result) zero(value!) {
  add1(first, result)
}

rule maxAux(first, second!, result) add1(prev, value!) {
  add1(max(first, prev), result)
}
