require "Nat.i"
require "Nat.i"
require "Nat.i" // Multiple `require` is fine.

@inspect(add(zero(), zero()))
@inspect(@run(add(zero(), zero())))

@inspect(two())
@inspect(@run(two()))

@inspect(four())
@inspect(@run(four()))

@inspect(add(one(), zero()))
@inspect(@run(add(one(), zero())))

function addadd(x: Nat, y: Nat, z:Nat): Nat {
  return add(add(x, y), z)
}

@inspect(@run(addadd(one(), one(), one())))

@inspect(natErase(two()))
@inspect(@run(natErase(two())))

@inspect(natDup(two())))
@inspect(@run(natDup(two()))))

@inspect(mul(two(), two()))
@inspect(@run(mul(two(), two())))

@inspect(mul(three(), three()))
@inspect(@run(mul(three(), three())))

@inspect(@run(max(two(), zero())))
@inspect(@run(max(two(), zero())))
@inspect(@run(max(two(), one())))
@inspect(@run(max(two(), three())))
