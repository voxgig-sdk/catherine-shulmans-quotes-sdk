# CatherineShulmansQuotes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CatherineShulmansQuotesFeatures
  def self.make_feature(name)
    case name
    when "base"
      CatherineShulmansQuotesBaseFeature.new
    when "ratelimit"
      CatherineShulmansQuotesRatelimitFeature.new
    when "retry"
      CatherineShulmansQuotesRetryFeature.new
    when "test"
      CatherineShulmansQuotesTestFeature.new
    when "timeout"
      CatherineShulmansQuotesTimeoutFeature.new
    else
      CatherineShulmansQuotesBaseFeature.new
    end
  end
end
