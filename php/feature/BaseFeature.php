<?php
declare(strict_types=1);

// CatherineShulmansQuotes SDK base feature

class CatherineShulmansQuotesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CatherineShulmansQuotesContext $ctx, array $options): void {}
    public function PostConstruct(CatherineShulmansQuotesContext $ctx): void {}
    public function PostConstructEntity(CatherineShulmansQuotesContext $ctx): void {}
    public function SetData(CatherineShulmansQuotesContext $ctx): void {}
    public function GetData(CatherineShulmansQuotesContext $ctx): void {}
    public function GetMatch(CatherineShulmansQuotesContext $ctx): void {}
    public function SetMatch(CatherineShulmansQuotesContext $ctx): void {}
    public function PrePoint(CatherineShulmansQuotesContext $ctx): void {}
    public function PreSpec(CatherineShulmansQuotesContext $ctx): void {}
    public function PreRequest(CatherineShulmansQuotesContext $ctx): void {}
    public function PreResponse(CatherineShulmansQuotesContext $ctx): void {}
    public function PreResult(CatherineShulmansQuotesContext $ctx): void {}
    public function PreDone(CatherineShulmansQuotesContext $ctx): void {}
    public function PreUnexpected(CatherineShulmansQuotesContext $ctx): void {}
}
