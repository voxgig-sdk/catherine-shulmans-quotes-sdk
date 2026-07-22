
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CatherineShulmansQuotesSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CatherineShulmansQuotesSDK.test()
    equal(null !== testsdk, true)
  })

})
