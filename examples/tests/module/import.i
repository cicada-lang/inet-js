import { zero, one, add } from "../../datatypes/Nat.i"

eval @inspect(@run(@inspect(add(one(), zero()))))
