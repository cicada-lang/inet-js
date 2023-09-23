# iNet (JavaScript)

[ [Website](https://inet.run) ]

This is an implementation of [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).
It introduces you to the bizarre world of graph-based computation and linear logic,
using a familiar JavaScript-like syntax :)

## Usage

### Command line tool

Install it by the following command:

```sh
npm install --global @cicada-lang/inet-js
```

The command line program is called `inet-js`.

```sh
inet-js repl         # Open an interactive REPL
inet-js run [path]   # Run an inet program
inet-js help [name]  # Display help for a command
```

## Examples

### Nat

[ [Goto The Playground](https://inet.run/playground/dHlwZSBOYXQKCm5vZGUgemVybygKICAtLS0tLS0KICB2YWx1ZSE6IE5hdAopCgpub2RlIGFkZDEoCiAgcHJldjogTmF0CiAgLS0tLS0tLS0tLQogIHZhbHVlITogTmF0CikKCm5vZGUgYWRkKAogIHRhcmdldCE6IE5hdCwKICBhZGRlbmQ6IE5hdAogIC0tLS0tLS0tCiAgcmVzdWx0OiBOYXQKKQoKcnVsZSBhZGQodGFyZ2V0ISwgYWRkZW5kLCByZXN1bHQpIHplcm8odmFsdWUhKSB7CiAgQGNvbm5lY3QoYWRkZW5kLCByZXN1bHQpCn0KCnJ1bGUgYWRkKHRhcmdldCEsIGFkZGVuZCwgcmVzdWx0KSBhZGQxKHByZXYsIHZhbHVlISkgewogIGFkZDEoYWRkKHByZXYsIGFkZGVuZCksIHJlc3VsdCkKfQoKZnVuY3Rpb24gb25lKCk6IE5hdCB7CiAgcmV0dXJuIGFkZDEoemVybygpKQp9CgpmdW5jdGlvbiB0d28oKTogTmF0IHsKICByZXR1cm4gYWRkKG9uZSgpLCBvbmUoKSkKfQoKZnVuY3Rpb24gdGhyZWUoKTogTmF0IHsKICByZXR1cm4gYWRkKHR3bygpLCBvbmUoKSkKfQoKZnVuY3Rpb24gZm91cigpOiBOYXQgewogIHJldHVybiBhZGQodHdvKCksIHR3bygpKQp9CgovLyBURVNUCgpldmFsIEBpbnNwZWN0KGFkZCh0d28oKSwgdHdvKCkpKQpldmFsIEBpbnNwZWN0KEBydW4oYWRkKHR3bygpLCB0d28oKSkpKQ) ]

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

eval @inspect(add(two(), two()))
eval @inspect(@run(add(two(), two())))
```

### List

[ [Goto The Playground](https://inet.run/playground/dHlwZSBMaXN0KEVsZW1lbnQ6IEBUeXBlKQoKbm9kZSBudWxsKAogIC0tLS0tLS0tCiAgdmFsdWUhOiBMaXN0KCdBKQopCgpub2RlIGNvbnMoCiAgaGVhZDogJ0EsCiAgdGFpbDogTGlzdCgnQSkKICAtLS0tLS0tLQogIHZhbHVlITogTGlzdCgnQSkKKQoKbm9kZSBhcHBlbmQoCiAgdGFyZ2V0ITogTGlzdCgnQSksCiAgcmVzdDogTGlzdCgnQSkKICAtLS0tLS0tLQogIHJlc3VsdDogTGlzdCgnQSkKKQoKcnVsZSBhcHBlbmQodGFyZ2V0ISwgcmVzdCwgcmVzdWx0KSBudWxsKHZhbHVlISkgewogIEBjb25uZWN0KHJlc3QsIHJlc3VsdCkKfQoKcnVsZSBhcHBlbmQodGFyZ2V0ISwgcmVzdCwgcmVzdWx0KSBjb25zKGhlYWQsIHRhaWwsIHZhbHVlISkgewogIGNvbnMoaGVhZCwgYXBwZW5kKHRhaWwsIHJlc3QpLCByZXN1bHQpCn0KCi8vIFRFU1QKCnR5cGUgVHJpdmlhbAoKbm9kZSBzb2xlKC0tIHZhbHVlITogVHJpdmlhbCkKCmZ1bmN0aW9uIHNpeFNvbGVzKCk6IExpc3QoVHJpdmlhbCkgewogIHJldHVybiBhcHBlbmQoCiAgICBjb25zKHNvbGUoKSwgY29ucyhzb2xlKCksIGNvbnMoc29sZSgpLCBudWxsKCkpKSksCiAgICBjb25zKHNvbGUoKSwgY29ucyhzb2xlKCksIGNvbnMoc29sZSgpLCBudWxsKCkpKSksCiAgKQp9CgpldmFsIEBpbnNwZWN0KHNpeFNvbGVzKCkpCmV2YWwgQGluc3BlY3QoQHJ1bihzaXhTb2xlcygpKSk) ]

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

eval @inspect(sixSoles())
eval @inspect(@run(sixSoles()))
```

### DiffList

[ [Goto The Playground](https://inet.run/playground/aW1wb3J0IHsgTGlzdCB9IGZyb20gImh0dHBzOi8vY29kZS1vZi1pbmV0LWpzLmZpZGIuYXBwL3N0ZC9kYXRhdHlwZS9MaXN0LmkiCgovLyBDb25jYXRlbmF0aW9uIG9mIGxpc3RzIGlzIHBlcmZvcm1lZCBpbiBsaW5lYXIgdGltZQovLyB3aXRoIHJlc3BlY3QgdG8gaXRzIGZpcnN0IGFyZ3VtZW50LgovLyBDb25zdGFudCB0aW1lIGNvbmNhdGVuYXRpb24gaXMgcG9zc2libGUKLy8gd2l0aCBkaWZmZXJlbmNlLWxpc3RzOiB0aGUgaWRlYSBjb25zaXN0cyBpbgovLyBwbHVnZ2luZyB0aGUgZnJvbnQgb2YgdGhlIHNlY29uZCBhcmd1bWVudAovLyBhdCB0aGUgYmFjayBvZiB0aGUgZmlyc3Qgb25lLgoKdHlwZSBEaWZmTGlzdChFbGVtZW50OiBAVHlwZSkKCm5vZGUgZGlmZigKICBmcm9udDogTGlzdCgnQSksCiAgLS0tLS0tLQogIGJhY2s6IExpc3QoJ0EpLAogIHZhbHVlITogRGlmZkxpc3QoJ0EpLAopCgpub2RlIGRpZmZBcHBlbmQoCiAgdGFyZ2V0ITogRGlmZkxpc3QoJ0EpLAogIHJlc3Q6IERpZmZMaXN0KCdBKQogIC0tLS0tLS0tCiAgcmVzdWx0OiBEaWZmTGlzdCgnQSkKKQoKbm9kZSBkaWZmT3BlbigKICB0YXJnZXQhOiBEaWZmTGlzdCgnQSksCiAgbmV3QmFjazogTGlzdCgnQSkKICAtLS0tLS0tLS0tCiAgb2xkQmFjazogTGlzdCgnQSkKKQoKcnVsZSBkaWZmQXBwZW5kKHRhcmdldCEsIHJlc3QsIHJlc3VsdCkKICAgICBkaWZmKGZyb250LCBiYWNrLCB2YWx1ZSEpIHsKICBsZXQgbmV3QmFjaywgdmFsdWUgPSBkaWZmKGZyb250KQogIEBjb25uZWN0KHZhbHVlLCByZXN1bHQpCiAgZGlmZk9wZW4ocmVzdCwgbmV3QmFjaywgYmFjaykKfQoKcnVsZSBkaWZmT3Blbih0YXJnZXQhLCBuZXdCYWNrLCBvbGRCYWNrKQogICAgIGRpZmYoZnJvbnQsIGJhY2ssIHZhbHVlISkgewogIEBjb25uZWN0KGJhY2ssIG5ld0JhY2spCiAgQGNvbm5lY3QoZnJvbnQsIG9sZEJhY2spCn0KCi8vIFRFU1QKCmltcG9ydCB7IGNvbnMgfSBmcm9tICJodHRwczovL2NvZGUtb2YtaW5ldC1qcy5maWRiLmFwcC9zdGQvZGF0YXR5cGUvTGlzdC5pIgoKdHlwZSBUcml2aWFsCgpub2RlIHNvbGUoLS0gdmFsdWUhOiBUcml2aWFsKQoKZnVuY3Rpb24gdHdvVHdvU29sZXMoKTogRGlmZkxpc3QoVHJpdmlhbCkgewogIGxldCBmcm9udCwgYmFjaywgdmFsdWUxID0gZGlmZigpCiAgQGNvbm5lY3QoZnJvbnQsIGNvbnMoc29sZSgpLCBjb25zKHNvbGUoKSwgYmFjaykpKQogIGxldCBmcm9udCwgYmFjaywgdmFsdWUyID0gZGlmZigpCiAgQGNvbm5lY3QoZnJvbnQsIGNvbnMoc29sZSgpLCBjb25zKHNvbGUoKSwgYmFjaykpKQogIHJldHVybiBkaWZmQXBwZW5kKHZhbHVlMSwgdmFsdWUyKQp9CgpldmFsIEBpbnNwZWN0KHR3b1R3b1NvbGVzKCkpCmV2YWwgQGluc3BlY3QoQHJ1bih0d29Ud29Tb2xlcygpKSk) ]

```inet
import { List } from "https://code-of-inet-js.fidb.app/std/datatype/List.i"

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

import { cons } from "https://code-of-inet-js.fidb.app/std/datatype/List.i"

type Trivial

node sole(-- value!: Trivial)

function twoTwoSoles(): DiffList(Trivial) {
  let front, back, value1 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  let front, back, value2 = diff()
  @connect(front, cons(sole(), cons(sole(), back)))
  return diffAppend(value1, value2)
}

eval @inspect(twoTwoSoles())
eval @inspect(@run(twoTwoSoles()))
```

## Development

```sh
npm install          # Install dependencies
npm run build        # Compile `src/` to `lib/`
npm run build:watch  # Watch the compilation
npm run test         # Run test
```

## References

**Papers**:

- [Interaction Nets, Yves Lafont, 1990 (the founding paper)](./docs/references/papers/1990-interaction-nets.pdf).
- [Interaction Combinators, Yves Lafont, 1997](./docs/references/papers/1997-interaction-combinators.pdf).

**Books**:

- [Models of Computation -- An Introduction to Computability Theory, Maribel Fernández, 2009](./docs/references/books/models-of-computation--maribel-fernández.pdf).
  - Chapter 7. Interaction-Based Models of Computation.

## Community

GitHub:

- Organization: [github.com/cicada-lang](https://github.com/cicada-lang)

Telegram:

- English chat group: [CicadaLanguage](https://t.me/CicadaLanguage)
- Chinese chat group: [CicadaLanguageCN](https://t.me/CicadaLanguageCN)

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
