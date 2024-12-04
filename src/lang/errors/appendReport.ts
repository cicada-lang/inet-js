import { Report, type ReportEntry } from "./Report.ts"
import { createReportEntry } from "./createReportEntry.ts"

export function appendReport(error: unknown, entry: ReportEntry): Report {
  // NOTE We put the most recent report entry at the end,
  // because the end is closer to user's terminal output.

  if (error instanceof Report) {
    error.entries.push(entry)
    return error
  }

  return new Report([createReportEntry(error), entry])
}
