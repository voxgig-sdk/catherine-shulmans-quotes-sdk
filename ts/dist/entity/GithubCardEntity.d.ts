import { CatherineShulmansQuotesEntityBase } from '../CatherineShulmansQuotesEntityBase';
import type { CatherineShulmansQuotesSDK } from '../CatherineShulmansQuotesSDK';
import type { Control } from '../types';
import type { GithubCard, GithubCardLoadMatch } from '../CatherineShulmansQuotesTypes';
declare class GithubCardEntity extends CatherineShulmansQuotesEntityBase<GithubCard> {
    constructor(client: CatherineShulmansQuotesSDK, entopts: any);
    make(this: GithubCardEntity): GithubCardEntity;
    load(this: any, reqmatch?: GithubCardLoadMatch, ctrl?: Control): Promise<GithubCardEntity>;
}
export { GithubCardEntity };
