

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CatherineShulmansQuotesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('QuoteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CATHERINE_SHULMANS_QUOTES_TEST_LIVE=TRUE.
  afterEach(liveDelay('CATHERINE_SHULMANS_QUOTES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CatherineShulmansQuotesSDK.test()
    const ent = testsdk.Quote()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CATHERINE_SHULMANS_QUOTES_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'quote.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":0},{"active":true,"name":"source","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"text","req":false,"type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"quote","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"насилие","kind":"query","name":"q","orig":"q","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/search/quotes","json":"{\"operationId\":\"searchQuotes\",\"parameters\":[{\"description\":\"Search term.\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"example\":\"насилие\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"quotes\":{\"items\":{\"properties\":{\"id\":{\"example\":1,\"type\":\"integer\"},\"source\":{\"type\":\"string\"},\"text\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Matching quotes\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/search/quotes","segments":[{"lit":"api"},{"lit":"search"},{"lit":"quotes"}],"select":{"exist":["q"]},"transform":{"req":"`reqdata`","res":"`body.quotes`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /api/quotes","json":"{\"operationId\":\"getAllQuotes\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"quotes\":{\"items\":{\"properties\":{\"id\":{\"example\":1,\"type\":\"integer\"},\"source\":{\"type\":\"string\"},\"text\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"example\":276,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"All quotes\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/quotes","segments":[{"lit":"api"},{"lit":"quotes"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.quotes`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":1,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /api/quote/{id}","json":"{\"operationId\":\"getQuoteById\",\"parameters\":[{\"description\":\"Quote identifier.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"example\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"example\":1,\"type\":\"integer\"},\"source\":{\"type\":\"string\"},\"text\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The requested quote\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"example\":\"Not Found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/quote/{id}","segments":[{"lit":"api"},{"lit":"quote"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /api/quote/random","json":"{\"operationId\":\"getRandomQuote\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"example\":1,\"type\":\"integer\"},\"source\":{\"type\":\"string\"},\"text\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"A random quote\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/quote/random","segments":[{"lit":"api"},{"lit":"quote"},{"lit":"random"}],"select":{"$action":"random"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"quote","name__orig":"quote","Name":"Quote","name_":"quote","name-":"quote","NAME":"QUOTE","index$":5}, {"active":true,"entity":"quote","key$":"BasicQuoteFlow","kind":"basic","name":"BasicQuoteFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"quote_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"quote_ref01","srcdatavar":"quote_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-quote_ref01"}}],"index$":1}]}, 'Quote')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let quote_ref01_data = Object.values(setup.data.existing.quote)[0] as any

    // LIST
    const quote_ref01_ent = client.Quote()
    const quote_ref01_match: any = {}

    const quote_ref01_list = (await quote_ref01_ent.list(quote_ref01_match)).map((e: any) => e.data())


    // LOAD
    const quote_ref01_match_dt0: any = {}
    quote_ref01_match_dt0.id = quote_ref01_data.id
    const quote_ref01_data_dt0 = (await quote_ref01_ent.load(quote_ref01_match_dt0)).data()
    assert(quote_ref01_data_dt0.id === quote_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/quote/QuoteTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CatherineShulmansQuotesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['quote01','quote02','quote03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CATHERINE_SHULMANS_QUOTES_TEST_QUOTE_ENTID': idmap,
    'CATHERINE_SHULMANS_QUOTES_TEST_LIVE': 'FALSE',
    'CATHERINE_SHULMANS_QUOTES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CATHERINE_SHULMANS_QUOTES_TEST_QUOTE_ENTID']

  const live = 'TRUE' === env.CATHERINE_SHULMANS_QUOTES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CATHERINE_SHULMANS_QUOTES_TEST_QUOTE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CatherineShulmansQuotesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CATHERINE_SHULMANS_QUOTES_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
