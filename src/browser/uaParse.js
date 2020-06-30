import Browser from 'bowser'
import { config } from '../config'
import { aliLogger } from './report'

export function reportUAInfo () {
  const browser = Browser.getParser(window.navigator.userAgent)
  const res = browser.getResult()
  const ua = browser.getUA()

  setTimeout(() => {
    aliLogger({
      uid: config.uid,
      b_ua: ua,
      b_result: JSON.stringify(res)
    })
  }, 300)
}

// 暴露 Browser sdk
export default Browser
