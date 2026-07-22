# CatherineShulmansQuotes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CatherineShulmansQuotesFeatures
  def self.make_feature(name)
    case name
    when "base"
      CatherineShulmansQuotesBaseFeature.new
    when "test"
      CatherineShulmansQuotesTestFeature.new
    else
      CatherineShulmansQuotesBaseFeature.new
    end
  end
end
