import path from 'node:path'; import { PactV3, MatchersV3 } from '@pact-foundation/pact'; import fetch from 'node-fetch'
const { like } = MatchersV3
const provider = new PactV3({ consumer:'MiniApp', provider:'LessonsAPI', dir: path.resolve(process.cwd(), 'tests/contracts/pacts') })
describe('GET /lessons/:id', () => {
  it('returns lesson JSON', async () => {
    provider.given('lesson swift-variables-constants exists')
      .uponReceiving('a request for the lesson')
      .withRequest({ method:'GET', path:'/api/lessons/swift-variables-constants' })
      .willRespondWith({ status:200, headers:{'Content-Type':'application/json'}, body: like({ meta: like({ id:'swift-variables-constants' }) }) })
    await provider.executeTest(async (mock) => {
      const res = await fetch(mock.url + '/api/lessons/swift-variables-constants')
      if (res.status !== 200) throw new Error('Unexpected status '+res.status)
    })
  })
})