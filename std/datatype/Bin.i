// Code taken from: https://gist.github.com/bojidar-bg/85026fa70e6ba7b1862bf8226ba9feca

type Bin

// bin-end
node bend(
  ------------
  value!: Bin
)

node b0(
  higherbits: Bin
  ------------
  value!: Bin
)

node b1(
  higherbits: Bin
  ------------
  value!: Bin
)

// Utilities

node binDup(
  target!: Bin
  ------------
  result1: Bin,
  result2: Bin
)

rule binDup(target!, result1, result2) b1(higherbits, value!) {
  let b, d = binDup(higherbits)
  @connect(b1(b), result1)
  @connect(b1(d), result2)
}

rule binDup(target!, result1, result2) b0(higherbits, value!) {
  let b, d = binDup(higherbits)
  @connect(b0(b), result1)
  @connect(b0(d), result2)
}

rule binDup(target!, result1, result2) bend(value!) {
  @connect(bend(), result1)
  @connect(bend(), result2)
}

node binErase(
  target!: Bin
  ------------
)

rule binErase(target!) b1(higherbits, value!) {
  binErase(higherbits)
}

rule binErase(target!) b0(higherbits, value!) {
  binErase(higherbits)
}

rule binErase(target!) bend(value!) {}

// b0q -- b0 when in the middle of a number,
// replaced by bend elsewhere
// -- used to avoid unnecessary leading zeroes.

node b0q(
  target!: Bin
  ------------
  result: Bin
)

rule b0q(target!, result) b0(higherbits, value!) {
  @connect(b0(b0(higherbits)), result)
}

rule b0q(target!, result) b1(higherbits, value!) {
  @connect(b0(b1(higherbits)), result)
}

rule b0q(target!, result) bend(value!) {
  @connect(bend(), result)
}

// Basic arithmetic - increment

node badd1(
  target!: Bin
  ------------
  result: Bin
)

rule badd1(target!, result) b1(higherbits, value!) {
  @connect(b0(badd1(higherbits)), result)
}

rule badd1(target!, result) b0(higherbits, value!) {
  @connect(b1(higherbits), result)
}

rule badd1(target!, result) bend(value!) {
  @connect(b1(bend()), result)
}

// Basic arithmetic - addition built on top of increment

node badd(
  left: Bin,
  right!: Bin
  ------------
  result: Bin
)

node baddAdvance(
  left!: Bin,
  right: Bin
  ------------
  result: Bin
)

rule badd(left, right!, result) b0(higherbits, value!) {
  @connect(baddAdvance(left, higherbits), result)
}

rule badd(left, right!, result) b1(higherbits, value!) {
  @connect(badd1(baddAdvance(left, higherbits)), result)
}

rule badd(left, right!, result) bend(value!) {
  @connect(baddAdvance(left, bend()), result)
}

rule baddAdvance(left!, right, result) b0(higherbits, value!) {
  @connect(b0(badd(higherbits, right)), result)
}

rule baddAdvance(left!, right, result) b1(higherbits, value!) {
  @connect(b1(badd(higherbits, right)), result)
}

rule baddAdvance(left!, right, result) bend(value!) {
  @connect(b0q(right), result)
}

// Basic arithmetic - multiplication built on top of addition

node bmul(
  left: Bin,
  right!: Bin
  ------------
  result: Bin
)

rule bmul(left, right!, result) b0(higherbits, value!) {
  @connect(b0(bmul(left, higherbits)), result)
}

rule bmul(left, right!, result) b1(higherbits, value!) {
  let b, d = binDup(left)
  @connect(badd(d, b0q(bmul(b, higherbits))), result)
}

rule bmul(left, right!, result) bend(value!) {
  @connect(bend(), result)
  binErase(left)
}

// Conversion to and from Nat

import {
  Nat, zero, add1,
  natErase, natDup
} from "./Nat.i"

node natDouble(
  target!: Nat
  ------------
  result: Nat
)

rule natDouble(target!, result) zero(value!) {
  @connect(zero(), result)
}

rule natDouble(target!, result) add1(prev, value1) {
  @connect(add1(add1(natDouble(prev))), result)
}

node ntob(
  target!: Nat
  ------------
  result: Bin
)

rule ntob(target!, result) add1(prev, value!) {
  @connect(badd1(ntob(prev)), result)
}

rule ntob(target!, result) zero(value!) {
  @connect(bend(), result)
}

node bton(
  target!: Bin
  ------------
  result: Nat
)

rule bton(target!, result) b0(higherbits, value) {
  @connect(natDouble(bton(higherbits)), result)
}

rule bton(target!, result) b1(higherbits, value) {
  @connect(add1(natDouble(bton(higherbits))), result)
}

rule bton(target!, result) bend(value!) {
  @connect(zero(), result)
}

// Ideas for future development:
// - Change bend to bend0/bpos and bend1/bneg to support two's complement signed integers
// - Add subtraction
// - Add division and modulo (could be same node doing both?)
