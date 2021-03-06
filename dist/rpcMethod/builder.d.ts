/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */
import { RPCRequestPayload } from '../types';
import { RPCMethod } from './rpc';
/**
 * @class JsonRpc
 * @description json rpc instance
 * @return {JsonRpc} Json RPC instance
 */
declare class JsonRpc {
    messageId: number;
    constructor();
    /**
     * @function toPayload
     * @memberof JsonRpc.prototype
     * @description convert method and params to payload object
     * @param  {String} method - RPC method
     * @param  {Array<object>} params - params that send to RPC
     * @return {Object} payload object
     */
    toPayload: (method: RPCMethod | string, params: string | undefined | any[]) => RPCRequestPayload<any>;
}
export { JsonRpc };
