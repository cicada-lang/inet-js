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

rule null append {
  @connect(^append.rest, ^append.result)
}

rule cons append {
  cons(
    ^cons.head,
    append(^cons.tail, ^append.rest),
    ^append.result
  )
}
