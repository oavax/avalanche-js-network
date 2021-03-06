/**
 * @packageDocumentation
 * @module avalanche-network
 */
import { HttpProvider } from './http';
import { WSProvider } from './ws';
export declare enum ProviderType {
    http = "http",
    ws = "ws"
}
export declare class Provider {
    static getProvider(provider: string | HttpProvider | WSProvider): Provider;
    provider: WSProvider | HttpProvider;
    providerType: ProviderType;
    constructor(url: string | WSProvider | HttpProvider);
    private onInitSetProvider;
    private getType;
}
