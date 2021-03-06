/**
 * @packageDocumentation
 * @module avalanche-network
 */
import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';
export declare class LogSub extends SubscriptionMethod {
    constructor(options: any, messenger: Messenger, shardID?: number);
    preprocess(): Promise<this>;
    onNewSubscriptionItem(subscriptionItem: any): any;
}
