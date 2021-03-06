/**
 * @packageDocumentation
 * @module avalanche-network
 */
import { Messenger } from '../messenger/messenger';
import { WSProvider } from '../providers/ws';
import { RPCRequestPayload } from '../types';
export declare class SubscriptionMethod extends WSProvider {
    param: any;
    options: any;
    shardID: number;
    messenger: Messenger;
    subscriptionId: any;
    constructor(param: any, options: any, messenger: Messenger, shardID?: number);
    constructPayload(method: string, param: any, options?: any): RPCRequestPayload<any>;
    start(): Promise<this>;
    unsubscribe(): Promise<any>;
    onNewSubscriptionItem(subscriptionItem: any): any;
}
