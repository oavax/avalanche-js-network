/**
 * @packageDocumentation
 * @module avalanche-network
 * @ignore
 */
export declare const DEFAULT_TIMEOUT: number;
export declare const DEFAULT_HEADERS: object;
export declare const performRPC: (request: any, handler: any, fetcher: any) => Promise<any>;
export declare function composeMiddleware(...fns: any[]): any;
