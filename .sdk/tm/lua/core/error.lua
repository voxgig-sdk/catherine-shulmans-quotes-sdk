-- CatherineShulmansQuotes SDK error

local CatherineShulmansQuotesError = {}
CatherineShulmansQuotesError.__index = CatherineShulmansQuotesError


function CatherineShulmansQuotesError.new(code, msg, ctx)
  local self = setmetatable({}, CatherineShulmansQuotesError)
  self.is_sdk_error = true
  self.sdk = "CatherineShulmansQuotes"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CatherineShulmansQuotesError:error()
  return self.msg
end


function CatherineShulmansQuotesError:__tostring()
  return self.msg
end


return CatherineShulmansQuotesError
