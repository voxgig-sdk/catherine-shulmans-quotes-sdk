<?php
declare(strict_types=1);

// CatherineShulmansQuotes SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CatherineShulmansQuotesFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CatherineShulmansQuotesBaseFeature();
            case "test":
                return new CatherineShulmansQuotesTestFeature();
            default:
                return new CatherineShulmansQuotesBaseFeature();
        }
    }
}
