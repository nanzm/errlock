import { sendError, attachUser, catchBrowserError } from './browser/index'
import { reportUAInfo } from './browser/uaParse'
import metric from './browser/metric'
import { warn, error } from './helper'
import { mergeConfig } from './config'

function init (opts) {
  if (!opts.appId) {
    warn('init function need appId!')
  }
  mergeConfig(opts)

  if (!window) {
    error('not in Browser')
    return
  }

  window.ANA_METRIC = metric
  setTimeout(() => {
    const metricData = metric.getMetricData()
    console.log(metricData)
  }, 3000)

  reportUAInfo()
  catchBrowserError()
}

export default {
  init,
  attachUser,
  error: sendError
}
