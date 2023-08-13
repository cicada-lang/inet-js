import { Fetcher } from "../fetcher"
import { Mod } from "../lang/mod"
import { createMod } from "../lang/mod/createMod"
import { parseStmts } from "../lang/syntax"

export class Loader {
  private cache: Map<string, Mod> = new Map()
  loading: Set<string> = new Set()
  fetcher: Fetcher

  constructor(options: { fetcher: Fetcher }) {
    this.fetcher = options.fetcher
  }

  async load(url: URL): Promise<Mod> {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found

    const text = await this.fetcher.fetchText(url)
    const mod = createMod({
      loader: this,
      url,
      text,
    })

    this.loading.add(url.href)

    for (const stmt of parseStmts(text)) {
      await stmt.execute(mod)
    }

    this.loading.delete(url.href)

    this.cache.set(url.href, mod)

    return mod
  }
}
