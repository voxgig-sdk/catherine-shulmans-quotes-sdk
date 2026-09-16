
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'CatherineShulmansQuotes',
        slug: "catherine-shulmans-quotes",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://shulmanquotes.vercel.app",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      api: {
      },

      episode: {
      },

      github_analytics: {
      },

      github_card: {
      },

      github_language: {
      },

      quote: {
      },

    }
  }


  entity = {
    "api": {
      "fields": [
        {
          "name": "api",
          "type": "`$STRING`"
        },
        {
          "name": "author",
          "type": "`$STRING`"
        },
        {
          "name": "disclaimer",
          "type": "`$STRING`"
        },
        {
          "name": "endpoints",
          "type": "`$OBJECT`"
        },
        {
          "name": "mirrors",
          "type": "`$OBJECT`"
        },
        {
          "name": "programs",
          "type": "`$ARRAY`"
        },
        {
          "name": "statistics",
          "type": "`$OBJECT`"
        }
      ],
      "name": "api",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/",
              "segments": [
                {
                  "lit": "api"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "episode": {
      "fields": [
        {
          "name": "episodes",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "program",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "type": "`$STRING`"
        },
        {
          "name": "total",
          "type": "`$INTEGER`"
        },
        {
          "name": "url",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "from": {
          "program": "program"
        },
        "name": "id",
        "parts": [
          "program",
          "episode_id"
        ],
        "sep": "/"
      },
      "name": "episode",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/search/episodes",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "search"
                },
                {
                  "lit": "episodes"
                }
              ],
              "select": {
                "exist": [
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.episodes`"
              },
              "parts": [
                "api",
                "search",
                "episodes"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/episodes",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "episodes"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.episodes`"
              },
              "parts": [
                "api",
                "episodes"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "episode_id",
                    "orig": "episode_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "program",
                    "orig": "program",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/episodes/{program}/{episode_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "episodes"
                },
                {
                  "var": "program"
                },
                {
                  "var": "episode_id"
                }
              ],
              "select": {
                "exist": [
                  "episode_id",
                  "program"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "episodes",
                "{program}",
                "{episode_id}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "program",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/episodes/{program}",
              "rename": {
                "param": {
                  "program": "id"
                }
              },
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "episodes"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "episodes",
                "{id}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "program",
                    "orig": "program",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/episodes/{program}/random",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "episodes"
                },
                {
                  "var": "program"
                },
                {
                  "lit": "random"
                }
              ],
              "select": {
                "$action": "random",
                "exist": [
                  "program"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "episodes",
                "{program}",
                "random"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "episode"
          ]
        ]
      }
    },
    "github_analytics": {
      "fields": [],
      "name": "github_analytics",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "l0v3m0n3y",
                    "kind": "param",
                    "name": "username",
                    "orig": "username",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/github/{username}/analytics",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "github"
                },
                {
                  "var": "username"
                },
                {
                  "lit": "analytics"
                }
              ],
              "select": {
                "exist": [
                  "username"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "github",
                "{username}",
                "analytics"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "github"
          ]
        ]
      }
    },
    "github_card": {
      "fields": [],
      "name": "github_card",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "l0v3m0n3y",
                    "kind": "param",
                    "name": "username",
                    "orig": "username",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "shulman",
                    "kind": "query",
                    "name": "style",
                    "orig": "style",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/github/{username}/card",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "github"
                },
                {
                  "var": "username"
                },
                {
                  "lit": "card"
                }
              ],
              "select": {
                "exist": [
                  "style",
                  "username"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "github",
                "{username}",
                "card"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "github"
          ]
        ]
      }
    },
    "github_language": {
      "fields": [],
      "name": "github_language",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "l0v3m0n3y",
                    "kind": "param",
                    "name": "username",
                    "orig": "username",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/github/{username}/languages",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "github"
                },
                {
                  "var": "username"
                },
                {
                  "lit": "languages"
                }
              ],
              "select": {
                "exist": [
                  "username"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "github",
                "{username}",
                "languages"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "github"
          ]
        ]
      }
    },
    "quote": {
      "fields": [
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "source",
          "type": "`$STRING`"
        },
        {
          "name": "text",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "quote",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "насилие",
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/search/quotes",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "search"
                },
                {
                  "lit": "quotes"
                }
              ],
              "select": {
                "exist": [
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.quotes`"
              },
              "parts": [
                "api",
                "search",
                "quotes"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/quotes",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "quotes"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.quotes`"
              },
              "parts": [
                "api",
                "quotes"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 1,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/quote/{id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "quote"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "quote",
                "{id}"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/quote/random",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "quote"
                },
                {
                  "lit": "random"
                }
              ],
              "select": {
                "$action": "random"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "quote",
                "random"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

