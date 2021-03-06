/**
 * @packageDocumentation
 * @module avalanche-network
 */
import { Messenger } from '../messenger/messenger';
import { SubscriptionMethod } from './Subscription';
/**
 * ### Description:
 * Subscribes to incoming block headers. This can be used as timer to check for changes on the blockchain.
 */
export declare class NewHeaders extends SubscriptionMethod {
    constructor(messenger: Messenger, shardID?: number);
}
