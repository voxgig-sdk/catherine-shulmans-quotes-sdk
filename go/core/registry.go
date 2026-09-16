package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewApiEntityFunc func(client *CatherineShulmansQuotesSDK, entopts map[string]any) CatherineShulmansQuotesEntity

var NewEpisodeEntityFunc func(client *CatherineShulmansQuotesSDK, entopts map[string]any) CatherineShulmansQuotesEntity

var NewGithubAnalyticsEntityFunc func(client *CatherineShulmansQuotesSDK, entopts map[string]any) CatherineShulmansQuotesEntity

var NewGithubCardEntityFunc func(client *CatherineShulmansQuotesSDK, entopts map[string]any) CatherineShulmansQuotesEntity

var NewGithubLanguageEntityFunc func(client *CatherineShulmansQuotesSDK, entopts map[string]any) CatherineShulmansQuotesEntity

var NewQuoteEntityFunc func(client *CatherineShulmansQuotesSDK, entopts map[string]any) CatherineShulmansQuotesEntity

