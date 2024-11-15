type Nat
node zero(-- value!: Nat)
node add1(prev: Nat -- value!: Nat)

node add(target!: Nat, addend: Nat -- result: Nat)

rule add(target!, addend, result) zero(value!) {
  @connect(addend, result)
}

rule add(target!, addend, result) add1(prev, value!) {
  let x, y = add1()
  @connect(x, add(prev, addend))
  @connect(y, result)
}

eval @inspect(@run(@inspect(add(add1(zero()), add1(zero())))))
