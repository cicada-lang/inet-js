import * as pt from "@cicada-lang/partech"
import { Span } from "../span"

export type ReportEntry = {
  message: string
  context?: {
    span: Span
    text: string
  }
}

export class Report extends Error {
  entries: Array<ReportEntry> = []

  format(): string {
    return this.entries.map(formatReportEntry).join("\n")
  }

  get message(): string {
    return this.format()
  }
}

function formatReportEntry(entry: ReportEntry): string {
  if (entry.context === undefined) {
    return entry.message
  } else {
    return [
      entry.message,
      "",
      pt.report(entry.context.span, entry.context.text),
      "",
    ].join("\n")
  }
}