# CatherineShulmansQuotes SDK utility: make_context
require_relative '../core/context'
module CatherineShulmansQuotesUtilities
  MakeContext = ->(ctxmap, basectx) {
    CatherineShulmansQuotesContext.new(ctxmap, basectx)
  }
end
