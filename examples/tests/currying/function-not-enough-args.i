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
  let x, y, z, result = addadd()
  @connect(x, one())
  @connect(y, one())
  @connect(z, one())
  return @inspect(@run(result))
}

eval {
  let y, z, result = addadd(one())
  @connect(y, one())
  @connect(z, one())
  return @inspect(@run(result))
}

eval {
  let z, result = addadd(one(), one())
  @connect(z, one())
  return @inspect(@run(result))
}

eval {
  let result = addadd(one(), one(), one())
  return @inspect(@run(result))
}
