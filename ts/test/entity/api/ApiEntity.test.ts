

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


describe('ApiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CATHERINE_SHULMANS_QUOTES_TEST_LIVE=TRUE.
  afterEach(liveDelay('CATHERINE_SHULMANS_QUOTES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CatherineShulmansQuotesSDK.test()
    const ent = testsdk.Api()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CATHERINE_SHULMANS_QUOTES_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"api","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"author","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"disclaimer","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"endpoints","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"mirrors","req":false,"type":"`$OBJECT`","index$":4},{"active":true,"name":"programs","req":false,"type":"`$ARRAY`","index$":5},{"active":true,"name":"statistics","req":false,"type":"`$OBJECT`","index$":6}],"name":"api","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/","json":"{\"operationId\":\"getApiIndex\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"api\":{\"type\":\"string\"},\"author\":{\"type\":\"string\"},\"disclaimer\":{\"type\":\"string\"},\"endpoints\":{\"type\":\"object\"},\"mirrors\":{\"additionalProperties\":{\"type\":\"string\"},\"type\":\"object\"},\"programs\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"statistics\":{\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"API index document\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/","segments":[{"lit":"api"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api","name__orig":"api","Name":"Api","name_":"api","name-":"api","NAME":"API","index$":0}, {"active":true,"entity":"api","key$":"BasicApiFlow","kind":"basic","name":"BasicApiFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"api_ref01"}}],"index$":0}]}, 'Api')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_ref01_data = Object.values(setup.data.existing.api)[0] as any

    // LIST
    const api_ref01_ent = client.Api()
    const api_ref01_match: any = {}

    const api_ref01_list = (await api_ref01_ent.list(api_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/api/ApiTestData.json')

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
    ['api01','api02','api03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CATHERINE_SHULMANS_QUOTES_TEST_API_ENTID': idmap,
    'CATHERINE_SHULMANS_QUOTES_TEST_LIVE': 'FALSE',
    'CATHERINE_SHULMANS_QUOTES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CATHERINE_SHULMANS_QUOTES_TEST_API_ENTID']

  const live = 'TRUE' === env.CATHERINE_SHULMANS_QUOTES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CATHERINE_SHULMANS_QUOTES_TEST_API_ENTID']
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
  
