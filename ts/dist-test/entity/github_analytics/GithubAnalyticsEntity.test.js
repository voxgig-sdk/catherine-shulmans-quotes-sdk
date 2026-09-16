"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GithubAnalyticsEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CATHERINE_SHULMANS_QUOTES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CATHERINE_SHULMANS_QUOTES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CatherineShulmansQuotesSDK.test();
        const ent = testsdk.GithubAnalytics();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CATHERINE_SHULMANS_QUOTES_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'github_analytics.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "github_analytics", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "l0v3m0n3y", "kind": "param", "name": "username", "orig": "username", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/github/{username}/analytics", "json": "{\"operationId\":\"getGithubAnalytics\",\"parameters\":[{\"description\":\"GitHub username.\",\"in\":\"path\",\"name\":\"username\",\"required\":true,\"schema\":{\"example\":\"l0v3m0n3y\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Profile analytics\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/github/{username}/analytics", "segments": [{ "lit": "api" }, { "lit": "github" }, { "var": "username" }, { "lit": "analytics" }], "select": { "exist": ["username"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["github"]] }, "key$": "github_analytics", "name__orig": "github_analytics", "Name": "GithubAnalytics", "name_": "github_analytics", "name-": "github-analytics", "NAME": "GITHUB_ANALYTICS", "index$": 2 }, { "active": true, "entity": "github_analytics", "key$": "BasicGithubAnalyticsFlow", "kind": "basic", "name": "BasicGithubAnalyticsFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "github_analytics_ref01", "srcdatavar": "github_analytics_ref01_data", "suffix": "_dt0" }, "match": { "id": "github_analytics01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-github_analytics_ref01" } }], "index$": 0 }] }, 'GithubAnalytics');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let github_analytics_ref01_data = Object.values(setup.data.existing.github_analytics)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const github_analytics_ref01_ent = client.GithubAnalytics();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/github_analytics/GithubAnalyticsTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CatherineShulmansQuotesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['github_analytics01', 'github_analytics02', 'github_analytics03', 'github01', 'github02', 'github03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CATHERINE_SHULMANS_QUOTES_TEST_GITHUB_ANALYTICS_ENTID': idmap,
        'CATHERINE_SHULMANS_QUOTES_TEST_LIVE': 'FALSE',
        'CATHERINE_SHULMANS_QUOTES_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CATHERINE_SHULMANS_QUOTES_TEST_GITHUB_ANALYTICS_ENTID'];
    const live = 'TRUE' === env.CATHERINE_SHULMANS_QUOTES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CATHERINE_SHULMANS_QUOTES_TEST_GITHUB_ANALYTICS_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CatherineShulmansQuotesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=GithubAnalyticsEntity.test.js.map