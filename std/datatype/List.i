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
  target!: List('A)
  rest: List('A)
  --------
  return: List('A)
}


rule null append {
  (append)-rest
  return-(append)
}



rule cons append
  (append)-rest (cons)-tail append
  (cons)-head cons
  return-(append)
end
