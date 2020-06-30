import { uuid4 } from './helper'

export const config = {
  url: '',
  appId: '',
  uid: '',
  aliYun: {
    endpoint: 'cn-hangzhou.log.aliyuncs.com',
    project: 'nan-web-tracking',
    logStore: 'test-store'
  }
}

export function resolveConfig (cfg) {
  cfg.uid = genUid()

  // 合并
  Object.assign(config, cfg)
}

function genUid () {
  let uid = localStorage.getItem('ana-sdk-uid')
  if (uid) {
    return uid
  }

  uid = uuid4()
  localStorage.setItem('ana-sdk-uid', uid)
  return uid
}
