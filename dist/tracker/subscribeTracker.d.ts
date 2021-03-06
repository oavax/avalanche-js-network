/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */
import { Messenger } from '../messenger/messenger';
import { BaseBlockTracker } from './baseTracker';
export declare class SubscribeBlockTracker extends BaseBlockTracker {
    messenger: Messenger;
    subscriptionId: any;
    constructor(messenger: Messenger, opts?: {});
    checkForLatestBlock(): Promise<any>;
    _start(): Promise<void>;
    _end(): Promise<void>;
    _handleSubData(data: any): void;
}
