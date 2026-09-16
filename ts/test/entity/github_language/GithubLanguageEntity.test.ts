

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


describe('GithubLanguageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CATHERINE_SHULMANS_QUOTES_TEST_LIVE=TRUE.
  afterEach(liveDelay('CATHERINE_SHULMANS_QUOTES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CatherineShulmansQuotesSDK.test()
    const ent = testsdk.GithubLanguage()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CATHERINE_SHULMANS_QUOTES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'github_language.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"github_language","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"l0v3m0n3y","kind":"param","name":"username","orig":"username","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/github/{username}/languages","json":"{\"operationId\":\"getGithubLanguages\",\"parameters\":[{\"description\":\"GitHub username.\",\"in\":\"path\",\"name\":\"username\",\"required\":true,\"schema\":{\"example\":\"l0v3m0n3y\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":{\"type\":\"number\"},\"type\":\"object\"}}},\"description\":\"Language distribution\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/github/{username}/languages","segments":[{"lit":"api"},{"lit":"github"},{"var":"username"},{"lit":"languages"}],"select":{"exist":["username"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["github"]]},"key$":"github_language","name__orig":"github_language","Name":"GithubLanguage","name_":"github_language","name-":"github-language","NAME":"GITHUB_LANGUAGE","index$":4}, {"active":true,"entity":"github_language","key$":"BasicGithubLanguageFlow","kind":"basic","name":"BasicGithubLanguageFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"github_language_ref01","srcdatavar":"github_language_ref01_data","suffix":"_dt0"},"match":{"id":"github_language01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-github_language_ref01"}}],"index$":0}]}, 'GithubLanguage')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let github_language_ref01_data = Object.values(setup.data.existing.github_language)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const github_language_ref01_ent = client.GithubLanguage()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/github_language/GithubLanguageTestData.json')

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
    ['github_language01','github_language02','github_language03','github01','github02','github03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CATHERINE_SHULMANS_QUOTES_TEST_GITHUB_LANGUAGE_ENTID': idmap,
    'CATHERINE_SHULMANS_QUOTES_TEST_LIVE': 'FALSE',
    'CATHERINE_SHULMANS_QUOTES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CATHERINE_SHULMANS_QUOTES_TEST_GITHUB_LANGUAGE_ENTID']

  const live = 'TRUE' === env.CATHERINE_SHULMANS_QUOTES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CATHERINE_SHULMANS_QUOTES_TEST_GITHUB_LANGUAGE_ENTID']
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
  
