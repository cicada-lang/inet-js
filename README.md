# iNet JS

[ [Website](https://inet.xieyuheng.com)
| [iNet Cute](https://github.com/cicada-lang/inet-cute) ]

This is an implementation of [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).
It introduces you to the bizarre world of graph-based computation and linear logic,
using a familiar JavaScript-like syntax :)

## Usage

### Command line tool

Install it by the following command:

```sh
npm install --global @cicada-lang/inet-js
```

The command-line program is called `inet-js`.

```sh
inet-js repl         # Open an interactive REPL
inet-js run [path]   # Run an inet program
inet-js help [name]  # Display help for a command
```

## Examples

### Nat

[ [Goto The Playground](https://inet.xieyuheng.com/playground/dHlwZSBOYXQKCm5vZGUgemVybygKICAtLS0tLS0KICB2YWx1ZSE6IE5hdAopCgpub2RlIGFkZDEoCiAgcHJldjogTmF0CiAgLS0tLS0tLS0tLQogIHZhbHVlITogTmF0CikKCm5vZGUgYWRkKAogIHRhcmdldCE6IE5hdCwKICBhZGRlbmQ6IE5hdAogIC0tLS0tLS0tCiAgcmVzdWx0OiBOYXQKKQoKcnVsZSBhZGQodGFyZ2V0ISwgYWRkZW5kLCByZXN1bHQpIHplcm8odmFsdWUhKSB7CiAgQGNvbm5lY3QoYWRkZW5kLCByZXN1bHQpCn0KCnJ1bGUgYWRkKHRhcmdldCEsIGFkZGVuZCwgcmVzdWx0KSBhZGQxKHByZXYsIHZhbHVlISkgewogIGFkZDEoYWRkKHByZXYsIGFkZGVuZCksIHJlc3VsdCkKfQoKZnVuY3Rpb24gb25lKCk6IE5hdCB7CiAgcmV0dXJuIGFkZDEoemVybygpKQp9CgpmdW5jdGlvbiB0d28oKTogTmF0IHsKICByZXR1cm4gYWRkKG9uZSgpLCBvbmUoKSkKfQoKZnVuY3Rpb24gdGhyZWUoKTogTmF0IHsKICByZXR1cm4gYWRkKHR3bygpLCBvbmUoKSkKfQoKZnVuY3Rpb24gZm91cigpOiBOYXQgewogIHJldHVybiBhZGQodHdvKCksIHR3bygpKQp9CgovLyBURVNUCgpldmFsIEBpbnNwZWN0KEBydW4oYWRkKHR3bygpLCB0d28oKSkpKQpldmFsIEBpbnNwZWN0KGFkZCh0d28oKSwgdHdvKCkpKQ) ]

```inet
type Nat

node zero(
  ------
  value!: Nat
)

node add1(
  prev: Nat
  ----------
  value!: Nat
)

node add(
  target!: Nat,
  addend: Nat
  --------
  result: Nat
)

rule add(target!, addend, result) zero(value!) {
  @connect(addend, result)
}

rule add(target!, addend, result) add1(prev, value!) {
  add1(add(prev, addend), result)
}

function one(): Nat {
  return add1(zero())
}

function two(): Nat {
  return add(one(), one())
}

function three(): Nat {
  return add(two(), one())
}

function four(): Nat {
  return add(two(), two())
}

// TEST

eval @inspect(@run(add(two(), two())))
eval @inspect(add(two(), two()))
```

### List

[ [Goto The Playground](https://inet.xieyuheng.com/playground/dHlwZSBMaXN0KEVsZW1lbnQ6IEBUeXBlKQoKbm9kZSBudWxsKAogIC0tLS0tLS0tCiAgdmFsdWUhOiBMaXN0KCdBKQopCgpub2RlIGNvbnMoCiAgaGVhZDogJ0EsCiAgdGFpbDogTGlzdCgnQSkKICAtLS0tLS0tLQogIHZhbHVlITogTGlzdCgnQSkKKQoKbm9kZSBhcHBlbmQoCiAgdGFyZ2V0ITogTGlzdCgnQSksCiAgcmVzdDogTGlzdCgnQSkKICAtLS0tLS0tLQogIHJlc3VsdDogTGlzdCgnQSkKKQoKcnVsZSBhcHBlbmQodGFyZ2V0ISwgcmVzdCwgcmVzdWx0KSBudWxsKHZhbHVlISkgewogIEBjb25uZWN0KHJlc3QsIHJlc3VsdCkKfQoKcnVsZSBhcHBlbmQodGFyZ2V0ISwgcmVzdCwgcmVzdWx0KSBjb25zKGhlYWQsIHRhaWwsIHZhbHVlISkgewogIGNvbnMoaGVhZCwgYXBwZW5kKHRhaWwsIHJlc3QpLCByZXN1bHQpCn0KCi8vIFRFU1QKCnR5cGUgVHJpdmlhbAoKbm9kZSBzb2xlKC0tIHZhbHVlITogVHJpdmlhbCkKCmZ1bmN0aW9uIHNpeFNvbGVzKCk6IExpc3QoVHJpdmlhbCkgewogIHJldHVybiBhcHBlbmQoCiAgICBjb25zKHNvbGUoKSwgY29ucyhzb2xlKCksIGNvbnMoc29sZSgpLCBudWxsKCkpKSksCiAgICBjb25zKHNvbGUoKSwgY29ucyhzb2xlKCksIGNvbnMoc29sZSgpLCBudWxsKCkpKSksCiAgKQp9CgpldmFsIEBpbnNwZWN0KEBydW4oc2l4U29sZXMoKSkpCmV2YWwgQGluc3BlY3Qoc2l4U29sZXMoKSk) ]

```inet
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
  target!: List('A),
  rest: List('A)
  --------
  result: List('A)
)

rule append(target!, rest, result) null(value!) {
  @connect(rest, result)
}

rule append(target!, rest, result) cons(head, tail, value!) {
  cons(head, append(tail, rest), result)
}

// TEST

type Trivial

node sole(-- value!: Trivial)

function sixSoles(): List(Trivial) {
  return append(
    cons(sole(), cons(sole(), cons(sole(), null()))),
    cons(sole(), cons(sole(), cons(sole(), null()))),
  )
}

eval @inspect(@run(sixSoles()))
eval @inspect(sixSoles())
```

### DiffList

[ [Goto The Playground](https://inet.xieyuheng.com/playground/aW1wb3J0IHsgTGlzdCB9IGZyb20gImh0dHBzOi8vY29kZS1vZi1pbmV0LWpzLnhpZXl1aGVuZy5jb20vZG9jcy9zdGQvZGF0YXR5cGUvTGlzdC5pIgoKLy8gQ29uY2F0ZW5hdGlvbiBvZiBsaXN0cyBpcyBwZXJmb3JtZWQgaW4gbGluZWFyIHRpbWUKLy8gd2l0aCByZXNwZWN0IHRvIGl0cyBmaXJzdCBhcmd1bWVudC4KLy8gQ29uc3RhbnQgdGltZSBjb25jYXRlbmF0aW9uIGlzIHBvc3NpYmxlCi8vIHdpdGggZGlmZmVyZW5jZS1saXN0czogdGhlIGlkZWEgY29uc2lzdHMgaW4KLy8gcGx1Z2dpbmcgdGhlIGZyb250IG9mIHRoZSBzZWNvbmQgYXJndW1lbnQKLy8gYXQgdGhlIGJhY2sgb2YgdGhlIGZpcnN0IG9uZS4KCnR5cGUgRGlmZkxpc3QoRWxlbWVudDogQFR5cGUpCgpub2RlIGRpZmYoCiAgZnJvbnQ6IExpc3QoJ0EpLAogIC0tLS0tLS0KICBiYWNrOiBMaXN0KCdBKSwKICB2YWx1ZSE6IERpZmZMaXN0KCdBKSwKKQoKbm9kZSBkaWZmQXBwZW5kKAogIHRhcmdldCE6IERpZmZMaXN0KCdBKSwKICByZXN0OiBEaWZmTGlzdCgnQSkKICAtLS0tLS0tLQogIHJlc3VsdDogRGlmZkxpc3QoJ0EpCikKCm5vZGUgZGlmZk9wZW4oCiAgdGFyZ2V0ITogRGlmZkxpc3QoJ0EpLAogIG5ld0JhY2s6IExpc3QoJ0EpCiAgLS0tLS0tLS0tLQogIG9sZEJhY2s6IExpc3QoJ0EpCikKCnJ1bGUgZGlmZkFwcGVuZCh0YXJnZXQhLCByZXN0LCByZXN1bHQpCiAgICAgZGlmZihmcm9udCwgYmFjaywgdmFsdWUhKSB7CiAgbGV0IG5ld0JhY2ssIHZhbHVlID0gZGlmZihmcm9udCkKICBAY29ubmVjdCh2YWx1ZSwgcmVzdWx0KQogIGRpZmZPcGVuKHJlc3QsIG5ld0JhY2ssIGJhY2spCn0KCnJ1bGUgZGlmZk9wZW4odGFyZ2V0ISwgbmV3QmFjaywgb2xkQmFjaykKICAgICBkaWZmKGZyb250LCBiYWNrLCB2YWx1ZSEpIHsKICBAY29ubmVjdChiYWNrLCBuZXdCYWNrKQogIEBjb25uZWN0KGZyb250LCBvbGRCYWNrKQp9CgovLyBURVNUCgppbXBvcnQgeyBjb25zIH0gZnJvbSAiaHR0cHM6Ly9jb2RlLW9mLWluZXQtanMueGlleXVoZW5nLmNvbS9kb2NzL3N0ZC9kYXRhdHlwZS9MaXN0LmkiCgp0eXBlIFRyaXZpYWwKCm5vZGUgc29sZSgtLSB2YWx1ZSE6IFRyaXZpYWwpCgpmdW5jdGlvbiB0d29Ud29Tb2xlcygpOiBEaWZmTGlzdChUcml2aWFsKSB7CiAgbGV0IGZyb250LCBiYWNrLCB2YWx1ZTEgPSBkaWZmKCkKICBAY29ubmVjdChmcm9udCwgY29ucyhzb2xlKCksIGNvbnMoc29sZSgpLCBiYWNrKSkpCiAgbGV0IGZyb250LCBiYWNrLCB2YWx1ZTIgPSBkaWZmKCkKICBAY29ubmVjdChmcm9udCwgY29ucyhzb2xlKCksIGNvbnMoc29sZSgpLCBiYWNrKSkpCiAgcmV0dXJuIGRpZmZBcHBlbmQodmFsdWUxLCB2YWx1ZTIpCn0KCmV2YWwgQGluc3BlY3QoQHJ1bih0d29Ud29Tb2xlcygpKSkKZXZhbCBAaW5zcGVjdCh0d29Ud29Tb2xlcygpKQ) ]

```inet
import { List } from "https://code-of-inet-js.xieyuheng.com/examples/datatype/List.i"

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

rule diffAppend(target!, rest, result)
     diff(front, back, value!) {
  let newBack, value = diff(front)
  @connect(value, result)
  diffOpen(rest, newBack, back)
}

rule diffOpen(target!, newBack, oldBack)
     diff(front, back, value!) {
  @connect(back, newBack)
  @connect(front, oldBack)
}

// TEST

import { cons } from "https://code-of-inet-js.xieyuheng.com/examples/datatype/List.i"

type Trivial

node sole(-- value!: Trivial)

function twoTwoSoles(): DiffList(Trivial) {
  let front, back, value1 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  let front, back, value2 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  return diffAppend(value1, value2)
}

eval @inspect(@run(twoTwoSoles()))
eval @inspect(twoTwoSoles())
```

## Development

```sh
npm install     # Install dependencies
npm run build   # Compile `src/` to `lib/`
npm run test    # Run test
```

## References

**Papers**:

- [Interaction Nets, Yves Lafont, 1990 (the founding paper)](./docs/references/1990-interaction-nets.pdf).
- [Interaction Combinators, Yves Lafont, 1997](./docs/references/1997-interaction-combinators.pdf).

**Books**:

- [Models of Computation -- An Introduction to Computability Theory, Maribel Fernández, 2009](./docs/references/2009-models-of-computation--maribel-fernández.pdf).
  - Chapter 7. Interaction-Based Models of Computation.

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
