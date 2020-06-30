import { config } from '../config'

function createHttpRequest () {
  if (window.ActiveXObject) {
    // eslint-disable-next-line no-undef
    return new ActiveXObject('Microsoft.XMLHTTP')
  }
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest()
  }
}

function AliLogTracker (host, project, logstore) {
  this.uri_ = `http://${project}.${host}/logstores/${logstore}/track?APIVersion=0.6.0`
  this.params_ = []
  this.httpRequest_ = createHttpRequest()
}

AliLogTracker.prototype = {
  push (key, value) {
    if (!key || !value) {
      return
    }
    this.params_.push(key)
    this.params_.push(value)
  },
  logger () {
    let url = this.uri_
    let k = 0
    while (this.params_.length > 0) {
      if (k % 2 === 0) {
        url += `&${encodeURIComponent(this.params_.shift())}`
      } else {
        url += `=${encodeURIComponent(this.params_.shift())}`
      }
      ++k
    }
    try {
      this.httpRequest_.open('GET', url, true)
      this.httpRequest_.send(null)
    } catch (ex) {
      if (window && window.console && typeof window.console.log === 'function') {
        console.log(`Failed to log to ali log service because of this exception:\n${ex}`)
        console.log('Failed log data:', url)
      }
    }
  }
}

const aliLog = new AliLogTracker(config.aliYun.endpoint, config.aliYun.project, config.aliYun.logStore)

export function aliLogger (data) {
  Object.keys(data).forEach((k) => {
    aliLog.push(k, data[k])
  })
  aliLog.logger()
}
