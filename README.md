# iNet.js

[ [Website](https://inet.run) ]

Programming with [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).

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
@run(add(two(), two()))
```

#### List

TODO new syntax

TODO add playground link

```inet
type List @Type -- @Type end

node null
  --------
  'A List :value!
end

node cons
  'A :head
  'A List :tail
  --------
  'A List :value!
end

node append
  'A List :target!
  'A List :rest
  --------
  'A List :return
end

rule null append
  (append)-rest
  return-(append)
end

rule cons append
  (append)-rest (cons)-tail append
  (cons)-head cons
  return-(append)
end

import zero from "https://code-of-inet.fidb.app/tests/datatype/Nat.i"

null zero cons zero cons
null zero cons zero cons
append

null zero cons zero cons
null zero cons zero cons
append @run $result
```

#### DiffList

TODO new syntax

TODO add playground link

```inet
import List from "https://code-of-inet.fidb.app/tests/datatype/List.i"

// Concatenation of lists is performed in linear time
// with respect to its first argument.
// Constant time concatenation is possible
// with difference-lists: the idea consists in
// plugging the front of the second argument
// at the back of the first one.

type DiffList @Type -- @Type end

node diff
  'A List :front
  -------
  'A List :back
  'A DiffList :value!
end

node diffAppend
  'A DiffList :target!
  'A DiffList :rest
  --------
  'A DiffList :return
end

node diffOpen
  'A DiffList :target!
  'A List :list
  ----------
  'A List :return
end

rule diff diffAppend
  (diff)-front diff return-(diffAppend)
  (diffAppend)-rest diffOpen back-(diff)
end

rule diff diffOpen
  (diff)-back list-(diffOpen)
  (diff)-front return-(diffOpen)
end

import zero from "https://code-of-inet.fidb.app/tests/datatype/Nat.i"
import cons from "https://code-of-inet.fidb.app/tests/datatype/List.i"

(diff) @spread $front $back $value
back zero cons zero cons front @connect value
(diff) @spread $front $back $value
back zero cons zero cons front @connect value
diffAppend

// By using one less local variable `$value`,
// we can simplify the above code:

(diff) @spread $front $back
back zero cons zero cons front @connect
(diff) @spread $front $back
back zero cons zero cons front @connect
diffAppend

// By using one less local variable `$back`,
// we can further simplify the above code:

(diff) @spread $front zero cons zero cons front @connect
(diff) @spread $front zero cons zero cons front @connect
diffAppend

@run $result
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

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
