import { CatherineShulmansQuotesEntityBase } from '../CatherineShulmansQuotesEntityBase';
import type { CatherineShulmansQuotesSDK } from '../CatherineShulmansQuotesSDK';
import type { Control } from '../types';
import type { GithubAnalytics, GithubAnalyticsLoadMatch } from '../CatherineShulmansQuotesTypes';
declare class GithubAnalyticsEntity extends CatherineShulmansQuotesEntityBase<GithubAnalytics> {
    constructor(client: CatherineShulmansQuotesSDK, entopts: any);
    make(this: GithubAnalyticsEntity): GithubAnalyticsEntity;
    load(this: any, reqmatch?: GithubAnalyticsLoadMatch, ctrl?: Control): Promise<GithubAnalyticsEntity>;
}
export { GithubAnalyticsEntity };
