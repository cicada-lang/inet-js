require "List.i"
require "Trivial.i"

declare sixSoles(): List(Trivial)
function sixSoles() {
  return append(
    cons(sole(), cons(sole(), cons(sole(), null()))),
    cons(sole(), cons(sole(), cons(sole(), null()))),
  )
}

@inspect(sixSoles())
@inspect(@run(sixSoles()))
