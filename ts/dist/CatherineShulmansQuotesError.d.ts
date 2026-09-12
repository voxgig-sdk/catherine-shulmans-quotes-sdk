import { Context } from './Context';
declare class CatherineShulmansQuotesError extends Error {
    isCatherineShulmansQuotesError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CatherineShulmansQuotesError };
