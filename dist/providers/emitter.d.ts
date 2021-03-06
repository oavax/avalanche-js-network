/**
 * @packageDocumentation
 * @module avalanche-network
 */
import mitt from 'mitt';
declare class Emitter {
    handlers?: any;
    emitter: mitt.Emitter;
    off: (type: string, handler: mitt.Handler) => void;
    emit: (type: string, event?: any) => void;
    promise: Promise<{}>;
    resolve?: any;
    reject?: any;
    then?: any;
    constructor();
    resetHandlers(): void;
    on(type: string, handler: mitt.Handler): this;
    once(type: string, handler: mitt.Handler): void;
    addEventListener(type: string, handler: mitt.Handler): void;
    removeEventListener(type?: string, handler?: mitt.Handler): void;
    onError(error: any): void;
    onData(data: any): void;
    listenerCount(listenKey: any): number;
}
export { Emitter };
