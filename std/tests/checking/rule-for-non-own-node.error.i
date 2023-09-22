import { Nat, zero, add1, add } from "../../datatype/Nat.i"

rule add(target!, addend, result) zero(value!) {
  @connect(addend, result)
}

rule add(target!, addend, result) add1(prev, value!) {
  add1(add(prev, addend), result)
}
