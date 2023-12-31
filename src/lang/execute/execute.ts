import { checkFunction } from "../check/checkFunction.js"
import { checkNodeParameters } from "../check/checkNodeParameters.js"
import { checkRule } from "../check/checkRule.js"
import { checkTypeParameters } from "../check/checkTypeParameters.js"
import { defineLocals } from "../env/defineLocals.js"
import { appendReport } from "../errors/index.js"
import {
  evaluate,
  evaluateOne,
  evaluateParameters,
  type EvaluateOptions,
} from "../evaluate/index.js"
import { importAll } from "../import/importAll.js"
import { importMany } from "../import/importMany.js"
import { define, defineRule, type Mod } from "../mod/index.js"
import { type Stmt } from "../stmt/index.js"

export async function execute(mod: Mod, stmt: Stmt): Promise<null> {
  try {
    const options: EvaluateOptions = { checking: mod.checking }

    switch (stmt["@kind"]) {
      case "DefineNode": {
        const input = evaluateParameters(mod, mod.env, stmt.input, options)
        const output = evaluateParameters(mod, mod.env, stmt.output, options)
        checkNodeParameters(mod, input, output)
        define(mod, stmt.name, {
          "@type": "Definition",
          "@kind": "NodeDefinition",
          mod,
          name: stmt.name,
          input,
          output,
          span: stmt.span,
        })
        return null
      }

      case "DefineType": {
        const input = evaluateParameters(mod, mod.env, stmt.input, options)
        checkTypeParameters(mod, input)
        define(mod, stmt.name, {
          "@type": "Definition",
          "@kind": "TypeDefinition",
          mod,
          name: stmt.name,
          input,
          span: stmt.span,
        })
        return null
      }

      case "DefineFunction": {
        const input = evaluateParameters(mod, mod.env, stmt.input, options)
        const retType = evaluateOne(mod, mod.env, stmt.retType, options)
        checkFunction(mod, input, retType, stmt.body)
        define(mod, stmt.name, {
          "@type": "Definition",
          "@kind": "FunctionDefinition",
          mod,
          name: stmt.name,
          input,
          retType,
          body: stmt.body,
          span: stmt.span,
        })
        return null
      }

      case "DefineRule": {
        checkRule(mod, stmt.first, stmt.second, stmt.body)
        defineRule(mod, stmt.first, stmt.second, stmt.body)
        return null
      }

      case "TopLevelEvaluate": {
        const values = evaluate(mod, mod.env, stmt.exp, options)
        mod.env.stack.push(...values)
        return null
      }

      case "TopLevelLet": {
        const values = evaluate(mod, mod.env, stmt.exp, options)
        defineLocals(mod.env, stmt.names, values)
        return null
      }

      case "Require": {
        const url = new URL(stmt.path, mod.url)
        const fetcher = mod.loader.fetcher
        if (mod.loader.loading.has(url.href)) {
          throw new Error(
            [
              `[execute / Require] I can not do circular require.`,
              ``,
              `  loading module url: ${fetcher.formatURL(mod.url)}`,
              `  requiring module url: ${fetcher.formatURL(url)}`,
            ].join("\n"),
          )
        }

        if (mod.requiredMods.get(url.href)) return null

        const loadedMod = await mod.loader.load(url)
        importAll(mod, loadedMod)

        for (const [key, requiredMod] of loadedMod.requiredMods) {
          mod.requiredMods.set(key, requiredMod)
        }

        mod.requiredMods.set(url.href, loadedMod)
        return null
      }

      case "Import": {
        const url = new URL(stmt.path, mod.url)
        const fetcher = mod.loader.fetcher
        if (mod.loader.loading.has(url.href)) {
          throw new Error(
            [
              `[execute / Import] I can not do circular import.`,
              ``,
              `  loading module url: ${fetcher.formatURL(mod.url)}`,
              `  importing module url: ${fetcher.formatURL(url)}`,
            ].join("\n"),
          )
        }

        const loadedMod = await mod.loader.load(url)
        importMany(mod, loadedMod, stmt.bindings)
        return null
      }
    }
  } catch (error) {
    throw appendReport(error, {
      message: [`[execute] I fail to execute a statement.`].join("\n"),
      context: {
        span: stmt.span,
        text: mod.text,
      },
    })
  }
}
