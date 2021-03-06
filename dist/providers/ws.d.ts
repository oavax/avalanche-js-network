/**
 * @packageDocumentation
 * @module avalanche-network
 */
import { w3cwebsocket as W3CWebsocket } from 'websocket';
import { BaseSocket } from './baseSocket';
import { JsonRpc } from '../rpcMethod/builder';
import { RPCRequestPayload } from '../types';
declare class WSProvider extends BaseSocket {
    get connected(): boolean;
    url: string;
    subscriptions: any;
    options: any;
    connection: W3CWebsocket | WebSocket;
    jsonRpc: JsonRpc;
    constructor(url: string, options?: any);
    on(type: string, handler: mitt.Handler): this;
    onData(handler: any): this;
    onError(event: any): void;
    onClose(closeEvent: any): void;
    createWebsocketProvider(url: string, options?: any): any;
    reconnect(): void;
    isConnecting(): boolean;
    send(payload: RPCRequestPayload<object>): Promise<any>;
    subscribe(payload: RPCRequestPayload<any[]>): Promise<any>;
    unsubscribe(payload: RPCRequestPayload<any[]>): Promise<any>;
    clearSubscriptions(unsubscribeMethod: string): Promise<boolean>;
    registerEventListeners(): void;
    onMessage(msg: MessageEvent): void;
    onConnect(): Promise<void>;
    getSubscriptionEvent(subscriptionId: any): any;
    hasSubscription(subscriptionId: string): boolean;
    validate(response: any, payload?: any): true | Error;
}
export { WSProvider };
