---
title: maybe untyped first
date: 2024-10-17
---

也许应该先实现无类型的 inet，
这样可以用来自由地观察 inet 这个计算模型的行为，
因为开始的时候，我们还不是真的理解这个计算模型，
所以盲目地给它设计类型系统可能是错误的。

按照这个原则，开始的时候也不应该有 port 的 sign 的限制，
即不应该限制只有相反的 sign 的 port 才能相连。

可以回到 inet-cute 中做这个修改：

```inet
node zero value! end
node add1 prev value! end
node add target! addend result end

rule cons append
  (append)-rest (cons)-tail append
  (cons)-head cons
  result-(append)
end
```

# 关于 inet 的类型系统

当想要给 inet 加类型系统的时候，
我们想要加 dependent type system，
为了达成这个目标，其实我们不能从「加类型系统」这个角度去看，
而应该从其背后的逻辑系统入手
-- 即从 linear logic 中的谓词演算入手。

为什么在考虑「证明的逻辑」时，
会产生 linear logic 这种带有资源语义的系统？
证明中有什么是和资源相关的？
