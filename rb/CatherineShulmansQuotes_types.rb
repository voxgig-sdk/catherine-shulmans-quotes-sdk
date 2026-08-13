# frozen_string_literal: true

# Typed models for the CatherineShulmansQuotes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Api entity data model.
#
# @!attribute [rw] api
#   @return [String, nil]
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] disclaimer
#   @return [String, nil]
#
# @!attribute [rw] endpoints
#   @return [Hash, nil]
#
# @!attribute [rw] mirrors
#   @return [Hash, nil]
#
# @!attribute [rw] programs
#   @return [Array, nil]
#
# @!attribute [rw] statistics
#   @return [Hash, nil]
Api = Struct.new(
  :api,
  :author,
  :disclaimer,
  :endpoints,
  :mirrors,
  :programs,
  :statistics,
  keyword_init: true
)

# Request payload for Api#list.
#
# @!attribute [rw] api
#   @return [String, nil]
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] disclaimer
#   @return [String, nil]
#
# @!attribute [rw] endpoints
#   @return [Hash, nil]
#
# @!attribute [rw] mirrors
#   @return [Hash, nil]
#
# @!attribute [rw] programs
#   @return [Array, nil]
#
# @!attribute [rw] statistics
#   @return [Hash, nil]
ApiListMatch = Struct.new(
  :api,
  :author,
  :disclaimer,
  :endpoints,
  :mirrors,
  :programs,
  :statistics,
  keyword_init: true
)

# Episode entity data model.
#
# @!attribute [rw] episodes
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] program
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Episode = Struct.new(
  :episodes,
  :id,
  :program,
  :title,
  :total,
  :url,
  keyword_init: true
)

# Request payload for Episode#load.
#
# @!attribute [rw] episode_id
#   @return [String, nil]
#
# @!attribute [rw] program
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
EpisodeLoadMatch = Struct.new(
  :episode_id,
  :program,
  :id,
  keyword_init: true
)

# Request payload for Episode#list.
#
# @!attribute [rw] episodes
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] program
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
EpisodeListMatch = Struct.new(
  :episodes,
  :id,
  :program,
  :title,
  :total,
  :url,
  keyword_init: true
)

# GithubAnalytics entity data model.
class GithubAnalytics
end

# Request payload for GithubAnalytics#load.
#
# @!attribute [rw] username
#   @return [String]
GithubAnalyticsLoadMatch = Struct.new(
  :username,
  keyword_init: true
)

# GithubCard entity data model.
class GithubCard
end

# Request payload for GithubCard#load.
#
# @!attribute [rw] username
#   @return [String]
GithubCardLoadMatch = Struct.new(
  :username,
  keyword_init: true
)

# GithubLanguage entity data model.
class GithubLanguage
end

# Request payload for GithubLanguage#load.
#
# @!attribute [rw] username
#   @return [String]
GithubLanguageLoadMatch = Struct.new(
  :username,
  keyword_init: true
)

# Quote entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
Quote = Struct.new(
  :id,
  :source,
  :text,
  keyword_init: true
)

# Request payload for Quote#load.
#
# @!attribute [rw] id
#   @return [Integer]
QuoteLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Quote#list.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
QuoteListMatch = Struct.new(
  :id,
  :source,
  :text,
  keyword_init: true
)

