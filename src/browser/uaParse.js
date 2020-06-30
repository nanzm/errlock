import Browser from 'bowser'
import { isObject, underline } from '../helper'

const Parser = Browser.getParser(window.navigator.userAgent)
export const userAgent = Parser.getUA()
export const parserResult = Parser.getResult()

export function getScreen () {
  const s = window.screen || {}
  return {
    screenWidth: s.width,
    screenHeight: s.height,
    screenAvailWidth: s.availWidth,
    screenAvailHeight: s.availHeight,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  }
}

export function getBrowserInfo () {
  const { engine, os, platform, browser } = parserResult

  const data = {
    screen: getScreen(),
    engine,
    os,
    platform,
    browser,
    user_agent: userAgent
  }

  // 打平
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
  return tmp
}
