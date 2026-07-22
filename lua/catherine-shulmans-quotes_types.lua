-- Typed models for the CatherineShulmansQuotes SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Api
---@field api? string
---@field author? string
---@field disclaimer? string
---@field endpoint? table
---@field mirror? table
---@field program? table
---@field statistic? table

---@class ApiListMatch
---@field api? string
---@field author? string
---@field disclaimer? string
---@field endpoint? table
---@field mirror? table
---@field program? table
---@field statistic? table

---@class Episode
---@field episode? table
---@field id? string
---@field program? string
---@field title? string
---@field total? number
---@field url? string

---@class EpisodeLoadMatch
---@field episode_id? string
---@field program? string
---@field id? string

---@class EpisodeListMatch
---@field episode? table
---@field id? string
---@field program? string
---@field title? string
---@field total? number
---@field url? string

---@class GithubAnalytics

---@class GithubAnalyticsLoadMatch
---@field username string

---@class GithubCard

---@class GithubCardLoadMatch
---@field username string

---@class GithubLanguage

---@class GithubLanguageLoadMatch
---@field username string

---@class Quote
---@field id? number
---@field source? string
---@field text? string

---@class QuoteLoadMatch
---@field id number

---@class QuoteListMatch
---@field id? number
---@field source? string
---@field text? string

local M = {}

return M
