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

rule zero(value!) add(target!, addend, result) {
  @connect(addend, result)
}

// The correct definition is:

// rule add(target!, addend, result) zero(value!) {
//   @connect(addend, result)
// }
