type Nat 0 end
node zero value!: Nat end
node add1 prev: Nat -- value!: Nat end

rule zero add
  (add)-addend
  return-(add)
end

node add target!: Nat addend: Nat -- return: Nat end