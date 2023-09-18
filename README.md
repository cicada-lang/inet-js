# iNet.js

[ [Website](https://inet.run) ]

This is an implementation of [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).
It introduces you to the bizarre world of graph-based computation and linear logic,
using a familiar JavaScript-like syntax :)

## Usage

### Command line tool

Install it by the following command:

```sh
npm install --global @cicada-lang/inet
```

The command line program is called `inet.js`.

```sh
inet.js repl         # Open an interactive REPL
inet.js run [path]   # Run an inet program
inet.js help [name]  # Display help for a command
```

## Examples

#### Nat

TODO

#### List

TODO

#### DiffList

TODO

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
