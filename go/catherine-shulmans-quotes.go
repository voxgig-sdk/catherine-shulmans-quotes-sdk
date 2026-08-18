package voxgigcatherineshulmansquotessdk

import (
	"github.com/voxgig-sdk/catherine-shulmans-quotes-sdk/go/core"
	"github.com/voxgig-sdk/catherine-shulmans-quotes-sdk/go/entity"
	"github.com/voxgig-sdk/catherine-shulmans-quotes-sdk/go/feature"
	_ "github.com/voxgig-sdk/catherine-shulmans-quotes-sdk/go/utility"
)

// Type aliases preserve external API.
type CatherineShulmansQuotesSDK = core.CatherineShulmansQuotesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CatherineShulmansQuotesEntity = core.CatherineShulmansQuotesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CatherineShulmansQuotesError = core.CatherineShulmansQuotesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewApiEntityFunc = func(client *core.CatherineShulmansQuotesSDK, entopts map[string]any) core.CatherineShulmansQuotesEntity {
		return entity.NewApiEntity(client, entopts)
	}
	core.NewEpisodeEntityFunc = func(client *core.CatherineShulmansQuotesSDK, entopts map[string]any) core.CatherineShulmansQuotesEntity {
		return entity.NewEpisodeEntity(client, entopts)
	}
	core.NewGithubAnalyticsEntityFunc = func(client *core.CatherineShulmansQuotesSDK, entopts map[string]any) core.CatherineShulmansQuotesEntity {
		return entity.NewGithubAnalyticsEntity(client, entopts)
	}
	core.NewGithubCardEntityFunc = func(client *core.CatherineShulmansQuotesSDK, entopts map[string]any) core.CatherineShulmansQuotesEntity {
		return entity.NewGithubCardEntity(client, entopts)
	}
	core.NewGithubLanguageEntityFunc = func(client *core.CatherineShulmansQuotesSDK, entopts map[string]any) core.CatherineShulmansQuotesEntity {
		return entity.NewGithubLanguageEntity(client, entopts)
	}
	core.NewQuoteEntityFunc = func(client *core.CatherineShulmansQuotesSDK, entopts map[string]any) core.CatherineShulmansQuotesEntity {
		return entity.NewQuoteEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCatherineShulmansQuotesSDK = core.NewCatherineShulmansQuotesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCatherineShulmansQuotesSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *CatherineShulmansQuotesSDK  { return NewCatherineShulmansQuotesSDK(nil) }
func Test() *CatherineShulmansQuotesSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
