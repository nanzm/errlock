import { mergeConfig } from './config'
import { warn, error, isObject, underline } from './helper'
import { catchBrowserError } from './browser/index'
import { parserResult } from './browser/uaParse'
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
  }

  enhanceError (data) {
    data.dataType = DataTag.ErrorData

    data.path = window.location.href

    console.warn(data)
    // setTimeout(() => {
    //   aliLogger(data)
    // }, 0)
  }

  transferDeviceData (data) {
    data.dataType = DataTag.DeviceInfo

    // 打平 并转换成 下换线
    const tmp = {}
    Object.keys(data).forEach((key) => {
      const item = data[key]

      if (isObject(item)) {
        Object.keys(item).forEach((k) => {
          tmp[`${key}_${underline(k)}`] = item[k]
        })
        return
      }
      tmp[key] = item
    })

    console.log(tmp)
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
