/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */
import mitt from 'mitt';
import { BaseProvider } from './baseProvider';
export declare enum SocketConnection {
    READY = "ready",
    CONNECT = "connect",
    ERROR = "error",
    CLOSE = "close"
}
export declare enum SocketState {
    SOCKET_MESSAGE = "socket_message",
    SOCKET_READY = "socket_ready",
    SOCKET_CLOSE = "socket_close",
    SOCKET_ERROR = "socket_error",
    SOCKET_CONNECT = "socket_connect",
    SOCKET_NETWORK_CHANGED = "socket_networkChanged",
    SOCKET_ACCOUNTS_CHANGED = "socket_accountsChanged"
}
export declare enum EmittType {
    INSTANCE = "instance",
    PUBSUB = "pubsub"
}
declare class BaseSocket extends BaseProvider {
    url: string;
    emitter: mitt.Emitter;
    handlers: any;
    constructor(url: string);
    resetHandlers(): void;
    once(type: string, handler: mitt.Handler): void;
    addEventListener(type: string, handler: mitt.Handler): void;
    removeEventListener(type?: string, handler?: mitt.Handler): void;
    reset(): void;
    removeAllSocketListeners(): void;
    onReady(event: any): void;
    onError(error: any): void;
    onClose(error?: any): void;
}
export { BaseSocket };
