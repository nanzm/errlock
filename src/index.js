import { mergeConfig } from './config'
import { warn, error } from './helper'
import { catchBrowserError } from './browser/index'
import { getBrowserInfo, parserResult } from './browser/uaParse'
import metric from './browser/metric'
import { DataTag } from './constant'

class Ana {
  constructor (opts) {
    if (!window) {
      error('not in Browser')
      return
    }
    if (!opts.appId) {
      warn('init function need appId!')
    }

    this.config = mergeConfig(opts)
    this.metric = metric
    this.parserResult = parserResult

    this._installSdk()
  }

  _installSdk () {
    catchBrowserError.call(this)
  }

  _report (data) {
    console.log(data)

    const browserInfo = getBrowserInfo()
    const metricData = this.metric.getMetricData()
    console.log(browserInfo)
    console.log(metricData)
  }

  enhanceError (data) {
    data.dataType = DataTag.ErrorData

    data.path = window.location.href

    console.warn(data)
    // setTimeout(() => {
    //   aliLogger(data)
    // }, 0)
  }

  transferMetricData (data) {
    data.dataType = DataTag.PerformanceInfo

    console.warn(data)
    // setTimeout(() => {
    //   aliLogger(data)
    // }, 0)
  }

  transfer (data) {
    data.dataType = DataTag.PerformanceInfo

    console.warn(data)
    // setTimeout(() => {
    //   aliLogger(data)
    // }, 0)
  }
}

export default Ana
