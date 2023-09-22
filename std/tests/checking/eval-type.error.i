type Trivial
node sole(-- value!: Trivial)

type Nat
node zero(-- value!: Nat)
node add1(prev: Nat -- value!: Nat)

eval add1(sole())
