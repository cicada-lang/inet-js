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
  @connect(sole(), result)

  // The correct definition is:
  // @connect(addend, result)
}
