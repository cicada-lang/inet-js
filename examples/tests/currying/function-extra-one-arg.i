type Nat
node zero(-- value!: Nat)
node add1(prev: Nat -- value!: Nat)

node add(target!: Nat, addend: Nat -- result: Nat)

rule add(target!, addend, result) zero(value!) {
  @connect(addend, result)
}

rule add(target!, addend, result) add1(prev, value!) {
  add1(add(prev, addend), result)
}

function one(): Nat {
  return add1(zero())
}

function addadd(x: Nat, y: Nat, z: Nat): Nat {
  return add(add(x, y), z)
}

eval {
  let prev, result = add1()
  addadd(one(), one(), one(), prev)
  return @inspect(@run(result))
}
