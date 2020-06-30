import { config } from '../config'
import { aliLogger } from './logger'

export function transformError (data) {
  data.path = window.location.href
  data.appid = config.appId
  data.uid = config.uid

  setTimeout(() => {
    aliLogger(data)
  }, 0)
}

export function transformDevice (data) {
  setTimeout(() => {
    aliLogger(data)
  }, 0)
}

