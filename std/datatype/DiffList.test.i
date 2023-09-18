require "DiffList.i"
require "Trivial.i"

declare oneTwoSoles(): DiffList(Trivial)
function oneTwoSoles() {
  let front, back, value1 = diff()
  @connect(front, cons(sole(), back))
  let front, back, value2 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  return diffAppend(value1, value2)
}

@inspect(@run(@inspect(oneTwoSoles())))

declare twoTwoSoles(): DiffList(Trivial)
function twoTwoSoles {
  let front, back, value1 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  let front, back, value2 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  return diffAppend(value1, value2)
}

@inspect(@run(@inspect(twoTwoSoles())))
