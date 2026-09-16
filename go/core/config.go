package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CatherineShulmansQuotes",
			"slug": "catherine-shulmans-quotes",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://shulmanquotes.vercel.app",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"api": map[string]any{},
				"episode": map[string]any{},
				"github_analytics": map[string]any{},
				"github_card": map[string]any{},
				"github_language": map[string]any{},
				"quote": map[string]any{},
			},
		},
		"entity": map[string]any{
			"api": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "api",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "author",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "disclaimer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "endpoints",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "mirrors",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "programs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "statistics",
						"type": "`$OBJECT`",
					},
				},
				"name": "api",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"episode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "episodes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "program",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"program": "program",
					},
					"name": "id",
					"parts": []any{
						"program",
						"episode_id",
					},
					"sep": "/",
				},
				"name": "episode",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/search/episodes",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "episodes",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.episodes`",
								},
								"parts": []any{
									"api",
									"search",
									"episodes",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/episodes",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "episodes",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.episodes`",
								},
								"parts": []any{
									"api",
									"episodes",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "episode_id",
											"orig": "episode_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "program",
											"orig": "program",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/episodes/{program}/{episode_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "episodes",
									},
									map[string]any{
										"var": "program",
									},
									map[string]any{
										"var": "episode_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"episode_id",
										"program",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"episodes",
									"{program}",
									"{episode_id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "program",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/episodes/{program}",
								"rename": map[string]any{
									"param": map[string]any{
										"program": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "episodes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"episodes",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "program",
											"orig": "program",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/episodes/{program}/random",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "episodes",
									},
									map[string]any{
										"var": "program",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"select": map[string]any{
									"$action": "random",
									"exist": []any{
										"program",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"episodes",
									"{program}",
									"random",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"episode",
						},
					},
				},
			},
			"github_analytics": map[string]any{
				"fields": []any{},
				"name": "github_analytics",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "l0v3m0n3y",
											"kind": "param",
											"name": "username",
											"orig": "username",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/github/{username}/analytics",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "github",
									},
									map[string]any{
										"var": "username",
									},
									map[string]any{
										"lit": "analytics",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"username",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"github",
									"{username}",
									"analytics",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"github",
						},
					},
				},
			},
			"github_card": map[string]any{
				"fields": []any{},
				"name": "github_card",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "l0v3m0n3y",
											"kind": "param",
											"name": "username",
											"orig": "username",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "shulman",
											"kind": "query",
											"name": "style",
											"orig": "style",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/github/{username}/card",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "github",
									},
									map[string]any{
										"var": "username",
									},
									map[string]any{
										"lit": "card",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"style",
										"username",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"github",
									"{username}",
									"card",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"github",
						},
					},
				},
			},
			"github_language": map[string]any{
				"fields": []any{},
				"name": "github_language",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "l0v3m0n3y",
											"kind": "param",
											"name": "username",
											"orig": "username",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/github/{username}/languages",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "github",
									},
									map[string]any{
										"var": "username",
									},
									map[string]any{
										"lit": "languages",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"username",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"github",
									"{username}",
									"languages",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"github",
						},
					},
				},
			},
			"quote": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "source",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "text",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "quote",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "насилие",
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/search/quotes",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "quotes",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.quotes`",
								},
								"parts": []any{
									"api",
									"search",
									"quotes",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/quotes",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "quotes",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.quotes`",
								},
								"parts": []any{
									"api",
									"quotes",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 1,
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/quote/{id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "quote",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"quote",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/quote/random",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "quote",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"select": map[string]any{
									"$action": "random",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"quote",
									"random",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
