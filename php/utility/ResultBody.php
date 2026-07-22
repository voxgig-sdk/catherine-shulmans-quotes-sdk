<?php
declare(strict_types=1);

// CatherineShulmansQuotes SDK utility: result_body

class CatherineShulmansQuotesResultBody
{
    public static function call(CatherineShulmansQuotesContext $ctx): ?CatherineShulmansQuotesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
