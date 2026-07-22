<?php
declare(strict_types=1);

// CatherineShulmansQuotes SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CatherineShulmansQuotesUtility::setRegistrar(function (CatherineShulmansQuotesUtility $u): void {
    $u->clean = [CatherineShulmansQuotesClean::class, 'call'];
    $u->done = [CatherineShulmansQuotesDone::class, 'call'];
    $u->make_error = [CatherineShulmansQuotesMakeError::class, 'call'];
    $u->feature_add = [CatherineShulmansQuotesFeatureAdd::class, 'call'];
    $u->feature_hook = [CatherineShulmansQuotesFeatureHook::class, 'call'];
    $u->feature_init = [CatherineShulmansQuotesFeatureInit::class, 'call'];
    $u->fetcher = [CatherineShulmansQuotesFetcher::class, 'call'];
    $u->make_fetch_def = [CatherineShulmansQuotesMakeFetchDef::class, 'call'];
    $u->make_context = [CatherineShulmansQuotesMakeContext::class, 'call'];
    $u->make_options = [CatherineShulmansQuotesMakeOptions::class, 'call'];
    $u->make_request = [CatherineShulmansQuotesMakeRequest::class, 'call'];
    $u->make_response = [CatherineShulmansQuotesMakeResponse::class, 'call'];
    $u->make_result = [CatherineShulmansQuotesMakeResult::class, 'call'];
    $u->make_point = [CatherineShulmansQuotesMakePoint::class, 'call'];
    $u->make_spec = [CatherineShulmansQuotesMakeSpec::class, 'call'];
    $u->make_url = [CatherineShulmansQuotesMakeUrl::class, 'call'];
    $u->param = [CatherineShulmansQuotesParam::class, 'call'];
    $u->prepare_auth = [CatherineShulmansQuotesPrepareAuth::class, 'call'];
    $u->prepare_body = [CatherineShulmansQuotesPrepareBody::class, 'call'];
    $u->prepare_headers = [CatherineShulmansQuotesPrepareHeaders::class, 'call'];
    $u->prepare_method = [CatherineShulmansQuotesPrepareMethod::class, 'call'];
    $u->prepare_params = [CatherineShulmansQuotesPrepareParams::class, 'call'];
    $u->prepare_path = [CatherineShulmansQuotesPreparePath::class, 'call'];
    $u->prepare_query = [CatherineShulmansQuotesPrepareQuery::class, 'call'];
    $u->result_basic = [CatherineShulmansQuotesResultBasic::class, 'call'];
    $u->result_body = [CatherineShulmansQuotesResultBody::class, 'call'];
    $u->result_headers = [CatherineShulmansQuotesResultHeaders::class, 'call'];
    $u->transform_request = [CatherineShulmansQuotesTransformRequest::class, 'call'];
    $u->transform_response = [CatherineShulmansQuotesTransformResponse::class, 'call'];
});
