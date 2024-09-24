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

eval @inspect(zero)
eval @inspect(add1)

// New node new id:

eval @inspect(zero)
eval @inspect(add1)
