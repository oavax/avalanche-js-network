/**
 # avalanche-js-network

This package provides a collection of apis to create messengers (HTTP, WebSocket) to connect to blockchain networks.

## Installation

```
npm install avalanche-js-network
```

## Usage

```javascript
const { Messenger, HttpProvider, WSProvider } = require('avalanche-js-network');
const { ChainID, ChainType } = require('avalanche-js-utils');
const testnetHTTP = 'https://api.s0.b.hmny.io';
const testnetWS = 'wss://ws.s0.b.hmny.io';
const localHTTP = 'http://localhost:9500/';
const localWS = 'http://localhost:9800/';
const http = new HttpProvider(testnetHTTP); // for local use localHTTP
const ws = new WSProvider(testnetWS); // for local use testnetWS
const customHTTPMessenger = new Messenger(http, ChainType.Avalanche, ChainID.HmyTestnet); // for local ChainID.HmyLocal
const customWSMessenger = new Messenger(ws, ChainType.Avalanche, ChainID.HmyTestnet); // for local ChainID.HmyLocal
```
 *
 * @packageDocumentation
 * @module avalanche-network
 */
/**@ignore */
export declare enum RPCMethod {
    GetBlockByHash = "hmy_getBlockByHash",
    GetBlockByNumber = "hmy_getBlockByNumber",
    GetBlockTransactionCountByHash = "hmy_getBlockTransactionCountByHash",
    GetBlockTransactionCountByNumber = "hmy_getBlockTransactionCountByNumber",
    GetCode = "hmy_getCode",
    GetTransactionByBlockHashAndIndex = "hmy_getTransactionByBlockHashAndIndex",
    GetTransactionByBlockNumberAndIndex = "hmy_getTransactionByBlockNumberAndIndex",
    GetTransactionByHash = "hmy_getTransactionByHash",
    GetTransactionReceipt = "hmy_getTransactionReceipt",
    GetCXReceiptByHash = "hmy_getCXReceiptByHash",
    Syncing = "hmy_syncing",
    PeerCount = "net_peerCount",
    GetBalance = "hmy_getBalance",
    GetStorageAt = "hmy_getStorageAt",
    GetTransactionCount = "hmy_getTransactionCount",
    SendTransaction = "hmy_sendTransaction",
    SendRawTransaction = "hmy_sendRawTransaction",
    Subscribe = "hmy_subscribe",
    GetPastLogs = "hmy_getLogs",
    GetWork = "hmy_getWork",
    GetProof = "hmy_getProof",
    GetFilterChanges = "hmy_getFilterChanges",
    NewPendingTransactionFilter = "hmy_newPendingTransactionFilter",
    NewBlockFilter = "hmy_newBlockFilter",
    NewFilter = "hmy_newFilter",
    Call = "hmy_call",
    EstimateGas = "hmy_estimateGas",
    GasPrice = "hmy_gasPrice",
    BlockNumber = "hmy_blockNumber",
    UnSubscribe = "hmy_unsubscribe",
    NetVersion = "net_version",
    ProtocolVersion = "hmy_protocolVersion",
    GetShardingStructure = "hmy_getShardingStructure",
    SendRawStakingTransaction = "hmy_sendRawStakingTransaction",
    GetAccountNonce = "hmy_getAccountNonce"
}
/**@ignore */
export declare enum RPCErrorCode {
    RPC_INVALID_REQUEST = -32600,
    RPC_METHOD_NOT_FOUND = -32601,
    RPC_INVALID_PARAMS = -32602,
    RPC_INTERNAL_ERROR = -32603,
    RPC_PARSE_ERROR = -32700,
    RPC_MISC_ERROR = -1,
    RPC_TYPE_ERROR = -3,
    RPC_INVALID_ADDRESS_OR_KEY = -5,
    RPC_INVALID_PARAMETER = -8,
    RPC_DATABASE_ERROR = -20,
    RPC_DESERIALIZATION_ERROR = -22,
    RPC_VERIFY_ERROR = -25,
    RPC_VERIFY_REJECTED = -26,
    RPC_IN_WARMUP = -28,
    RPC_METHOD_DEPRECATED = -32
}
