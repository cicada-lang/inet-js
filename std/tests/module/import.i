import { zero, one, add } from "../../datatype/Nat.i"

eval @inspect(@run(@inspect(add(one(), zero()))))
