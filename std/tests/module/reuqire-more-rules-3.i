import { zero, add1, add } from "./reuqire-more-rules-2.i"

eval @inspect(@run(add(zero(), zero())))
eval @inspect(@run(add(add1(zero()), add1(zero()))))
eval @inspect(@run(add(add1(add1(zero())), add1(add1(zero())))))
