type Trivial
node sole(-- value!: Trivial)

type Nat
node zero(-- value!: Nat)
node add1(prev: Nat -- value!: Nat)

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
  add1(sole()) // Apply node to value of wrong type.
  add1(add(prev, addend), result)
}
