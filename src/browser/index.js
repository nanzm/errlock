import { windowAjaxError } from './handleAjax'
import { windowConsole } from './handleConsole'
import { windowListenerError, windowOnError, windowUnhandledRejectionError } from './handleError'

// 主动捕获
export function sendError (err) {
  console.log(err)
}

export function catchBrowserError () {
  // console.error
  windowConsole.call(this)

  // 只能监听到js执行的错误，无法监听资源加载的错误
  windowOnError.call(this)

  // 可以监听到js执行的错误，和资源加载的错误
  windowListenerError.call(this)

  // promise
  windowUnhandledRejectionError.call(this)

  // 数据请求
  windowAjaxError.call(this)
}

export function attachUser (user) {
  console.warn('attachUser', user)
}
