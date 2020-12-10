test('should pass', async () => {
  const button = await driver.elementsByTagName('button')

  await driver.tapElement(button[0])

  const contexts = await driver.contexts()
  console.log(contexts)
  await driver.context(contexts[0])

  await driver.openNotifications()

  await sleep(2000)

  const notifications = await driver.elementByXPath('//*[@text="It\'s a notification!"]')
  console.log(notifications)
})
