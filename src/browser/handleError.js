import { getLineColNum, isFunction } from '../helper'
import { ErrorTag } from '../constant'

export function windowOnError () {
  const that = this
  const OriginWindowError = window.onerror
  window.onerror = function (msg, fileUrl, lineno,
    colno, error) {
    that._report({
      error_type: ErrorTag.JsError,
      error_msg: msg,
      error_stack: error && error.stack || '',
      error_extra: ``,
      fileUrl,
      lineno,
      colno
    })

    if (OriginWindowError && isFunction(OriginWindowError)) {
      OriginWindowError && OriginWindowError.apply(window, arguments)
    }

    return true
  }
}

export function windowListenerError () {
  const that = this
  window.addEventListener('error', function (e) {
    e.preventDefault()

    if (e) {
      const target = e.target || e.srcElement
      const isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement
      if (!isElementTarget) return

      // js css 资源加载错误
      const url = target.src || target.href
      const tagName = target.localName || target.tagName
      const outerHTML = target.outerHTML

      that._report({
        error_type: ErrorTag.LoadResError,
        error_msg: `load ${tagName.toLowerCase()} error`,
        error_stack: ``,
        error_extra: outerHTML,
        fileUrl: url,
        lineno: '',
        colno: ''
      })
    }
  }, true)
}

export function windowUnhandledRejectionError () {
  const that = this
  window.addEventListener('unhandledrejection', function (e) {
    e.preventDefault()
    if (e && e.reason && e.reason.stack) {
      const msg = e.reason.message
      const stack = e.reason.stack
      const { lineNo, colNo, fileUrl } = getLineColNum(stack)

      that._report({
        error_type: ErrorTag.UnHandledRejectionError,
        error_msg: msg,
        error_stack: stack,
        error_extra: ``,
        fileUrl: fileUrl,
        lineno: lineNo,
        colno: colNo
      })
    }
  }, true)
}
