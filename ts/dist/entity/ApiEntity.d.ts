import { CatherineShulmansQuotesEntityBase } from '../CatherineShulmansQuotesEntityBase';
import type { CatherineShulmansQuotesSDK } from '../CatherineShulmansQuotesSDK';
import type { Control } from '../types';
import type { Api, ApiListMatch } from '../CatherineShulmansQuotesTypes';
declare class ApiEntity extends CatherineShulmansQuotesEntityBase<Api> {
    constructor(client: CatherineShulmansQuotesSDK, entopts: any);
    make(this: ApiEntity): ApiEntity;
    list(this: any, reqmatch?: ApiListMatch, ctrl?: Control): Promise<ApiEntity[]>;
}
export { ApiEntity };
