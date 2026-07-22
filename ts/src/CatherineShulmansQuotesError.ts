
import { Context } from './Context'


class CatherineShulmansQuotesError extends Error {

  isCatherineShulmansQuotesError = true

  sdk = 'CatherineShulmansQuotes'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CatherineShulmansQuotesError
}

