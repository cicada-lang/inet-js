import { checkNodeParameters } from "../check/checkNodeParameters"
import { checkTypeParameters } from "../check/checkTypeParameters"
import { defineLocals } from "../env/defineLocals"
import { appendReport } from "../errors"
import {
  EvaluateOptions,
  evaluate,
  evaluateOne,
  evaluateParameters,
} from "../evaluate"
import { importAll } from "../import/importAll"
import { importMany } from "../import/importMany"
import { Mod, define, defineRule } from "../mod"
import { Stmt } from "../stmt"

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
        define(mod, stmt.name, {
          "@type": "Definition",
          "@kind": "FunctionDefinition",
          mod,
          name: stmt.name,
          input: evaluateParameters(mod, mod.env, stmt.input, options),
          retType: evaluateOne(mod, mod.env, stmt.retType, options),
          body: stmt.body,
          span: stmt.span,
        })
        return null
      }

      case "DefineRule": {
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
