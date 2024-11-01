---
title: Programming with Interaction Nets
author: Xie Yuheng
year: 2023
---

# 1

At the end of 2021,
I occasionally read a 1990 paper "Interaction Nets",
by Yves Lafont.
The paper introduced a very interesting new computation model,
using graph consists of nodes and edges as data,
and viewing interaction between connected nodes as computation.

In this paper, I will follow Lafont's examples
to introduce the principal of interaction nets.
And I will also introduce a language I designed
to practice this computation model.

# 2

How to use graph to encode data?

Suppose we want to encode the simplest data -- natural number.
We can mimic the ancient knot counting, using node to do the counting.

```
0  (zero)--
1  (zero)--(add1)--
2  (zero)--(add1)--(add1)--
3  (zero)--(add1)--(add1)--(add1)--
```

The node representing 0 `(zero)` has one port,
the node representing +1 `(add1)` has two ports,
we can encode natural number
by connecting these nodes through the ports.

# 3

How to use graph to represent functions that operate on natural numbers?

Take addition as an example, we need to introduce a new node to represent addition,
and to define interaction rules between this node and other nodes.

We use a node with three ports to represent addition.

```
       |
     (add)
     /   \
```

The two ports below represent the input `target` number and the `addend`,
the port above represent the output `value`.

```
     value
       |
     (add)
     /   \
 target  addend
```

We can represent 0 + 1 as the following:

```
       |
     (add)
     /   \
(zero)   (add1)
           |
         (zero)
```

and 2 + 2 as the following:

```
       |
     (add)
     /   \
(add1)   (add1)
  |        |
(add1)   (add1)
  |        |
(zero)   (zero)
```

By defining the interaction rules between `(add)` and neighbor nodes,
we can do addition.

When the `target` port of `(add)`is connected with `(zero)`,
delete `(zero)` and `(add)`,
and connect the `value` of `(add)` with the `addend` of `(add)` directly.

```
     value           value
       |               |
     (add)     =>      |
     /   \              \
(zero)   addend        addend
```

When the `target` port of `(add)` is connected with `(add1)`,
move `(add1)` above `(add)`.

```
     value           value
       |               |
     (add)     =>    (add1)
     /   \             |
(add1)   addend      (add)
  |                  /   \
prev              prev   addend
```

By these two interaction rules, the graph representing 2 + 2
will become 4 through the following interaction:

```
       |                  |                 |            |
     (add)              (add1)            (add1)       (add1)
     /   \                |                 |            |
(add1)   (add1)         (add)             (add1)       (add1)
  |        |    =>      /   \      =>       |       =>   |
(add1)   (add1)    (add1)   (add1)        (add)        (add1)
  |        |         |        |           /   \          |
(zero)   (zero)    (zero)   (add1)   (zero)   (add1)   (add1)
                              |                 |        |
                            (zero)            (add1)   (zero)
                                                |
                                              (zero)
```

# 4

Let's design a programming language
to practice this computation model.

In our language each node has fixed number of ports.

```
(zero) // has one port
(add1) // has two ports
(add)  // has three ports
```

Every port has a name.

```
(zero)-value  // the value of 0

(add1)-prev   // previous number
(add1)-value  // the value of +1

(add)-target  // target number
(add)-addend  // the number to be added
(add)-result  // result of addition
```

There are two kinds of ports -- input ports and output ports.

```
-------------
(zero)-value   // output port

(add1)-prev    // input port
-------------
(add1)-value   // output port

(add)-target   // input port
(add)-addend   // input port
-------------
(add)-result   // output port
```

Two nodes can be connected through ports,
an input port must be connected to an output port.

Take the graph representing 2 as an example:

```
(zero)--(add1)--(add1)--
```

The detailed connections are the following:

```
(zero)-value prev-(add1)
(add1)-value prev-(add1)
(add1)-value // not yet connected free port
```

Each node has one and only one principal port,
two nodes can interact only when they are
connected through two principal ports.

```
-------------
(zero)-value!   // principal port

(add1)-prev
-------------
(add1)-value!   // principal port

(add)-target!   // principal port
(add)-addend
-------------
(add)-result
```

We also require each port to have a specific type,
and only ports with matching types can be connected.

We design the statement to define node as follows:

- The statement starts with `node`,
  follows the name of the node,
  then write the parameters of the node in parentheses.
- Use a dividing line to distinguish the input ports from the output ports.
  - Above the dividing line are the input ports.
  - Below the dividing line are the output ports.
  - The dividing can be as long as wish, at least two characters `--`.
- For principal port, add `!` as suffix.

Suppose the type representing natural number is `Nat`,
the aforementioned nodes are defined as follows:

```
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
```

# 5

We design the statement to define type as follows:

- The statement starts with `type`,
  follows the name of the type,
  then write the type parameters of the type constructor in parentheses.
- If the type does not take parameters, we do not need to write the parentheses.
- `Type` is a built-in value, we reference it by `@Type`.
  - All built-in definitions will use `@` as prefix.

Take the type representing natural number `Nat` as an example,
it has no input type arguments, thus it's definition is:

```
type Nat
```

Take `List` as another example,
it has one input type argument,
i.e. the element type,
thus it's definition is:

```
type List(Element: @Type)
```

# 6

Given two nodes, we can define an interaction rule for them.

Let's review the interaction rule between `(add1)` and `(add)`:

```
     result          value
       |               |
     (add)     =>    (add1)
     /   \             |
(add1)   addend      (add)
  |                  /   \
prev            target   addend
```

We can see that, the so called interaction can be viewed as:

- Remove the edge between the two principal ports.
- Remove the two nodes matched by the rule, at this point, the ports
  originally connected to these two nodes will be exposed.
- Reconnect the exposed ports, during which we can introduce new nodes.

We design the statement for defining rule as follows:

- The statement starts with `rule`,
  follows the pattern of two nodes,
  then write the body of the rule as a code block in curly braces.

The the rule between `(add)` and `(add1)` as an example:

```
rule add(target!, addend, result) add1(prev, value!) {
  add1(add(prev, addend), result)
}
```

To apply a node to arguments, is to connect it's ports with the arguments.

The rule between `(add)` and `(zero)` is a little special,
because during reconnecting the exposed ports,
it does not introduce any new nodes.

We can use the built-in function `@connect` to connect ports.

```
rule add(target!, addend, result) zero(value!) {
  @connect(addend, result)
}
```

# 7

Using the statements designed above,
we can write a complete code example.

In which we will use `define` to define new words,
and before using `define` to define a new word,
we must use `claim` to claim the type of the word.

We have an online playground, which can be used to easily share code.

[Goto the playground of `Nat` and `(add)`](https://inet.xieyuheng.com/playground/dHlwZSBOYXQKCm5vZGUgemVybygKICAtLS0tLS0KICB2YWx1ZSE6IE5hdAopCgpub2RlIGFkZDEoCiAgcHJldjogTmF0CiAgLS0tLS0tLS0tLQogIHZhbHVlITogTmF0CikKCm5vZGUgYWRkKAogIHRhcmdldCE6IE5hdCwKICBhZGRlbmQ6IE5hdAogIC0tLS0tLS0tCiAgcmVzdWx0OiBOYXQKKQoKcnVsZSBhZGQodGFyZ2V0ISwgYWRkZW5kLCByZXN1bHQpIHplcm8odmFsdWUhKSB7CiAgQGNvbm5lY3QoYWRkZW5kLCByZXN1bHQpCn0KCnJ1bGUgYWRkKHRhcmdldCEsIGFkZGVuZCwgcmVzdWx0KSBhZGQxKHByZXYsIHZhbHVlISkgewogIGFkZDEoYWRkKHByZXYsIGFkZGVuZCksIHJlc3VsdCkKfQoKZnVuY3Rpb24gb25lKCk6IE5hdCB7CiAgcmV0dXJuIGFkZDEoemVybygpKQp9CgpmdW5jdGlvbiB0d28oKTogTmF0IHsKICByZXR1cm4gYWRkKG9uZSgpLCBvbmUoKSkKfQoKZnVuY3Rpb24gYWRkMih4OiBOYXQpOiBOYXQgewogIHJldHVybiBhZGQodHdvKCksIHgpCn0KCmV2YWwgYWRkKGFkZDIob25lKCkpLCBhZGQyKG9uZSgpKSk)

```
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

function add2(x: Nat): Nat {
  return add(two(), x)
}

eval add(add2(one()), add2(one()))
```

# 8

We emphasize the constraints of interaction nets, as a computational
model some of the good properties of interaction nets are gained by
these constraints.

The first constraint is, given two nodes,
we can define at most one interaction rule.

That is to say, when we find two nodes are connected through two
principal ports, either we can not find a rule for these two nodes,
then the two nodes can not interact; or we can find one and only one
rule, the two nodes will interact according to this rule.

This constraint excluded the case of finding multiple rules,
and need to making choice between them.

The second constraint is, each node has one and only one principal port.

Suppose two nodes are connected through two principal ports.
We draw a circle to enclose these two nodes and the edge between the principal ports.
Because each node has one and only one principal port,
all edges can go across the circle are not edge connecting principal ports.
These kind of edges can not interact at all.

```
     \   |   /
  .-------------.
  |    \ | /    |
  |   (.....)   |
  |      |      |
  |   (.....)   |
  |    / | \    |
  `-------------`
     /   |   \
```

Although during an interaction between two nodes, new nodes and new
interactable edges might be introduced, all of the new interactable
edges can still be viewed as contained within the circle, during all
the new future interactions caused by them, removing and reconnecting
will not affect other parts of the graph outside the circle.

That is to say, in interaction nets,
all interactions are independent,
first do interaction here or there
will not affect the final result of the computation.

If the sequence of interactions at different place is ignored,
then in interaction nets, not only the result of the computation
is unique, the process of computation is also unique!

When implementing interaction nets,
if the computer as multiple cores,
we can start multiple threads,
sharing the same memory,
do the interactions at different place in parallel,
the threads will not interfere with each other.

# 9

Every node has one and only one principal port,
this constraint can bring good properties to our computation model,
but it also make programming inconvenient.

The max function of natural number is an example of such inconvenience.
Let's introduce a node `(max)` for this function.

```
     result
       |
     (max)
     /    \
first!   second
```

Node definition:

```
node max(
  first!: Nat,
  second: Nat
  ----------
  result: Nat
)
```

The interaction between `(max)` and `(zero)` is simple:

```
     result         result
       |              |
     (max)      =>    |
     /    \            \
(zero)   second       second
```

Rule definition:

```
rule max(first!, second, result) zero(value!) {
  @connect(second, result)
}
```

For the `(max)` and `(add1)`,
if there is no single-principal-port constraint,
we can imagine the following interaction:

```
     result           result
       |                |
     (max)      =>    (add1)
     /    \             |
(add1)    (add1)      (max)
   |        |         /   \
 prev      prev    prev   prev
```

But because of single-principal-port constraint,
we have to introduce an auxiliary node and some auxiliary rules,
to explicitly choose between two interactable edges.

We call the auxiliary node `(maxAux)`.

```
     result
       |
    (maxAux)
     /    \
first    second!
```

Node definition:

```
node maxAux(
  first: Nat,
  second!: Nat
  --------
  result: Nat
)
```

Using the auxiliary node to define
the rule between `(max)` and `(add1)`:

```
     result            result
       |                 |
     (max)      =>    (maxAux)
     /    \            /   \
(add1)   second     prev   second
   |
 prev
```

Rule definition:

```
rule max(first!, second, result) add1(prev, value!) {
  maxAux(prev, second, result)
}
```

The rule between `(maxAux)` and `(zero)`:

```
     result            result
       |                 |
    (maxAux)     =>    (add1)
     /    \              |
 first   (zero)        first
```

Rule definition:

```
rule maxAux(first, second!, result) zero(value!) {
  add1(first, result)
}
```

The rule between `(maxAux)` and `(add1)`:

```
     result            result
       |                 |
    (maxAux)     =>    (add1)
     /    \              |
 first   (add1)        (max)
           |           /   \
          prev     first   prev
```

Rule definition:

```
rule maxAux(first, second!, result) add1(prev, value!) {
  add1(max(first, prev), result)
}
```

[Goto the playground of `Nat` and `(max)`](https://inet.xieyuheng.com/playground/dHlwZSBOYXQKCm5vZGUgemVybygKICAtLS0tLS0KICB2YWx1ZSE6IE5hdAopCgpub2RlIGFkZDEoCiAgcHJldjogTmF0CiAgLS0tLS0tLS0tLQogIHZhbHVlITogTmF0CikKCm5vZGUgbWF4QXV4KAogIGZpcnN0OiBOYXQsCiAgc2Vjb25kITogTmF0CiAgLS0tLS0tLS0KICByZXN1bHQ6IE5hdAopCgpub2RlIG1heCgKICBmaXJzdCE6IE5hdCwKICBzZWNvbmQ6IE5hdAogIC0tLS0tLS0tLS0KICByZXN1bHQ6IE5hdAopCgpydWxlIG1heChmaXJzdCEsIHNlY29uZCwgcmVzdWx0KSB6ZXJvKHZhbHVlISkgewogIEBjb25uZWN0KHNlY29uZCwgcmVzdWx0KQp9CgpydWxlIG1heChmaXJzdCEsIHNlY29uZCwgcmVzdWx0KSBhZGQxKHByZXYsIHZhbHVlISkgewogIG1heEF1eChwcmV2LCBzZWNvbmQsIHJlc3VsdCkKfQoKcnVsZSBtYXhBdXgoZmlyc3QsIHNlY29uZCEsIHJlc3VsdCkgemVybyh2YWx1ZSEpIHsKICBhZGQxKGZpcnN0LCByZXN1bHQpCn0KCnJ1bGUgbWF4QXV4KGZpcnN0LCBzZWNvbmQhLCByZXN1bHQpIGFkZDEocHJldiwgdmFsdWUhKSB7CiAgYWRkMShtYXgoZmlyc3QsIHByZXYpLCByZXN1bHQpCn0KCmZ1bmN0aW9uIG9uZSgpOiBOYXQgewogIHJldHVybiBhZGQxKHplcm8oKSkKfQoKZnVuY3Rpb24gdHdvKCk6IE5hdCB7CiAgcmV0dXJuIGFkZDEob25lKCkpCn0KCmZ1bmN0aW9uIHRocmVlKCk6IE5hdCB7CiAgcmV0dXJuIGFkZDEodHdvKCkpCn0KCmV2YWwgbWF4KHR3bygpLCB6ZXJvKCkpCmV2YWwgbWF4KHR3bygpLCB0aHJlZSgpKQ)

```
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

node maxAux(
  first: Nat,
  second!: Nat
  --------
  result: Nat
)

node max(
  first!: Nat,
  second: Nat
  ----------
  result: Nat
)

rule max(first!, second, result) zero(value!) {
  @connect(second, result)
}

rule max(first!, second, result) add1(prev, value!) {
  maxAux(prev, second, result)
}

rule maxAux(first, second!, result) zero(value!) {
  add1(first, result)
}

rule maxAux(first, second!, result) add1(prev, value!) {
  add1(max(first, prev), result)
}

function one(): Nat {
  return add1(zero())
}

function two(): Nat {
  return add1(one())
}

function three(): Nat {
  return add1(two())
}

eval max(two(), zero())
eval max(two(), three())
```

# 10

We have already analyzed the node representing addition `(add)`,
now we analyze the node representing multiplication `(mul)`.

We will find that, to define the interaction rule between `(mul)` and
`(zero)` or `(mul)` and `(add1)`, we need to introduce auxiliary nodes
again:

- `(natErase)` to erase a natural number.
- `(natDup)` to duplicate a natural number.

These two nodes are different from all aforementioned nodes,
because all aforementioned nodes has one output port,
but:

- `(natErase)` has zero output ports.
- `(natDup)` has two output ports.

In the following examples, we will no longer using ASCII to draw graph,
to see the rendered graph, simply follow the link to the playground.

In the following code, we will use a syntax keyword `import`,
to import definitions from other module.

- One file corresponds to one module.
- Use `.i` as file extension.
- We can use full URL `https//...` to specify a file.
- We can also use relative path `./...` to specify a file.

[Goto the playground of `Nat` and `(mul)`](https://inet.xieyuheng.com/playground/aW1wb3J0IHsKICBOYXQsIHplcm8sIGFkZDEsIGFkZCwKICBvbmUsIHR3bywgdGhyZWUsCn0gZnJvbSAiaHR0cHM6Ly9jb2RlLW9mLWluZXQtanMuZmlkYi5hcHAvc3RkL2RhdGF0eXBlL05hdC5pIgoKbm9kZSBuYXRFcmFzZSgKICB0YXJnZXQhOiBOYXQKICAtLS0tLS0tLQopCgpydWxlIG5hdEVyYXNlKHRhcmdldCEpIHplcm8odmFsdWUhKSB7fQoKcnVsZSBuYXRFcmFzZSh0YXJnZXQhKSBhZGQxKHByZXYsIHZhbHVlISkgewogIG5hdEVyYXNlKHByZXYpCn0KCm5vZGUgbmF0RHVwKAogIHRhcmdldCE6IE5hdAogIC0tLS0tLS0tCiAgc2Vjb25kOiBOYXQsCiAgZmlyc3Q6IE5hdAopCgpydWxlIG5hdER1cCh0YXJnZXQhLCBzZWNvbmQsIGZpcnN0KSB6ZXJvKHZhbHVlISkgewogIEBjb25uZWN0KHplcm8oKSwgZmlyc3QpCiAgQGNvbm5lY3QoemVybygpLCBzZWNvbmQpCn0KCnJ1bGUgbmF0RHVwKHRhcmdldCEsIHNlY29uZCwgZmlyc3QpIGFkZDEocHJldiwgdmFsdWUhKSB7CiAgbGV0IHByZXZGaXJzdCwgcHJldlNlY29uZCA9IG5hdER1cChwcmV2KQogIEBjb25uZWN0KGFkZDEocHJldkZpcnN0KSwgZmlyc3QpCiAgQGNvbm5lY3QoYWRkMShwcmV2U2Vjb25kKSwgc2Vjb25kKQp9Cgpub2RlIG11bCgKICB0YXJnZXQhOiBOYXQsCiAgbXVsZW5kOiBOYXQKICAtLS0tLS0tLQogIHJlc3VsdDogTmF0CikKCnJ1bGUgbXVsKHRhcmdldCEsIG11bGVuZCwgcmVzdWx0KSB6ZXJvKHZhbHVlISkgewogIG5hdEVyYXNlKG11bGVuZCkKICB6ZXJvKHJlc3VsdCkKfQoKcnVsZSBtdWwodGFyZ2V0ISwgbXVsZW5kLCByZXN1bHQpIGFkZDEocHJldiwgdmFsdWUhKSB7CiAgbGV0IGZpcnN0LCBzZWNvbmQgPSBuYXREdXAobXVsZW5kKQogIGFkZChzZWNvbmQsIG11bChmaXJzdCwgcHJldiksIHJlc3VsdCkKfQoKZXZhbCBuYXREdXAodHdvKCkpCgpldmFsIG11bCh0d28oKSwgdHdvKCkpCmV2YWwgbXVsKHRocmVlKCksIHRocmVlKCkp)

```
import {
  Nat, zero, add1, add,
  one, two, three,
} from "https://code-of-inet-js.xieyuheng.com/std/datatype/Nat.i"

node natErase(
  target!: Nat
  --------
)

rule natErase(target!) zero(value!) {}

rule natErase(target!) add1(prev, value!) {
  natErase(prev)
}

node natDup(
  target!: Nat
  --------
  second: Nat,
  first: Nat
)

rule natDup(target!, second, first) zero(value!) {
  @connect(zero(), first)
  @connect(zero(), second)
}

rule natDup(target!, second, first) add1(prev, value!) {
  let prevFirst, prevSecond = natDup(prev)
  @connect(add1(prevFirst), first)
  @connect(add1(prevSecond), second)
}

node mul(
  target!: Nat,
  mulend: Nat
  --------
  result: Nat
)

rule mul(target!, mulend, result) zero(value!) {
  natErase(mulend)
  zero(result)
}

rule mul(target!, mulend, result) add1(prev, value!) {
  let first, second = natDup(mulend)
  add(second, mul(first, prev), result)
}

eval natDup(two())

eval mul(two(), two())
eval mul(three(), three())
```

# 11

After introduced the simplest data `Nat`,
we introduce the second simplest data -- `List`.

The goal is to implement `append` function.

If you see the rendered graph in the playground,
you will find the `(append)` of `List`
is very similar to the `(add)` of `Nat`.
The difference is that the `(add1)` of `Nat` only add one node,
while the `(cons)` of `List` add one node and link to an extra node.

In the following code, we will use a new word `'A`.

- `'A` is a symbol.
- `'A` can be used as type variable.
- Type variable can be used as type argument, for example `'A List`.

When defining `(cons)` and `(append)`,
the same symbol `'A` occured many times
to representing a type variable.
This means when connecting the corresponding ports,
this type variable must match the same type.

[Goto the playground of `List` and `(append)`](https://inet.xieyuheng.com/playground/dHlwZSBMaXN0KEVsZW1lbnQ6IEBUeXBlKQoKbm9kZSBudWxsKAogIC0tLS0tLS0tCiAgdmFsdWUhOiBMaXN0KCdBKQopCgpub2RlIGNvbnMoCiAgaGVhZDogJ0EsCiAgdGFpbDogTGlzdCgnQSkKICAtLS0tLS0tLQogIHZhbHVlITogTGlzdCgnQSkKKQoKbm9kZSBhcHBlbmQoCiAgdGFyZ2V0ITogTGlzdCgnQSksCiAgcmVzdDogTGlzdCgnQSkKICAtLS0tLS0tLQogIHJlc3VsdDogTGlzdCgnQSkKKQoKcnVsZSBhcHBlbmQodGFyZ2V0ISwgcmVzdCwgcmVzdWx0KSBudWxsKHZhbHVlISkgewogIEBjb25uZWN0KHJlc3QsIHJlc3VsdCkKfQoKcnVsZSBhcHBlbmQodGFyZ2V0ISwgcmVzdCwgcmVzdWx0KSBjb25zKGhlYWQsIHRhaWwsIHZhbHVlISkgewogIGNvbnMoaGVhZCwgYXBwZW5kKHRhaWwsIHJlc3QpLCByZXN1bHQpCn0KCmltcG9ydCB7IE5hdCwgemVybyB9IGZyb20gImh0dHBzOi8vY29kZS1vZi1pbmV0LWpzLmZpZGIuYXBwL3N0ZC9kYXRhdHlwZS9OYXQuaSIKCmZ1bmN0aW9uIHNpeFplcm9zKCk6IExpc3QoTmF0KSB7CiAgcmV0dXJuIGFwcGVuZCgKICAgIGNvbnMoemVybygpLCBjb25zKHplcm8oKSwgY29ucyh6ZXJvKCksIG51bGwoKSkpKSwKICAgIGNvbnMoemVybygpLCBjb25zKHplcm8oKSwgY29ucyh6ZXJvKCksIG51bGwoKSkpKSwKICApCn0KCmV2YWwgc2l4WmVyb3MoKQ)

```
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

import { Nat, zero } from "https://code-of-inet-js.xieyuheng.com/std/datatype/Nat.i"

function sixZeros(): List(Nat) {
  return append(
    cons(zero(), cons(zero(), cons(zero(), null()))),
    cons(zero(), cons(zero(), cons(zero(), null()))),
  )
}

eval sixZeros()
```

# 12

If we want to use `(append)` to append two `List`s,
we must traverse the `target` of `(append)`,
while building a new list step by step,
and appending it to the front of the `rest` of `(append)`.

Do it in this way, the steps required to append two lists
is proportional to the length of the first list.
Is there a way to directly connect the end of the first list
to the start of the second list?
Which only requires fixed number of steps to append two lists.

We can define a new type `DiffList`,
and a new node `(diff)`，
this node can be used to hold the front and the back of a list.
If we want to append two `DiffList`s,
we can simply connect the back held by the first `(diff)`,
to the front held by the second `(diff)`.

Note that, in common programming languages,
we often use tree like expressions as data,
from a parent node we can find the children nodes,
while the reverse is not true.
But in interaction nets,
the relationship between all nodes is symmetric.

[Goto the playground of `DiffList` and `(diffAppend)`](https://inet.xieyuheng.com/playground/aW1wb3J0IHsgTGlzdCB9IGZyb20gImh0dHBzOi8vY29kZS1vZi1pbmV0LWpzLmZpZGIuYXBwL3N0ZC9kYXRhdHlwZS9MaXN0LmkiCgp0eXBlIERpZmZMaXN0KEVsZW1lbnQ6IEBUeXBlKQoKbm9kZSBkaWZmKAogIGZyb250OiBMaXN0KCdBKSwKICAtLS0tLS0tCiAgYmFjazogTGlzdCgnQSksCiAgdmFsdWUhOiBEaWZmTGlzdCgnQSksCikKCm5vZGUgZGlmZkFwcGVuZCgKICB0YXJnZXQhOiBEaWZmTGlzdCgnQSksCiAgcmVzdDogRGlmZkxpc3QoJ0EpCiAgLS0tLS0tLS0KICByZXN1bHQ6IERpZmZMaXN0KCdBKQopCgpub2RlIGRpZmZPcGVuKAogIHRhcmdldCE6IERpZmZMaXN0KCdBKSwKICBuZXdCYWNrOiBMaXN0KCdBKQogIC0tLS0tLS0tLS0KICBvbGRCYWNrOiBMaXN0KCdBKQopCgpydWxlIGRpZmZBcHBlbmQodGFyZ2V0ISwgcmVzdCwgcmVzdWx0KQogICAgIGRpZmYoZnJvbnQsIGJhY2ssIHZhbHVlISkgewogIGxldCBuZXdCYWNrLCB2YWx1ZSA9IGRpZmYoZnJvbnQpCiAgQGNvbm5lY3QodmFsdWUsIHJlc3VsdCkKICBkaWZmT3BlbihyZXN0LCBuZXdCYWNrLCBiYWNrKQp9CgpydWxlIGRpZmZPcGVuKHRhcmdldCEsIG5ld0JhY2ssIG9sZEJhY2spCiAgICAgZGlmZihmcm9udCwgYmFjaywgdmFsdWUhKSB7CiAgQGNvbm5lY3QoYmFjaywgbmV3QmFjaykKICBAY29ubmVjdChmcm9udCwgb2xkQmFjaykKfQoKaW1wb3J0IHsgTmF0LCB6ZXJvIH0gZnJvbSAiaHR0cHM6Ly9jb2RlLW9mLWluZXQtanMuZmlkYi5hcHAvc3RkL2RhdGF0eXBlL05hdC5pIgppbXBvcnQgeyBjb25zIH0gZnJvbSAiaHR0cHM6Ly9jb2RlLW9mLWluZXQtanMuZmlkYi5hcHAvc3RkL2RhdGF0eXBlL0xpc3QuaSIKCmZ1bmN0aW9uIHR3b1R3b1plcm9zKCk6IERpZmZMaXN0KE5hdCkgewogIGxldCBmcm9udCwgYmFjaywgdmFsdWUxID0gZGlmZigpCiAgQGNvbm5lY3QoZnJvbnQsIGNvbnMoemVybygpLCBjb25zKHplcm8oKSwgYmFjaykpKQogIGxldCBmcm9udCwgYmFjaywgdmFsdWUyID0gZGlmZigpCiAgQGNvbm5lY3QoZnJvbnQsIGNvbnMoemVybygpLCBjb25zKHplcm8oKSwgYmFjaykpKQogIHJldHVybiBkaWZmQXBwZW5kKHZhbHVlMSwgdmFsdWUyKQp9CgpldmFsIHR3b1R3b1plcm9zKCk)

```
import { List } from "https://code-of-inet-js.xieyuheng.com/std/datatype/List.i"

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

import { Nat, zero } from "https://code-of-inet-js.xieyuheng.com/std/datatype/Nat.i"
import { cons } from "https://code-of-inet-js.xieyuheng.com/std/datatype/List.i"

function twoTwoZeros(): DiffList(Nat) {
  let front, back, value1 = diff()
  @connect(front, cons(zero(), cons(zero(), back)))
  let front, back, value2 = diff()
  @connect(front, cons(zero(), cons(zero(), back)))
  return diffAppend(value1, value2)
}

eval twoTwoZeros()
```

# 13

It is the end of this article now.

Let's look back, and look forward.

## Parallel Computing

Interaction nets as a computation model is interesting in deed,
in which every step of computation can be performed independently,
therefore it is very suitable for parallel computing.

## Syntax for Nonlinear Computational Models

Viewing application of node as connecting ports,
give us a simple applicative syntax for interaction nets.

In fect, for graph-based computation models like interaction nets,
the graph itself is the syntax.
But graph is nonlinear, how to use linear text to describe graph?
We solve this by using function applications to build graph.

In this way, the language we used to build graph,
becomes the lower layer language for the language of interaction nets.

This idea can not only be used to build graph,
and provide syntax for graph-based computation models,
it can also be used to build more complex nonlinear objects,
such as the generalization of graph theory in high dimensions
-- [Cell complex](https://zh.wikipedia.org/wiki/CW%E5%A4%8D%E5%BD%A2).
If we have a new computation model based on cell complex,
Then the idea of using function applications
to provide syntax for computation model is still applicable.

## Type System

Our language also has a type system,
the process of type checking, is just
the process of runing the lower layer language,
we only need to check weather the types of the two ports
match when connecting the nodes.

In the type system of our language,
the arguments of a type must be type,
but we can also imagine to let the arguments of a type be any value,
to get the so called [dependent type](https://en.wikipedia.org/wiki/Dependent_type).

In this case, it is more difficult for us to judge whether the two
types match, because it needs to judge whether two values ​​that may
contain arbitrary computations are equal.

In common computation models, like Lambda calculus,
it is difficult to implement such judgement,
but in interaction nets, it is relatively easy,
because it is sufficient to judge
whether two pointed graphs are isomorphic
after all the possible interactions in them are finished.

## To be a Practical Programming Language

In pure interaction nets, the only data are
graphs consist of nodes and edges,
to encode natural number we need to do something like knot counting,
in many use cases, this is obviously not practical.

But fortunately, our language already has two layers,
the upper layer is interaction nets,
the lower layer is general programming language for building nets.

We can make the whole language a practical programming language,
by extending this lower layer language.

How to design such language extension?

Please see the report of my next project :)
