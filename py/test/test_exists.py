# ProjectName SDK exists test

import pytest
from catherineshulmansquotes_sdk import CatherineShulmansQuotesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CatherineShulmansQuotesSDK.test(None, None)
        assert testsdk is not None
