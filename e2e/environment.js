require('dotenv').config()

const NodeEnvironment = require('jest-environment-node')
const wd = require('wd')
const { resolve } = require('path')

// const pagarme = require('../src/clients/pagarme')

const APPIUM_PORT = 4723
const PLATFORM = process.env.PLATFORM

const initializeDriver = (driver) => {
  const iosOptions = {
    platformName: 'iOS',
    platformVersion: '13.6',
    deviceName: 'iPhone 8',
    automationName: 'XCUITest',
    autoAcceptAlerts: true,
    app: resolve('./ios/App/Build/App/Build/Products/Debug-iphonesimulator/App.app')
  }

  const androidOptions = {
    platformName: 'Android',
    platformVersion: '9',
    deviceName: 'Android Emulator',
    automationName: 'UIAutomator2',
    app: resolve('./android/app/build/outputs/apk/debug/app-debug.apk'),
    appPackage: 'com.hybridapp.app',
    appActivity: '.MainActivity',
  }

  const platformOptions = PLATFORM === 'iOS'
    ? iosOptions
    : androidOptions

  const options = {
    autoLaunch: true,
    autoWebview: true,
    ...platformOptions,
  }

  return driver.init(options)
}

const sleep = timeout => new Promise(
  resolve => setTimeout(() => resolve(), timeout)
)

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)

    this.testPath = context.testPath
    this.docblockPragmas = context.docblockPragmas
    this.openAppLink = this.openAppLink.bind(this)
  }

  async openAppLink (url) {
    const { driver } = this.global

    if (!driver) throw new Error('appium driver not initialized')

    const deepLinkIntent = `-a android.intent.action.VIEW -d ${url}`

    return driver.startActivity({
      appPackage: 'com.appiumapptypescript',
      appActivity: '.MainActivity',
      optionalIntentArguments: deepLinkIntent,
    })
  }

  async setup () {
    await super.setup()

    const driver = await wd.promiseChainRemote({
      host: '127.0.0.1',
      port: APPIUM_PORT,
    })

    await initializeDriver(driver)

    // const pagarmeClient = pagarme()
    // pagarmeClient.authenticate({ api_key: process.env.API_KEY })

    this.global.driver = driver
    this.global.wd = wd
    this.global.openAppLink = this.openAppLink
    // this.global.pagarme = pagarmeClient
    this.global.sleep = sleep
  }

  async teardown () {
    await super.teardown()

    if (this.global.driver) {
      await this.global.driver.quit()
    }
  }
}

module.exports = CustomEnvironment
