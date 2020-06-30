import Browser from 'bowser'
import { config } from '../config'
import { transformDevice } from '../report/index'

export function reportUAInfo () {
  const browser = Browser.getParser(window.navigator.userAgent)
  const res = browser.getResult()
  const ua = browser.getUA()

  setTimeout(() => {
    transformDevice({
      uid: config.uid,
      b_ua: ua,
      b_result: JSON.stringify(res)
    })
  }, 300)
}

// 暴露 Browser sdk
export default Browser
