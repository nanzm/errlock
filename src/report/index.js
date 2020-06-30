import { config } from '../config'
// import { aliLogger } from './logger'
import { DataTag } from '../constant'
import { isObject, underline } from '../helper'

export function enhanceError (data) {
  data.dataType = DataTag.ErrorData

  data.path = window.location.href
  data.appid = config.appId
  data.uid = config.uid

  console.warn(data)
  // setTimeout(() => {
  //   aliLogger(data)
  // }, 0)
}

export function transferDeviceData (data) {
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

export function transferMetricData (data) {
  data.dataType = DataTag.PerformanceInfo

  console.warn(data)
  // setTimeout(() => {
  //   aliLogger(data)
  // }, 0)
}

export function transfer (data) {
  data.dataType = DataTag.PerformanceInfo

  console.warn(data)
  // setTimeout(() => {
  //   aliLogger(data)
  // }, 0)
}

