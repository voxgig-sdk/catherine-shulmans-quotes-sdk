# CatherineShulmansQuotes TypeScript SDK Reference

Complete API reference for the CatherineShulmansQuotes TypeScript SDK.


## CatherineShulmansQuotesSDK

### Constructor

```ts
new CatherineShulmansQuotesSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CatherineShulmansQuotesSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CatherineShulmansQuotesSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CatherineShulmansQuotesSDK` instance in test mode.


### Instance Methods

#### `Api(data?: object)`

Create a new `Api` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiEntity` instance.

#### `Episode(data?: object)`

Create a new `Episode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EpisodeEntity` instance.

#### `GithubAnalytics(data?: object)`

Create a new `GithubAnalytics` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GithubAnalyticsEntity` instance.

#### `GithubCard(data?: object)`

Create a new `GithubCard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GithubCardEntity` instance.

#### `GithubLanguage(data?: object)`

Create a new `GithubLanguage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GithubLanguageEntity` instance.

#### `Quote(data?: object)`

Create a new `Quote` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QuoteEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CatherineShulmansQuotesSDK.test()`.

**Returns:** `CatherineShulmansQuotesSDK` instance in test mode.


---

## ApiEntity

```ts
const api = client.Api()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api` | `string` | No |  |
| `author` | `string` | No |  |
| `disclaimer` | `string` | No |  |
| `endpoints` | `Record<string, any>` | No |  |
| `mirrors` | `Record<string, any>` | No |  |
| `programs` | `any[]` | No |  |
| `statistics` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Api().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiEntity` instance with the same client and
options.

#### `client()`

Return the parent `CatherineShulmansQuotesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EpisodeEntity

```ts
const episode = client.Episode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `episodes` | `any[]` | No |  |
| `id` | `string` | No |  |
| `program` | `string` | No |  |
| `title` | `string` | No |  |
| `total` | `number` | No |  |
| `url` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `random` | `/api/episodes/{program}/random` | `client.Episode().load({ $action: 'random', ... })` |

An action returns that action's OWN response, which is not necessarily a
Episode record — check the API definition for its shape.

```ts
const result = await client.Episode().load({
  $action: 'random',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Episode().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Episode().load({ id: 'episode_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EpisodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `CatherineShulmansQuotesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GithubAnalyticsEntity

```ts
const github_analytics = client.GithubAnalytics()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GithubAnalytics().load({ username: 'username' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GithubAnalyticsEntity` instance with the same client and
options.

#### `client()`

Return the parent `CatherineShulmansQuotesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GithubCardEntity

```ts
const github_card = client.GithubCard()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GithubCard().load({ username: 'username' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GithubCardEntity` instance with the same client and
options.

#### `client()`

Return the parent `CatherineShulmansQuotesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GithubLanguageEntity

```ts
const github_language = client.GithubLanguage()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GithubLanguage().load({ username: 'username' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GithubLanguageEntity` instance with the same client and
options.

#### `client()`

Return the parent `CatherineShulmansQuotesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QuoteEntity

```ts
const quote = client.Quote()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No |  |
| `source` | `string` | No |  |
| `text` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `random` | `/api/quote/random` | `client.Quote().load({ $action: 'random', ... })` |

An action returns that action's OWN response, which is not necessarily a
Quote record — check the API definition for its shape.

```ts
const result = await client.Quote().load({
  $action: 'random',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Quote().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Quote().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QuoteEntity` instance with the same client and
options.

#### `client()`

Return the parent `CatherineShulmansQuotesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CatherineShulmansQuotesSDK({
  feature: {
    test: { active: true },
  }
})
```

