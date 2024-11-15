require "./Bin.i"

function bsix(): Bin {
  // = 0b110 = 4+2 = 6
  return b0(b1(b1(bend())))
}

function bseven(): Bin {
  // return b1(b1(b1(bend())))
  return ntob(add1(add1(add1(add1(add1(add1(add1(zero()))))))))
}

// = 7 + 6 = 13 -- 0b1101
eval @inspect(@run(badd(bseven(), bsix())))

// = 7 * 6 = 42 -- 0b101010
eval @inspect(@run(bmul(bseven(), bsix())))

// -> takes 61 steps; doing the same with Nat mul takes 125 steps
