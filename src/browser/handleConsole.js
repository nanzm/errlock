import { getLineColNum, getStackTrace, isError } from '../helper'
import { ErrorTag, C } from '../constant'

export function windowConsole () {
  const that = this
  if (!C || !C.error) return

  const originConsoleError = C.error
  C.error = function () {
    const args = [].slice.call(arguments)

    const stackTrace = getStackTrace()
    const { lineNo, colNo, fileUrl } = getLineColNum(stackTrace)

    const msg = args.map((item) => {
      if (isError(item)) {
        return item.stack
      }
      return JSON.stringify(item)
    })

    const fmtData = {
      error_type: ErrorTag.ConsoleError,
      error_msg: msg.join(','),
      error_stack: ``,
      error_extra: ``,
      fileUrl: fileUrl,
      lineno: lineNo,
      colno: colNo
    }
    that._report(fmtData)

    originConsoleError.apply(window, arguments)
  }
}
