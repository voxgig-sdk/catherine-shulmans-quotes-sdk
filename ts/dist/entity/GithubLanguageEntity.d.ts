import { CatherineShulmansQuotesEntityBase } from '../CatherineShulmansQuotesEntityBase';
import type { CatherineShulmansQuotesSDK } from '../CatherineShulmansQuotesSDK';
import type { Control } from '../types';
import type { GithubLanguage, GithubLanguageLoadMatch } from '../CatherineShulmansQuotesTypes';
declare class GithubLanguageEntity extends CatherineShulmansQuotesEntityBase<GithubLanguage> {
    constructor(client: CatherineShulmansQuotesSDK, entopts: any);
    make(this: GithubLanguageEntity): GithubLanguageEntity;
    load(this: any, reqmatch?: GithubLanguageLoadMatch, ctrl?: Control): Promise<GithubLanguageEntity>;
}
export { GithubLanguageEntity };
