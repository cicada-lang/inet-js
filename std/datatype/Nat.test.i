require "Nat.i"
require "Nat.i"
require "Nat.i" // Multiple `require` is fine.

eval @inspect(@run(@inspect(add(zero(), zero()))))
eval @inspect(@run(@inspect(two())))
eval @inspect(@run(@inspect(four())))
eval @inspect(@run(@inspect(add(one(), zero()))))

eval @inspect(@run(@inspect(natErase(two()))))
eval @inspect(@run(@inspect(natDup(two()))))
eval @inspect(@run(@inspect(mul(two(), two()))))
eval @inspect(@run(@inspect(mul(three(), three()))))

eval @inspect(@run(max(two(), zero())))
eval @inspect(@run(max(two(), zero())))
eval @inspect(@run(max(two(), one())))
eval @inspect(@run(max(two(), three())))

function addadd(x: Nat, y: Nat, z: Nat): Nat {
  return add(add(x, y), z)
}

eval @inspect(@run(addadd(one(), one(), one())))
