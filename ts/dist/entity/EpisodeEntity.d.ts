import { CatherineShulmansQuotesEntityBase } from '../CatherineShulmansQuotesEntityBase';
import type { CatherineShulmansQuotesSDK } from '../CatherineShulmansQuotesSDK';
import type { Control } from '../types';
import type { Episode, EpisodeLoadMatch, EpisodeListMatch } from '../CatherineShulmansQuotesTypes';
declare class EpisodeEntity extends CatherineShulmansQuotesEntityBase<Episode> {
    constructor(client: CatherineShulmansQuotesSDK, entopts: any);
    make(this: EpisodeEntity): EpisodeEntity;
    load(this: any, reqmatch?: EpisodeLoadMatch, ctrl?: Control): Promise<EpisodeEntity>;
    list(this: any, reqmatch?: EpisodeListMatch, ctrl?: Control): Promise<EpisodeEntity[]>;
}
export { EpisodeEntity };
