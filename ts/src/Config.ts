
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'CatherineShulmansQuotes',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
              "parts": [
                "api"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "search",
                "episodes"
              ],
              "select": {
                "exist": [
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.episodes`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/episodes",
              "parts": [
                "api",
                "episodes"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.episodes`"
              }
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
              "parts": [
                "api",
                "episodes",
                "{program}",
                "{episode_id}"
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
              }
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
              "parts": [
                "api",
                "episodes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "program": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "episodes",
                "{program}",
                "random"
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
              }
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
              "parts": [
                "api",
                "github",
                "{username}",
                "analytics"
              ],
              "select": {
                "exist": [
                  "username"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "github",
                "{username}",
                "card"
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
              }
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
              "parts": [
                "api",
                "github",
                "{username}",
                "languages"
              ],
              "select": {
                "exist": [
                  "username"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "search",
                "quotes"
              ],
              "select": {
                "exist": [
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.quotes`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/quotes",
              "parts": [
                "api",
                "quotes"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.quotes`"
              }
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
              "parts": [
                "api",
                "quote",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/quote/random",
              "parts": [
                "api",
                "quote",
                "random"
              ],
              "select": {
                "$action": "random"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

