<?php
declare(strict_types=1);

// CatherineShulmansQuotes SDK utility: prepare_body

class CatherineShulmansQuotesPrepareBody
{
    public static function call(CatherineShulmansQuotesContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
