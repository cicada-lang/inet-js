type List(Element: @Type)

node null(
  --------
  value!: List('A)
)

node cons(
  head: 'A,
  tail: List('A)
  --------
  value!: List('A)
)

node append(
  target!: List('A)
  rest: List('A)
  --------
  result: List('A)
)

rule append(target!, rest, result) null(value!)  {
  @connect(rest, result)
}

rule append(target!, rest, result) cons(head, tail, value!) {
  cons(head, append(tail, rest), result)
}
