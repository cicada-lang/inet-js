type Trivial

node sole(-- value!: Trivial)
node trivialDrop(value!: Trivial --)

rule trivialDrop(value!) sole(value!) {}

type Pair

node pair(
  left: 'L,
  right: 'R,
  ------
  handle: Trivial,
  value!: Pair,
)

node pairDup(
  target!: Pair,
  ----------
  first: Pair,
  second: Pair,
)

rule pairDup(target!, first, second) pair(left, right, handle, value!) {
  let leftFirst, leftSecond = pairDup(left)
  let rightFirst, rightSecond = pairDup(right)
  @connect(pair(leftFirst, rightFirst, trivialDrop()), first)
  @connect(pair(leftSecond, rightSecond, trivialDrop()), second)
  sole(handle)
}

function divergence(): Trivial {
  let left, right, handle, value = pair()
  let first, second = pairDup(value)
  @connect(first, left)
  @connect(second, right)
  return handle
}

eval @inspect(divergence())
