require "List.i"

// Concatenation of lists is performed in linear time
// with respect to its first argument.
// Constant time concatenation is possible
// with difference-lists: the idea consists in
// plugging the front of the second argument
// at the back of the first one.

type DiffList(Element: @Type)

node diff(
  front: List('A),
  -------
  back: List('A),
  value!: DiffList('A),
)

node diffAppend(
  target!: DiffList('A),
  rest: DiffList('A)
  --------
  result: DiffList('A)
)

node diffOpen(
  target!: DiffList('A),
  newBack: List('A)
  ----------
  oldBack: List('A)
)

rule diffAppend(target!, rest, result) diff(front, back, value!) {
  let newBack, value = diff(front)
  @connect(value, result)
  diffOpen(rest, newBack, back)
}

rule diffOpen(target!, newBack, oldBack) diff(front, back, value!)  {
  @connect(back, newBack)
  @connect(front, oldBack)
}
