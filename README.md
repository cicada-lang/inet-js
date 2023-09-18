# iNet.js

[ [Website](https://inet.run) ]

This is an implementation of [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).
It introduces you to the bizarre world of graph-based computation and linear logic,
using a familiar JavaScript-like syntax :)

## Usage

### Command line tool

Install it by the following command:

```sh
npm -g i @cicada-lang/inet
```

The command line program is called `inet.js`.

```sh
inet.js repl         # Open an interactive REPL
inet.js run [path]   # Run an inet program
inet.js help [name]  # Display help for a command
```

#### Nat

TODO add playground link

```inet
type Nat: @Type

node zero {
  ------
  value!: Nat
}

node add1 {
  prev: Nat
  ----------
  value!: Nat
}

node add {
  target!: Nat,
  addend: Nat
  --------
  return: Nat
}

rule zero add {
  @connect(^add.addend, ^add.return)
}

rule add1 add {
  add1(add(^add1.prev, ^add.addend), ^add.return)

  // The same as:
  // @connect(
  //   add1(add(^add1.prev, ^add.addend)),
  //   ^add.return,
  // )
}

declare one(): Nat
function one() {
  return add1(zero())
}

declare two(): Nat
function two() {
  return add(one(), one())
}

declare three(): Nat
function three() {
  return add(two(), one())
}

declare four(): Nat
function four() {
  return add(two(), two())
}

add(two(), two())
```

#### List

TODO add playground link

```inet
type List: @Type

node null {
  --------
  value!: List('A)
}

node cons {
  head: 'A,
  tail: List('A)
  --------
  value!: List('A)
}

node append {
  target!: List('A),
  rest: List('A)
  --------
  return: List('A)
}

rule null append {
  @connect(^append.rest, ^append.return)
}

rule cons append {
  cons(
    ^cons.head,
    append(^cons.tail, ^append.rest),
    ^append.return
  )
}

import { zero } from "https://code-of-inet.fidb.app/tests/datatype/Nat.i"

append(
  cons(zero(), cons(zero(), null())),
  cons(zero(), cons(zero(), null())),
)
```

#### DiffList

TODO add playground link

```inet
import { List } from "https://code-of-inet.fidb.app/tests/datatype/List.i"

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
  return: DiffList('A)
}

node diffOpen {
  target!: DiffList('A),
  list: List('A)
  ----------
  return: List('A)
}

rule diff diffAppend {
  let back = diff(^diff.front, value: ^diffAppend.return)

  // The same as:
  // let back, value = diff(^diff.front)
  // @connect(value, ^diffAppend.return)

  diffOpen(^diffAppend.rest, back, ^diff.back)
}

rule diff diffOpen {
  @connect(^diff.back, ^diffOpen.list)
  @connect(^diff.front, ^diffOpen.return)
}

import { zero } from "https://code-of-inet.fidb.app/tests/datatype/Nat.i"
import { cons } from "https://code-of-inet.fidb.app/tests/datatype/List.i"

let front, back, value1 = diff()
@connect(front, cons(zero(), cons(zero(), back)))
let front, back, value2 = diff()
@connect(front, cons(zero(), cons(zero(), back)))
diffAppend(value1, value2)
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
