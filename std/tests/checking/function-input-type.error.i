type Nat
node zero(-- value!: Nat)
node add1(prev: Nat -- value!: Nat)

type Trivial
node sole(-- value!: Trivial)

function add2(n: Trivial): Nat {
  return add1(add1(n))
}
