# CatherineShulmansQuotes SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "CatherineShulmansQuotes",
            "slug": "catherine-shulmans-quotes",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "name": "api",
            "type": "`$STRING`",
          },
          {
            "name": "author",
            "type": "`$STRING`",
          },
          {
            "name": "disclaimer",
            "type": "`$STRING`",
          },
          {
            "name": "endpoints",
            "type": "`$OBJECT`",
          },
          {
            "name": "mirrors",
            "type": "`$OBJECT`",
          },
          {
            "name": "programs",
            "type": "`$ARRAY`",
          },
          {
            "name": "statistics",
            "type": "`$OBJECT`",
          },
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
                    "lit": "api",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "episode": {
        "fields": [
          {
            "name": "episodes",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "program",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "total",
            "type": "`$INTEGER`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "program": "program",
          },
          "name": "id",
          "parts": [
            "program",
            "episode_id",
          ],
          "sep": "/",
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/search/episodes",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "episodes",
                  },
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
                "parts": [
                  "api",
                  "search",
                  "episodes",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/episodes",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "episodes",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.episodes`",
                },
                "parts": [
                  "api",
                  "episodes",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
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
                "orig": "/api/episodes/{program}/{episode_id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "episodes",
                  },
                  {
                    "var": "program",
                  },
                  {
                    "var": "episode_id",
                  },
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
                "parts": [
                  "api",
                  "episodes",
                  "{program}",
                  "{episode_id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "program",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/episodes/{program}",
                "rename": {
                  "param": {
                    "program": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "episodes",
                  },
                  {
                    "var": "id",
                  },
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
                "parts": [
                  "api",
                  "episodes",
                  "{id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
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
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "episodes",
                  },
                  {
                    "var": "program",
                  },
                  {
                    "lit": "random",
                  },
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
                "parts": [
                  "api",
                  "episodes",
                  "{program}",
                  "random",
                ],
              },
            ],
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
                "args": {
                  "params": [
                    {
                      "example": "l0v3m0n3y",
                      "kind": "param",
                      "name": "username",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/github/{username}/analytics",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "github",
                  },
                  {
                    "var": "username",
                  },
                  {
                    "lit": "analytics",
                  },
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
                "parts": [
                  "api",
                  "github",
                  "{username}",
                  "analytics",
                ],
              },
            ],
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
                "args": {
                  "params": [
                    {
                      "example": "l0v3m0n3y",
                      "kind": "param",
                      "name": "username",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "shulman",
                      "kind": "query",
                      "name": "style",
                      "orig": "style",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/github/{username}/card",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "github",
                  },
                  {
                    "var": "username",
                  },
                  {
                    "lit": "card",
                  },
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
                "parts": [
                  "api",
                  "github",
                  "{username}",
                  "card",
                ],
              },
            ],
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
                "args": {
                  "params": [
                    {
                      "example": "l0v3m0n3y",
                      "kind": "param",
                      "name": "username",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/github/{username}/languages",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "github",
                  },
                  {
                    "var": "username",
                  },
                  {
                    "lit": "languages",
                  },
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
                "parts": [
                  "api",
                  "github",
                  "{username}",
                  "languages",
                ],
              },
            ],
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
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "source",
            "type": "`$STRING`",
          },
          {
            "name": "text",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/search/quotes",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "quotes",
                  },
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
                "parts": [
                  "api",
                  "search",
                  "quotes",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/quotes",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "quotes",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.quotes`",
                },
                "parts": [
                  "api",
                  "quotes",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/quote/{id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "quote",
                  },
                  {
                    "var": "id",
                  },
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
                "parts": [
                  "api",
                  "quote",
                  "{id}",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/quote/random",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "quote",
                  },
                  {
                    "lit": "random",
                  },
                ],
                "select": {
                  "$action": "random",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "quote",
                  "random",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
