<?php
declare(strict_types=1);

// CatherineShulmansQuotes SDK exists test

require_once __DIR__ . '/../catherineshulmansquotes_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CatherineShulmansQuotesSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
