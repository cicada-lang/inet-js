require "List.i"

// Concatenation of lists is performed in linear time
// with respect to its first argument.
// Constant time concatenation is possible
// with difference-lists: the idea consists in
// plugging the front of the second argument
// at the back of the first one.

type DiffList(@Type): @Type

node diff {
  front: List('A),
  -------
  back: List('A),
  value!: DiffList('A),
}

node diffAppend {
  target!: DiffList('A),
  rest: DiffList('A)
  --------
  result: DiffList('A)
}

node diffOpen {
  target!: DiffList('A),
  list: List('A)
  ----------
  result: List('A)
}

rule diff diffAppend {
  let back = diff(^diff.front, value: ^diffAppend.result)

  // The same as:
  // let back, value = diff(^diff.front)
  // @connect(value, ^diffAppend.result)

  diffOpen(^diffAppend.rest, back, ^diff.back)
}

rule diff diffOpen {
  @connect(^diff.back, ^diffOpen.list)
  @connect(^diff.front, ^diffOpen.result)
}
