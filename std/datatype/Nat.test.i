require "Nat.i"
require "Nat.i"
require "Nat.i" // Multiple `require` is fine.


@inspect(@run(@inspect(add(zero(), zero()))))
@inspect(@run(@inspect(two())))
@inspect(@run(@inspect(four())))
@inspect(@run(@inspect(add(one(), zero()))))

declare addadd(Nat, Nat, Nat): Nat
function addadd(x, y, z) {
  return add(add(x, y), z)
}

@inspect(@run(addadd(one(), one(), one())))

@inspect(@run(@inspect(natErase(two()))))
@inspect(@run(@inspect(natDup(two())))))

@inspect(@run(@inspect(mul(two(), two()))))
@inspect(@run(@inspect(mul(three(), three()))))

@inspect(@run(max(two(), zero())))
@inspect(@run(max(two(), zero())))
@inspect(@run(max(two(), one())))
@inspect(@run(max(two(), three())))
