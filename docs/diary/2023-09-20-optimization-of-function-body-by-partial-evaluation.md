---
title: Optimization of function body by partial evaluation
author: Xie Yuheng
date: 2023-09-20
---

Optimization of the evaluation of function body and rule body,
can be done by partial evaluate the function during definition,
to get the graph it should build,
so that at run time, we only need to clone the graph.

To do this, we need a way to clone a graph with new id.
