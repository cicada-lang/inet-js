require "DiffList.i"
require "Trivial.i"

function oneTwoSoles(): DiffList(Trivial) {
  let front, back, value1 = diff()
  @connect(front, cons(sole(), back))
  let front, back, value2 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  return diffAppend(value1, value2)
}

eval @inspect(@run(@inspect(oneTwoSoles())))

function twoTwoSoles(): DiffList(Trivial) {
  let front, back, value1 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  let front, back, value2 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  return diffAppend(value1, value2)
}

eval @inspect(@run(@inspect(twoTwoSoles())))
