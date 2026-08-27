<?php
declare(strict_types=1);

// Typed models for the CatherineShulmansQuotes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Api entity data model. */
class Api
{
    public ?string $api = null;
    public ?string $author = null;
    public ?string $disclaimer = null;
    public ?array $endpoints = null;
    public ?array $mirrors = null;
    public ?array $programs = null;
    public ?array $statistics = null;
}

/** Request payload for Api#list. */
class ApiListMatch
{
    public ?string $api = null;
    public ?string $author = null;
    public ?string $disclaimer = null;
    public ?array $endpoints = null;
    public ?array $mirrors = null;
    public ?array $programs = null;
    public ?array $statistics = null;
}

/** Episode entity data model. */
class Episode
{
    public ?array $episodes = null;
    public ?string $id = null;
    public ?string $program = null;
    public ?string $title = null;
    public ?int $total = null;
    public ?string $url = null;
}

/** Request payload for Episode#load. */
class EpisodeLoadMatch
{
    public string $id;
}

/** Request payload for Episode#list. */
class EpisodeListMatch
{
    public ?array $episodes = null;
    public ?string $id = null;
    public ?string $program = null;
    public ?string $title = null;
    public ?int $total = null;
    public ?string $url = null;
}

/** GithubAnalytics entity data model. */
class GithubAnalytics
{
}

/** Request payload for GithubAnalytics#load. */
class GithubAnalyticsLoadMatch
{
    public string $username;
}

/** GithubCard entity data model. */
class GithubCard
{
}

/** Request payload for GithubCard#load. */
class GithubCardLoadMatch
{
    public string $username;
    public ?string $style = null;
}

/** GithubLanguage entity data model. */
class GithubLanguage
{
}

/** Request payload for GithubLanguage#load. */
class GithubLanguageLoadMatch
{
    public string $username;
}

/** Quote entity data model. */
class Quote
{
    public ?int $id = null;
    public ?string $source = null;
    public ?string $text = null;
}

/** Request payload for Quote#load. */
class QuoteLoadMatch
{
    public int $id;
}

/** Request payload for Quote#list. */
class QuoteListMatch
{
    public ?int $id = null;
    public ?string $source = null;
    public ?string $text = null;
}

