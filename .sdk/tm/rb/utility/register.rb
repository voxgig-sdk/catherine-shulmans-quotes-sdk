# CatherineShulmansQuotes SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CatherineShulmansQuotesUtility.registrar = ->(u) {
  u.clean = CatherineShulmansQuotesUtilities::Clean
  u.done = CatherineShulmansQuotesUtilities::Done
  u.make_error = CatherineShulmansQuotesUtilities::MakeError
  u.feature_add = CatherineShulmansQuotesUtilities::FeatureAdd
  u.feature_hook = CatherineShulmansQuotesUtilities::FeatureHook
  u.feature_init = CatherineShulmansQuotesUtilities::FeatureInit
  u.fetcher = CatherineShulmansQuotesUtilities::Fetcher
  u.make_fetch_def = CatherineShulmansQuotesUtilities::MakeFetchDef
  u.make_context = CatherineShulmansQuotesUtilities::MakeContext
  u.make_options = CatherineShulmansQuotesUtilities::MakeOptions
  u.make_request = CatherineShulmansQuotesUtilities::MakeRequest
  u.make_response = CatherineShulmansQuotesUtilities::MakeResponse
  u.make_result = CatherineShulmansQuotesUtilities::MakeResult
  u.make_point = CatherineShulmansQuotesUtilities::MakePoint
  u.make_spec = CatherineShulmansQuotesUtilities::MakeSpec
  u.make_url = CatherineShulmansQuotesUtilities::MakeUrl
  u.param = CatherineShulmansQuotesUtilities::Param
  u.prepare_auth = CatherineShulmansQuotesUtilities::PrepareAuth
  u.prepare_body = CatherineShulmansQuotesUtilities::PrepareBody
  u.prepare_headers = CatherineShulmansQuotesUtilities::PrepareHeaders
  u.prepare_method = CatherineShulmansQuotesUtilities::PrepareMethod
  u.prepare_params = CatherineShulmansQuotesUtilities::PrepareParams
  u.prepare_path = CatherineShulmansQuotesUtilities::PreparePath
  u.prepare_query = CatherineShulmansQuotesUtilities::PrepareQuery
  u.graphql_body = CatherineShulmansQuotesUtilities::GraphqlBody
  u.graphql_errors = CatherineShulmansQuotesUtilities::GraphqlErrors
  u.result_basic = CatherineShulmansQuotesUtilities::ResultBasic
  u.result_body = CatherineShulmansQuotesUtilities::ResultBody
  u.result_headers = CatherineShulmansQuotesUtilities::ResultHeaders
  u.transform_request = CatherineShulmansQuotesUtilities::TransformRequest
  u.transform_response = CatherineShulmansQuotesUtilities::TransformResponse
}
