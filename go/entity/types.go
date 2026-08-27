// Typed models for the CatherineShulmansQuotes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/catherine-shulmans-quotes-sdk/go/core"
)

// Api is the typed data model for the api entity.
type Api struct {
	Api *string `json:"api,omitempty"`
	Author *string `json:"author,omitempty"`
	Disclaimer *string `json:"disclaimer,omitempty"`
	Endpoints *map[string]any `json:"endpoints,omitempty"`
	Mirrors *map[string]any `json:"mirrors,omitempty"`
	Programs *[]any `json:"programs,omitempty"`
	Statistics *map[string]any `json:"statistics,omitempty"`
}

// ApiListMatch is the typed request payload for Api.ListTyped.
type ApiListMatch struct {
	Api *string `json:"api,omitempty"`
	Author *string `json:"author,omitempty"`
	Disclaimer *string `json:"disclaimer,omitempty"`
	Endpoints *map[string]any `json:"endpoints,omitempty"`
	Mirrors *map[string]any `json:"mirrors,omitempty"`
	Programs *[]any `json:"programs,omitempty"`
	Statistics *map[string]any `json:"statistics,omitempty"`
}

// Episode is the typed data model for the episode entity.
type Episode struct {
	Episodes *[]any `json:"episodes,omitempty"`
	Id *string `json:"id,omitempty"`
	Program *string `json:"program,omitempty"`
	Title *string `json:"title,omitempty"`
	Total *int `json:"total,omitempty"`
	Url *string `json:"url,omitempty"`
}

// EpisodeLoadMatch is the typed request payload for Episode.LoadTyped.
type EpisodeLoadMatch struct {
	Id string `json:"id"`
}

// EpisodeListMatch is the typed request payload for Episode.ListTyped.
type EpisodeListMatch struct {
	Episodes *[]any `json:"episodes,omitempty"`
	Id *string `json:"id,omitempty"`
	Program *string `json:"program,omitempty"`
	Title *string `json:"title,omitempty"`
	Total *int `json:"total,omitempty"`
	Url *string `json:"url,omitempty"`
}

// GithubAnalytics is the typed data model for the github_analytics entity.
type GithubAnalytics struct {
}

// GithubAnalyticsLoadMatch is the typed request payload for GithubAnalytics.LoadTyped.
type GithubAnalyticsLoadMatch struct {
	Username string `json:"username"`
}

// GithubCard is the typed data model for the github_card entity.
type GithubCard struct {
}

// GithubCardLoadMatch is the typed request payload for GithubCard.LoadTyped.
type GithubCardLoadMatch struct {
	Username string `json:"username"`
	Style *string `json:"style,omitempty"`
}

// GithubLanguage is the typed data model for the github_language entity.
type GithubLanguage struct {
}

// GithubLanguageLoadMatch is the typed request payload for GithubLanguage.LoadTyped.
type GithubLanguageLoadMatch struct {
	Username string `json:"username"`
}

// Quote is the typed data model for the quote entity.
type Quote struct {
	Id *int `json:"id,omitempty"`
	Source *string `json:"source,omitempty"`
	Text *string `json:"text,omitempty"`
}

// QuoteLoadMatch is the typed request payload for Quote.LoadTyped.
type QuoteLoadMatch struct {
	Id int `json:"id"`
}

// QuoteListMatch is the typed request payload for Quote.ListTyped.
type QuoteListMatch struct {
	Id *int `json:"id,omitempty"`
	Source *string `json:"source,omitempty"`
	Text *string `json:"text,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
