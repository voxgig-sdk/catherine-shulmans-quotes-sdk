# CatherineShulmansQuotes TypeScript SDK



The TypeScript SDK for the CatherineShulmansQuotes API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Api()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/catherine-shulmans-quotes-sdk/releases](https://github.com/voxgig-sdk/catherine-shulmans-quotes-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CatherineShulmansQuotesSDK } from '@voxgig-sdk/catherine-shulmans-quotes'

const client = new CatherineShulmansQuotesSDK()
```

### 2. List api records

`list()` resolves to an array of Api ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const apis = await client.Api().list()

for (const api of apis) {
  console.log(api)
}
```

### 3. Load a githubanalytics

GithubAnalytics is nested under username, so provide the `username`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const githubanalytics = await client.GithubAnalytics().load({
    username: 'example_username',
  })
  console.log(githubanalytics)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const githubcard = await client.GithubCard().load({ username: "example" })
  console.log(githubcard)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CatherineShulmansQuotesSDK.test()

const githubcard = await client.GithubCard().load({ username: 'example_username' })
// githubcard is the entity, populated with mock response data
// — call githubcard.data() for the record itself
console.log(githubcard)
```

You can also use the instance method:

```ts
const client = new CatherineShulmansQuotesSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.GithubCard()

// First call runs the operation and stores its result
await entity.load({ username: 'example_username' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CatherineShulmansQuotesSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CATHERINE_SHULMANS_QUOTES_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### CatherineShulmansQuotesSDK

#### Constructor

```ts
new CatherineShulmansQuotesSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Api(data?)` | `ApiEntity` | Create an Api entity instance. |
| `Episode(data?)` | `EpisodeEntity` | Create an Episode entity instance. |
| `GithubAnalytics(data?)` | `GithubAnalyticsEntity` | Create a GithubAnalytics entity instance. |
| `GithubCard(data?)` | `GithubCardEntity` | Create a GithubCard entity instance. |
| `GithubLanguage(data?)` | `GithubLanguageEntity` | Create a GithubLanguage entity instance. |
| `Quote(data?)` | `QuoteEntity` | Create a Quote entity instance. |
| `tester(testopts?, sdkopts?)` | `CatherineShulmansQuotesSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CatherineShulmansQuotesSDK.test(testopts?, sdkopts?)` | `CatherineShulmansQuotesSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CatherineShulmansQuotesSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Api

| Field | Description |
| --- | --- |
| `api` |  |
| `author` |  |
| `disclaimer` |  |
| `endpoints` |  |
| `mirrors` |  |
| `programs` |  |
| `statistics` |  |

Operations: list.

API path: `/api/`

#### Episode

| Field | Description |
| --- | --- |
| `episodes` |  |
| `id` |  |
| `program` |  |
| `title` |  |
| `total` |  |
| `url` |  |

Operations: list, load.

API path: `/api/search/episodes`

#### GithubAnalytics

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/github/{username}/analytics`

#### GithubCard

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/github/{username}/card`

#### GithubLanguage

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/github/{username}/languages`

#### Quote

| Field | Description |
| --- | --- |
| `id` |  |
| `source` |  |
| `text` |  |

Operations: list, load.

API path: `/api/search/quotes`



## Entities


### Api

Create an instance: `const api = client.Api()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api` | `string` |  |
| `author` | `string` |  |
| `disclaimer` | `string` |  |
| `endpoints` | `Record<string, any>` |  |
| `mirrors` | `Record<string, any>` |  |
| `programs` | `any[]` |  |
| `statistics` | `Record<string, any>` |  |

#### Example: List

```ts
const apis = await client.Api().list()
```


### Episode

Create an instance: `const episode = client.Episode()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `episodes` | `any[]` |  |
| `id` | `string` |  |
| `program` | `string` |  |
| `title` | `string` |  |
| `total` | `number` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const episode = await client.Episode().load({ id: 'episode_id' })
```

#### Example: List

```ts
const episodes = await client.Episode().list()
```


### GithubAnalytics

Create an instance: `const github_analytics = client.GithubAnalytics()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const github_analytics = await client.GithubAnalytics().load({ username: 'username' })
```


### GithubCard

Create an instance: `const github_card = client.GithubCard()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const github_card = await client.GithubCard().load({ username: 'username' })
```


### GithubLanguage

Create an instance: `const github_language = client.GithubLanguage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const github_language = await client.GithubLanguage().load({ username: 'username' })
```


### Quote

Create an instance: `const quote = client.Quote()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` |  |
| `source` | `string` |  |
| `text` | `string` |  |

#### Example: Load

```ts
const quote = await client.Quote().load({ id: 1 })
```

#### Example: List

```ts
const quotes = await client.Quote().list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
catherine-shulmans-quotes/
├── src/
│   ├── CatherineShulmansQuotesSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CatherineShulmansQuotesSDK } from '@voxgig-sdk/catherine-shulmans-quotes'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const githubcard = client.GithubCard()
await githubcard.load({ username: "example" })

// githubcard.data() now returns the githubcard data from the last `load`
// githubcard.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
