type Nat
node zero(-- value!: Nat)
node add1(prev: Nat -- value!: Nat)

function add2(n: Nat): Nat {
  return add1(add1(zero()))
}
