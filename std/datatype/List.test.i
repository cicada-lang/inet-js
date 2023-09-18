require "List.i"
require "Trivial.i"

function sixSoles(): List(Trivial) {
  return append(
    cons(sole(), cons(sole(), cons(sole(), null()))),
    cons(sole(), cons(sole(), cons(sole(), null()))),
  )
}


@inspect(@run(@inspect(sixSoles())))
