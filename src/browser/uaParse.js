import Browser from 'bowser'
import { config } from '../config'
import { transferDeviceData } from '../report/index'

const Screen = window.screen || {}
const screenData = {
  screenWidth: Screen.width,
  screenHeight: Screen.height,
  screenAvailWidth: Screen.availWidth,
  screenAvailHeight: Screen.availHeight,
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight
}

export function reportUAInfo () {
  const Parser = Browser.getParser(window.navigator.userAgent)
  const userAgent = Parser.getUA()
  const result = Parser.getResult()
  const { engine, os, platform, browser } = result

  transferDeviceData({
    uid: config.uid,
    screen: screenData,
    engine,
    os,
    platform,
    browser,
    user_agent: userAgent
  })
}
