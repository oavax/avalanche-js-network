/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */
import { BaseBlockTracker } from './baseTracker';
import { Messenger } from '../messenger/messenger';
export declare function timeout(duration: number, unref: any): Promise<unknown>;
export declare class PollingBlockTracker extends BaseBlockTracker {
    messenger: Messenger;
    _pollingInterval: number;
    _retryTimeout: number;
    _keepEventLoopActive: boolean;
    _setSkipCacheFlag: boolean;
    constructor(messenger: Messenger, opts?: {
        pollingInterval: any;
        retryTimeout: any;
        keepEventLoopActive: boolean;
        setSkipCacheFlag: boolean;
    });
    checkForLatestBlock(): Promise<any>;
    _start(): void;
    _performSync(): Promise<void>;
    _updateLatestBlock(): Promise<void>;
    _fetchLatestBlock(): Promise<any>;
}
