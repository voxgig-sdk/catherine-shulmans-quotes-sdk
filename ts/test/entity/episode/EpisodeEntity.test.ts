

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


describe('EpisodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CATHERINE_SHULMANS_QUOTES_TEST_LIVE=TRUE.
  afterEach(liveDelay('CATHERINE_SHULMANS_QUOTES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CatherineShulmansQuotesSDK.test()
    const ent = testsdk.Episode()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CATHERINE_SHULMANS_QUOTES_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'episode.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"episodes","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"program","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"title","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"total","req":false,"type":"`$INTEGER`","index$":4},{"active":true,"name":"url","req":false,"type":"`$STRING`","index$":5}],"id":{"field":"id","from":{"program":"program"},"name":"id","parts":["program","episode_id"],"sep":"/"},"name":"episode","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"q","orig":"q","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/search/episodes","json":"{\"operationId\":\"searchEpisodes\",\"parameters\":[{\"description\":\"Search term.\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"episodes\":{\"items\":{\"properties\":{\"id\":{\"type\":\"string\"},\"program\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Matching episodes\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/search/episodes","segments":[{"lit":"api"},{"lit":"search"},{"lit":"episodes"}],"select":{"exist":["q"]},"transform":{"req":"`reqdata`","res":"`body.episodes`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /api/episodes","json":"{\"operationId\":\"getAllEpisodes\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"episodes\":{\"items\":{\"properties\":{\"id\":{\"type\":\"string\"},\"program\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"All episodes\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/episodes","segments":[{"lit":"api"},{"lit":"episodes"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.episodes`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"episode_id","orig":"episode_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"program","orig":"program","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/episodes/{program}/{episode_id}","json":"{\"operationId\":\"getEpisodeById\",\"parameters\":[{\"description\":\"Program slug: slow-reading, knowledge-is-power, status or zakladka.\",\"in\":\"path\",\"name\":\"program\",\"required\":true,\"schema\":{\"enum\":[\"slow-reading\",\"knowledge-is-power\",\"status\",\"zakladka\"],\"type\":\"string\"}},{\"description\":\"Episode identifier.\",\"in\":\"path\",\"name\":\"episode_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"type\":\"string\"},\"program\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The requested episode\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"example\":\"Not Found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/episodes/{program}/{episode_id}","segments":[{"lit":"api"},{"lit":"episodes"},{"var":"program"},{"var":"episode_id"}],"select":{"exist":["episode_id","program"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"program","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/episodes/{program}","json":"{\"operationId\":\"getEpisodesByProgram\",\"parameters\":[{\"description\":\"Program slug: slow-reading, knowledge-is-power, status or zakladka.\",\"in\":\"path\",\"name\":\"program\",\"required\":true,\"schema\":{\"enum\":[\"slow-reading\",\"knowledge-is-power\",\"status\",\"zakladka\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"episodes\":{\"items\":{\"properties\":{\"id\":{\"type\":\"string\"},\"program\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Episodes of the program\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"example\":\"Not Found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/episodes/{program}","rename":{"param":{"program":"id"}},"segments":[{"lit":"api"},{"lit":"episodes"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"program","orig":"program","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"GET /api/episodes/{program}/random","json":"{\"operationId\":\"getRandomEpisode\",\"parameters\":[{\"description\":\"Program slug: slow-reading, knowledge-is-power, status or zakladka.\",\"in\":\"path\",\"name\":\"program\",\"required\":true,\"schema\":{\"enum\":[\"slow-reading\",\"knowledge-is-power\",\"status\",\"zakladka\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"type\":\"string\"},\"program\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"A random episode\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"example\":\"Not Found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/episodes/{program}/random","segments":[{"lit":"api"},{"lit":"episodes"},{"var":"program"},{"lit":"random"}],"select":{"$action":"random","exist":["program"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[["episode"]]},"key$":"episode","name__orig":"episode","Name":"Episode","name_":"episode","name-":"episode","NAME":"EPISODE","index$":1}, {"active":true,"entity":"episode","key$":"BasicEpisodeFlow","kind":"basic","name":"BasicEpisodeFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"episode_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"episode_ref01","srcdatavar":"episode_ref01_data","suffix":"_dt0"},"match":{"id":"episode01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-episode_ref01"}}],"index$":1}]}, 'Episode')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let episode_ref01_data = Object.values(setup.data.existing.episode)[0] as any

    // LIST
    const episode_ref01_ent = client.Episode()
    const episode_ref01_match: any = {}

    const episode_ref01_list = (await episode_ref01_ent.list(episode_ref01_match)).map((e: any) => e.data())


    // LOAD
    const episode_ref01_match_dt0: any = {}
    episode_ref01_match_dt0.id = episode_ref01_data.id
    const episode_ref01_data_dt0 = (await episode_ref01_ent.load(episode_ref01_match_dt0)).data()
    assert(episode_ref01_data_dt0.id === episode_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/episode/EpisodeTestData.json')

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
    ['episode01','episode02','episode03','episode01','episode02','episode03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CATHERINE_SHULMANS_QUOTES_TEST_EPISODE_ENTID': idmap,
    'CATHERINE_SHULMANS_QUOTES_TEST_LIVE': 'FALSE',
    'CATHERINE_SHULMANS_QUOTES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CATHERINE_SHULMANS_QUOTES_TEST_EPISODE_ENTID']

  const live = 'TRUE' === env.CATHERINE_SHULMANS_QUOTES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CATHERINE_SHULMANS_QUOTES_TEST_EPISODE_ENTID']
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
  
