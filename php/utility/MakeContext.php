<?php
declare(strict_types=1);

// CatherineShulmansQuotes SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CatherineShulmansQuotesMakeContext
{
    public static function call(array $ctxmap, ?CatherineShulmansQuotesContext $basectx): CatherineShulmansQuotesContext
    {
        return new CatherineShulmansQuotesContext($ctxmap, $basectx);
    }
}
