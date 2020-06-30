import Browser from 'bowser'

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
  return {
    screen: getScreen(),
    engine,
    os,
    platform,
    browser,
    user_agent: userAgent
  }
}
