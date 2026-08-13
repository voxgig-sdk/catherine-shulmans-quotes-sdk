// Typed models for the CatherineShulmansQuotes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Api {
  api?: string
  author?: string
  disclaimer?: string
  endpoints?: Record<string, any>
  mirrors?: Record<string, any>
  programs?: any[]
  statistics?: Record<string, any>
}

export interface ApiListMatch {
  api?: string
  author?: string
  disclaimer?: string
  endpoints?: Record<string, any>
  mirrors?: Record<string, any>
  programs?: any[]
  statistics?: Record<string, any>
}

export interface Episode {
  episodes?: any[]
  id?: string
  program?: string
  title?: string
  total?: number
  url?: string
}

export interface EpisodeLoadMatch {
  episode_id?: string
  program?: string
  id?: string

  // Selects a custom action instead of the plain load:
  //   'random'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface EpisodeListMatch {
  episodes?: any[]
  id?: string
  program?: string
  title?: string
  total?: number
  url?: string
}

export interface GithubAnalytics {
}

export interface GithubAnalyticsLoadMatch {
  username: string
}

export interface GithubCard {
}

export interface GithubCardLoadMatch {
  username: string
}

export interface GithubLanguage {
}

export interface GithubLanguageLoadMatch {
  username: string
}

export interface Quote {
  id?: number
  source?: string
  text?: string
}

export interface QuoteLoadMatch {
  id: number

  // Selects a custom action instead of the plain load:
  //   'random'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface QuoteListMatch {
  id?: number
  source?: string
  text?: string
}

