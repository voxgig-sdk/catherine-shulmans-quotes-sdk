# Typed models for the CatherineShulmansQuotes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Api(TypedDict, total=False):
    api: str
    author: str
    disclaimer: str
    endpoint: dict
    mirror: dict
    program: list
    statistic: dict


class ApiListMatch(TypedDict, total=False):
    api: str
    author: str
    disclaimer: str
    endpoint: dict
    mirror: dict
    program: list
    statistic: dict


class Episode(TypedDict, total=False):
    episode: list
    id: str
    program: str
    title: str
    total: int
    url: str


class EpisodeLoadMatch(TypedDict, total=False):
    episode_id: str
    program: str
    id: str


class EpisodeListMatch(TypedDict, total=False):
    episode: list
    id: str
    program: str
    title: str
    total: int
    url: str


class GithubAnalytics(TypedDict):
    pass


class GithubAnalyticsLoadMatch(TypedDict):
    username: str


class GithubCard(TypedDict):
    pass


class GithubCardLoadMatch(TypedDict):
    username: str


class GithubLanguage(TypedDict):
    pass


class GithubLanguageLoadMatch(TypedDict):
    username: str


class Quote(TypedDict, total=False):
    id: int
    source: str
    text: str


class QuoteLoadMatch(TypedDict):
    id: int


class QuoteListMatch(TypedDict, total=False):
    id: int
    source: str
    text: str
