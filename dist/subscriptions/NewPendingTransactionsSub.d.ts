/**
 * @packageDocumentation
 * @module avalanche-network
 */
import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';
/**
 * ### Description:
 * Subscribes to incoming pending transactions
 */
export declare class NewPendingTransactions extends SubscriptionMethod {
    constructor(messenger: Messenger, shardID?: number);
}
