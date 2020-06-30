import { StorageKey } from './constant'
import { uuid4 } from './helper'

const config = {
  url: '',
  appId: '',
  uid: '',
  aliYun: {
    endpoint: 'cn-hangzhou.log.aliyuncs.com',
    project: 'nan-web-tracking',
    logStore: 'test-store'
  }
}

export function mergeConfig (cfg) {
  cfg.uid = genUid()
  Object.assign(config, cfg)
  return config
}

function genUid () {
  let uid = localStorage.getItem(StorageKey.UidKey)
  if (uid) return uid

  uid = uuid4()
  localStorage.setItem(StorageKey.UidKey, uid)
  return uid
}
