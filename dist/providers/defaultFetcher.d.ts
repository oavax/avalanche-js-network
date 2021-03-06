/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */
import { RPCRequest, RPCError, RPCResult } from '../types';
export declare const fetchRPC: {
    requestHandler: (request: RPCRequest<any[]>, headers: any) => Promise<Response>;
    responseHandler: (response: Response, request: RPCRequest<any>, handler: any) => Promise<{
        req: RPCRequest<any>;
        result: RPCResult;
        error: RPCError;
        jsonrpc: string;
        id: string;
    }>;
};
