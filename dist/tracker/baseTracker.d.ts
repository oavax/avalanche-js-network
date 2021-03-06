/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */
import { Emitter } from '../providers/emitter';
export declare class BaseBlockTracker extends Emitter {
    _blockResetDuration?: number;
    _blockResetTimeout: any;
    _currentBlock: any;
    _isRunning: boolean;
    constructor(opts?: any);
    isRunning(): boolean;
    getCurrentBlock(): any;
    getLatestBlock(): Promise<any>;
    removeAllListeners(eventName: string): void;
    _start(): void;
    _end(): void;
    _setupInternalEvents(): void;
    _onNewListener(eventName: string, handler?: mitt.Handler): void;
    _onRemoveListener(eventName: string, handler?: mitt.Handler): void;
    _maybeStart(): void;
    _maybeEnd(): void;
    _getBlockTrackerEventCount(): number;
    _newPotentialLatest(newBlock: string): void;
    _setCurrentBlock(newBlock: string): void;
    _setupBlockResetTimeout(): void;
    _cancelBlockResetTimeout(): void;
    _resetCurrentBlock(): void;
}
