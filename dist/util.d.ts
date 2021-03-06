/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */
import { ResponseMiddleware } from './messenger/responseMiddleware';
/**
 * @function getResultForData
 * @description get result for data by default
 * @param  {any} data - object get from provider
 * @return {any} data result or data
 */
export declare function getResultForData(data: any): any;
export declare function getRawForData(data: any): any;
export declare function onResponse(response: ResponseMiddleware): any;
