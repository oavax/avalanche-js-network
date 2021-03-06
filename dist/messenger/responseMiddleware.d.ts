/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */
import { RPCResponseBody } from '../types';
/**
 * @class ResponseMiddleware
 * @description Response middleware of RPC
 * @param  {Object}  ResponseBody - response from rpc
 * @return {ResponseMiddleware} response middleware instance
 */
declare class ResponseMiddleware {
    result: any;
    error: any;
    raw: any;
    responseType: string;
    constructor(ResponseBody: RPCResponseBody<any, any>);
    get getResult(): any;
    get getError(): any;
    get getRaw(): any;
    getResponseType(): string;
    isError(): boolean;
    isResult(): boolean;
    isRaw(): boolean;
}
export { ResponseMiddleware };
