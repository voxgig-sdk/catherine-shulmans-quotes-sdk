import { ApiEntity } from './entity/ApiEntity';
import { EpisodeEntity } from './entity/EpisodeEntity';
import { GithubAnalyticsEntity } from './entity/GithubAnalyticsEntity';
import { GithubCardEntity } from './entity/GithubCardEntity';
import { GithubLanguageEntity } from './entity/GithubLanguageEntity';
import { QuoteEntity } from './entity/QuoteEntity';
export type * from './CatherineShulmansQuotesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CatherineShulmansQuotesEntityBase } from './CatherineShulmansQuotesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CatherineShulmansQuotesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Api(entopts?: Record<string, any>): ApiEntity;
    Episode(entopts?: Record<string, any>): EpisodeEntity;
    GithubAnalytics(entopts?: Record<string, any>): GithubAnalyticsEntity;
    GithubCard(entopts?: Record<string, any>): GithubCardEntity;
    GithubLanguage(entopts?: Record<string, any>): GithubLanguageEntity;
    Quote(entopts?: Record<string, any>): QuoteEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CatherineShulmansQuotesSDK;
    tester(testopts?: any, sdkopts?: any): CatherineShulmansQuotesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CatherineShulmansQuotesSDK;
export { stdutil, config, BaseFeature, CatherineShulmansQuotesEntityBase, CatherineShulmansQuotesSDK, SDK, };
