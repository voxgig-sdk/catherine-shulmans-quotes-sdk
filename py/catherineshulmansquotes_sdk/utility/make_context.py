# CatherineShulmansQuotes SDK utility: make_context

from catherineshulmansquotes_sdk.core.context import CatherineShulmansQuotesContext


def make_context_util(ctxmap, basectx):
    return CatherineShulmansQuotesContext(ctxmap, basectx)
