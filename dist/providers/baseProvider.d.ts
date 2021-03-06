/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */
import { ReqMiddleware, ResMiddleware, MiddlewareType } from '../types';
import { RPCMethod } from '../rpcMethod/rpc';
declare class BaseProvider {
    middlewares: {
        request: {
            use: (fn: ReqMiddleware, match?: string | RPCMethod | RegExp) => void;
        };
        response: {
            use: (fn: ResMiddleware, match?: string | RPCMethod | RegExp) => void;
        };
    };
    protected url: string;
    protected reqMiddleware: ReqMiddleware;
    protected resMiddleware: ResMiddleware;
    constructor(url: string, reqMiddleware?: ReqMiddleware, resMiddleware?: ResMiddleware);
    protected pushMiddleware(fn: any, type: MiddlewareType, match: string | RPCMethod | RegExp): void;
    protected getMiddleware(method: RPCMethod | string): [ReqMiddleware[], ResMiddleware[]];
}
export { BaseProvider };
