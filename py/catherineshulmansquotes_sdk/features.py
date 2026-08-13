# CatherineShulmansQuotes SDK feature factory

from catherineshulmansquotes_sdk.feature.base_feature import CatherineShulmansQuotesBaseFeature
from catherineshulmansquotes_sdk.feature.test_feature import CatherineShulmansQuotesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CatherineShulmansQuotesBaseFeature(),
        "test": lambda: CatherineShulmansQuotesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
