# CatherineShulmansQuotes SDK configuration


def make_config():
    return {
        "main": {
            "name": "CatherineShulmansQuotes",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://shulmanquotes.vercel.app",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "api": {},
                "episode": {},
                "github_analytics": {},
                "github_card": {},
                "github_language": {},
                "quote": {},
            },
        },
        "entity": {
      "api": {
        "fields": [
          {
            "active": True,
            "name": "api",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "author",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "disclaimer",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "endpoints",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "mirrors",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "programs",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "statistics",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 6,
          },
        ],
        "name": "api",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/",
                "parts": [
                  "api",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "episode": {
        "fields": [
          {
            "active": True,
            "name": "episodes",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "program",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "title",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "total",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "url",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
        ],
        "name": "episode",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/search/episodes",
                "parts": [
                  "api",
                  "search",
                  "episodes",
                ],
                "select": {
                  "exist": [
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.episodes`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/episodes",
                "parts": [
                  "api",
                  "episodes",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.episodes`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "episode_id",
                      "orig": "episode_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "program",
                      "orig": "program",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/episodes/{program}/{episode_id}",
                "parts": [
                  "api",
                  "episodes",
                  "{program}",
                  "{episode_id}",
                ],
                "select": {
                  "exist": [
                    "episode_id",
                    "program",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "program",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/episodes/{program}",
                "parts": [
                  "api",
                  "episodes",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "program": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "program",
                      "orig": "program",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/episodes/{program}/random",
                "parts": [
                  "api",
                  "episodes",
                  "{program}",
                  "random",
                ],
                "select": {
                  "$action": "random",
                  "exist": [
                    "program",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 2,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "episode",
            ],
          ],
        },
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
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "l0v3m0n3y",
                      "kind": "param",
                      "name": "username",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/github/{username}/analytics",
                "parts": [
                  "api",
                  "github",
                  "{username}",
                  "analytics",
                ],
                "select": {
                  "exist": [
                    "username",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "github",
            ],
          ],
        },
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
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "l0v3m0n3y",
                      "kind": "param",
                      "name": "username",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "example": "shulman",
                      "kind": "query",
                      "name": "style",
                      "orig": "style",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/github/{username}/card",
                "parts": [
                  "api",
                  "github",
                  "{username}",
                  "card",
                ],
                "select": {
                  "exist": [
                    "style",
                    "username",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "github",
            ],
          ],
        },
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
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "l0v3m0n3y",
                      "kind": "param",
                      "name": "username",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/github/{username}/languages",
                "parts": [
                  "api",
                  "github",
                  "{username}",
                  "languages",
                ],
                "select": {
                  "exist": [
                    "username",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "github",
            ],
          ],
        },
      },
      "quote": {
        "fields": [
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "source",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "text",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "quote",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "насилие",
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/search/quotes",
                "parts": [
                  "api",
                  "search",
                  "quotes",
                ],
                "select": {
                  "exist": [
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.quotes`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/quotes",
                "parts": [
                  "api",
                  "quotes",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.quotes`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": 1,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/quote/{id}",
                "parts": [
                  "api",
                  "quote",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/quote/random",
                "parts": [
                  "api",
                  "quote",
                  "random",
                ],
                "select": {
                  "$action": "random",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
