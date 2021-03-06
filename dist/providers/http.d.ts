/**
 * @packageDocumentation
 * @module avalanche-network
 */
import { BaseProvider } from './baseProvider';
import { RPCRequestPayload } from '../types';
declare class HttpProvider extends BaseProvider {
    url: string;
    fetcher?: any;
    options?: any;
    constructor(url: string, options?: any, fetcher?: any);
    /**
     * @function send
     * @memberof HttpProvider.prototype
     * @param  {Object} payload  - payload object
     * @param  {Function} callback - callback function
     * @return {any} - RPC Response
     */
    send(payload: RPCRequestPayload<object>, callback?: any): Promise<any>;
    /**
     * @function sendServer
     * @memberof HttpProvider.prototype
     * @param  {String} endpoint - endpoint to server
     * @param  {Object} payload  - payload object
     * @param  {Function} callback - callback function
     * @return {Function} - RPC Response
     */
    sendServer(endpoint: string, payload: RPCRequestPayload<object>, callback: any): Promise<any>;
    requestFunc({ endpoint, payload, callback, }: {
        endpoint?: string;
        payload: RPCRequestPayload<object>;
        callback?: any;
    }): Promise<any>;
    /**
     * @function payloadHandler
     * @memberof HttpProvider.prototype
     * @param  {Object} payload - payload object
     * @return {Object} - to payload object
     */
    payloadHandler(payload: RPCRequestPayload<object>): object;
    /**
     * @function endpointHandler
     * @memberof HttpProvider.prototype
     * @param  {Object} obj      - payload object
     * @param  {String} endpoint - add the endpoint to payload object
     * @return {Object} - assign a new object
     */
    endpointHandler(obj: object, endpoint?: string): object;
    /**
     * @function optionsHandler
     * @memberof HttpProvider.prototype
     * @param  {object} obj - options object
     * @return {object} - assign a new option object
     */
    optionsHandler(obj: object): object;
    /**
     * @function callbackHandler
     * @memberof HttpProvider.prototype
     * @param  {Object} data - from server
     * @param  {Function} cb   - callback function
     * @return {Object|Function} - return object or callback function
     */
    callbackHandler(data: any, cb: any): any;
    subscribe(): void;
    unsubscribe(): void;
}
export { HttpProvider };
