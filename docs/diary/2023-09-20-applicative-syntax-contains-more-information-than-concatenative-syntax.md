---
title: Applicative syntax contains more information than concatenative syntax
author: Xie Yuheng
date: 2023-09-20
---

Due to the use of explicit barcket,
applicative syntax contains more information than concatenative syntax.

Thus we can use auto curry.

It also does not make sense to compile to concatenative syntax,
because compilation is a kind of elaboration,
and elaboration should increase information.
