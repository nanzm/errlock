import { getLineColNum, isFunction } from '../helper'
import { enhanceError } from '../report/index'
import { ErrorTag } from '../constant'

export function windowOnError () {
  const OriginWindowError = window.onerror
  window.onerror = function (msg, fileUrl, lineno,
    colno, error) {
    enhanceError({
      tag: ErrorTag.JsError,
      fileUrl,
      lineno,
      colno,
      msg,
      desc: error && error.stack || ''
    })

    if (OriginWindowError && isFunction(OriginWindowError)) {
      OriginWindowError && OriginWindowError.apply(window, arguments)
    }

    return true
  }
}

export function windowListenerError () {
  window.addEventListener('error', function (e) {
    e.preventDefault()

    if (e) {
      const target = e.target || e.srcElement
      const isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement
      if (!isElementTarget) return

      // js css 资源加载错误
      const url = target.src || target.href
      enhanceError({
        tag: ErrorTag.LoadResError,
        fileUrl: url,
        lineno: '',
        colno: '',
        error_msg: e.message,
        desc: ''
      })
    }
  }, true)
}

export function windowUnhandledRejectionError () {
  window.addEventListener('unhandledrejection', function (e) {
    e.preventDefault()
    if (e && e.reason && e.reason.stack) {
      const msg = e.reason.message
      const stack = e.reason.stack
      const { lineNo, colNo, fileUrl } = getLineColNum(stack)

      enhanceError({
        tag: ErrorTag.UnHandledRejectionError,
        fileUrl: fileUrl,
        lineno: lineNo,
        colno: colNo,
        msg: msg,
        desc: stack
      })
    }
  }, true)
}