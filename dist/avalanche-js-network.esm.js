import mitt from 'mitt';
export { default as mitt } from 'mitt';
import { isWs, isObject, isArray, isHttp, defaultConfig, AvalancheCore, isString, ChainType, isHex, hexToNumber } from 'avalanche-js-utils';
import fetch from 'cross-fetch';
import _regeneratorRuntime from 'regenerator-runtime';
import { w3cwebsocket } from 'websocket';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * @packageDocumentation
 * @module avalanche-network
 * @ignore
 */
var MiddlewareType;

(function (MiddlewareType) {
  MiddlewareType[MiddlewareType["REQ"] = 0] = "REQ";
  MiddlewareType[MiddlewareType["RES"] = 1] = "RES";
})(MiddlewareType || (MiddlewareType = {}));

var SubscribeReturns;

(function (SubscribeReturns) {
  SubscribeReturns["all"] = "all";
  SubscribeReturns["id"] = "id";
  SubscribeReturns["method"] = "method";
})(SubscribeReturns || (SubscribeReturns = {}));

var BaseProvider = /*#__PURE__*/function () {
  function BaseProvider(url, reqMiddleware, resMiddleware) {
    var _this = this;

    if (reqMiddleware === void 0) {
      reqMiddleware = new Map();
    }

    if (resMiddleware === void 0) {
      resMiddleware = new Map();
    }

    this.middlewares = {
      request: {
        use: function use(fn, match) {
          if (match === void 0) {
            match = '*';
          }

          _this.pushMiddleware(fn, MiddlewareType.REQ, match);
        }
      },
      response: {
        use: function use(fn, match) {
          if (match === void 0) {
            match = '*';
          }

          _this.pushMiddleware(fn, MiddlewareType.RES, match);
        }
      }
    };
    this.reqMiddleware = new Map().set('*', []);
    this.resMiddleware = new Map().set('*', []);
    this.reqMiddleware = reqMiddleware;
    this.resMiddleware = resMiddleware;
    this.url = url;
  }

  var _proto = BaseProvider.prototype;

  _proto.pushMiddleware = function pushMiddleware(fn, type, match) {
    if (type !== MiddlewareType.REQ && type !== MiddlewareType.RES) {
      throw new Error('Please specify the type of middleware being added');
    }

    if (type === MiddlewareType.REQ) {
      var current = this.reqMiddleware.get(match) || [];
      this.reqMiddleware.set(match, [].concat(current, [fn]));
    } else {
      var _current = this.resMiddleware.get(match) || [];

      this.resMiddleware.set(match, [].concat(_current, [fn]));
    }
  };

  _proto.getMiddleware = function getMiddleware(method) {
    var requests = [];
    var responses = [];

    for (var _iterator = _createForOfIteratorHelperLoose(this.reqMiddleware.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          key = _step$value[0],
          transformers = _step$value[1];

      if (typeof key === 'string' && key !== '*' && key === method) {
        requests.push.apply(requests, transformers);
      }

      if (key instanceof RegExp && key.test(method)) {
        requests.push.apply(requests, transformers);
      }

      if (key === '*') {
        requests.push.apply(requests, transformers);
      }
    }

    for (var _iterator2 = _createForOfIteratorHelperLoose(this.resMiddleware.entries()), _step2; !(_step2 = _iterator2()).done;) {
      var _step2$value = _step2.value,
          _key = _step2$value[0],
          _transformers = _step2$value[1];

      if (typeof _key === 'string' && _key !== '*' && _key === method) {
        responses.push.apply(responses, _transformers);
      }

      if (_key instanceof RegExp && _key.test(method)) {
        responses.push.apply(responses, _transformers);
      }

      if (_key === '*') {
        responses.push.apply(responses, _transformers);
      }
    }

    return [requests, responses];
  };

  return BaseProvider;
}();

var SocketConnection;

(function (SocketConnection) {
  SocketConnection["READY"] = "ready";
  SocketConnection["CONNECT"] = "connect";
  SocketConnection["ERROR"] = "error";
  SocketConnection["CLOSE"] = "close";
})(SocketConnection || (SocketConnection = {}));

var SocketState;

(function (SocketState) {
  SocketState["SOCKET_MESSAGE"] = "socket_message";
  SocketState["SOCKET_READY"] = "socket_ready";
  SocketState["SOCKET_CLOSE"] = "socket_close";
  SocketState["SOCKET_ERROR"] = "socket_error";
  SocketState["SOCKET_CONNECT"] = "socket_connect";
  SocketState["SOCKET_NETWORK_CHANGED"] = "socket_networkChanged";
  SocketState["SOCKET_ACCOUNTS_CHANGED"] = "socket_accountsChanged";
})(SocketState || (SocketState = {}));

var EmittType;

(function (EmittType) {
  EmittType["INSTANCE"] = "instance";
  EmittType["PUBSUB"] = "pubsub";
})(EmittType || (EmittType = {}));

var BaseSocket = /*#__PURE__*/function (_BaseProvider) {
  _inheritsLoose(BaseSocket, _BaseProvider);

  function BaseSocket(url) {
    var _this;

    _this = _BaseProvider.call(this, url) || this;
    _this.handlers = {};

    if (!isWs(url)) {
      throw new Error(url + " is not websocket");
    }

    _this.url = url;
    _this.emitter = mitt(_this.handlers);
    return _this;
  }

  var _proto = BaseSocket.prototype;

  _proto.resetHandlers = function resetHandlers() {
    // tslint:disable-next-line: forin
    for (var i in this.handlers) {
      delete this.handlers[i];
    }
  };

  _proto.once = function once(type, handler) {
    this.emitter.on(type, handler);
    this.removeEventListener(type);
  };

  _proto.addEventListener = function addEventListener(type, handler) {
    this.emitter.on(type, handler);
  };

  _proto.removeEventListener = function removeEventListener(type, handler) {
    if (!type) {
      this.handlers = {};
      return;
    }

    if (!handler) {
      delete this.handlers[type];
    } else {
      return this.emitter.off(type, handler);
    }
  };

  _proto.reset = function reset() {
    this.removeEventListener('*'); // this.registerEventListeners();
  };

  _proto.removeAllSocketListeners = function removeAllSocketListeners() {
    this.removeEventListener(SocketState.SOCKET_MESSAGE);
    this.removeEventListener(SocketState.SOCKET_READY);
    this.removeEventListener(SocketState.SOCKET_CLOSE);
    this.removeEventListener(SocketState.SOCKET_ERROR);
    this.removeEventListener(SocketState.SOCKET_CONNECT);
  };

  _proto.onReady = function onReady(event) {
    this.emitter.emit(SocketConnection.READY, event);
    this.emitter.emit(SocketState.SOCKET_READY, event);
  };

  _proto.onError = function onError(error) {
    this.emitter.emit(SocketConnection.ERROR, error);
    this.emitter.emit(SocketState.SOCKET_ERROR, error);
    this.removeAllSocketListeners();
    this.removeEventListener('*');
  };

  _proto.onClose = function onClose(error) {
    if (error === void 0) {
      error = null;
    }

    this.emitter.emit(SocketConnection.CLOSE, error);
    this.emitter.emit(SocketState.SOCKET_CLOSE, error);
    this.removeAllSocketListeners();
    this.removeEventListener('*');
  };

  return BaseSocket;
}(BaseProvider);

var fetchRPC = {
  requestHandler: function requestHandler(request, headers) {
    return fetch(request.url, {
      method: request.options && request.options.method ? request.options.method : 'POST',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(request.payload),
      headers: _extends({}, headers, request.options && request.options.headers ? request.options.headers : {})
    });
  },
  responseHandler: function responseHandler(response, request, handler) {
    return response.json().then(function (body) {
      return _extends({}, body, {
        req: request
      });
    }).then(handler);
  }
};

/**
 * @packageDocumentation
 * @module avalanche-network
 * @ignore
 */
var DEFAULT_TIMEOUT = 120000;
var DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

function _fetch(fetchPromise, timeout) {
  var abortFn;
  var abortPromise = new Promise(function (resolve, reject) {
    abortFn = function abortFn() {
      return reject(new Error("request Timeout in " + timeout + " ms"));
    };
  });
  var abortablePromise = Promise.race([fetchPromise, abortPromise]);
  setTimeout(function () {
    abortFn();
  }, timeout);
  return abortablePromise;
}

var performRPC = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(request, handler, fetcher) {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _fetch(fetcher.requestHandler(request, DEFAULT_HEADERS), request.options && request.options.timeout ? request.options.timeout : DEFAULT_TIMEOUT);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", fetcher.responseHandler(response, request, handler));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function performRPC(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
function composeMiddleware() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  if (fns.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return fns.reduce(function (a, b) {
    return function (arg) {
      return a(b(arg));
    };
  });
}

/** @hidden */

var defaultOptions = {
  method: 'POST',
  timeout: DEFAULT_TIMEOUT,
  headers: DEFAULT_HEADERS,
  user: null,
  password: null
};

var HttpProvider = /*#__PURE__*/function (_BaseProvider) {
  _inheritsLoose(HttpProvider, _BaseProvider);

  function HttpProvider(url, options, fetcher) {
    var _this;

    _this = _BaseProvider.call(this, url) || this;
    _this.url = url || 'http://localhost:9500';
    _this.fetcher = fetcher || fetchRPC;

    if (options) {
      _this.options = {
        method: options.method || defaultOptions.method,
        timeout: options.timeout || defaultOptions.timeout,
        user: options.user || defaultOptions.user,
        password: options.password || defaultOptions.password,
        headers: options.headers || defaultOptions.headers
      };
    } else {
      _this.options = defaultOptions;
    }

    return _this;
  }
  /**
   * @function send
   * @memberof HttpProvider.prototype
   * @param  {Object} payload  - payload object
   * @param  {Function} callback - callback function
   * @return {any} - RPC Response
   */


  var _proto = HttpProvider.prototype;

  _proto.send = function send(payload, callback) {
    return this.requestFunc({
      payload: payload,
      callback: callback
    });
  }
  /**
   * @function sendServer
   * @memberof HttpProvider.prototype
   * @param  {String} endpoint - endpoint to server
   * @param  {Object} payload  - payload object
   * @param  {Function} callback - callback function
   * @return {Function} - RPC Response
   */
  ;

  _proto.sendServer = function sendServer(endpoint, payload, callback) {
    return this.requestFunc({
      endpoint: endpoint,
      payload: payload,
      callback: callback
    });
  };

  _proto.requestFunc = function requestFunc(_ref) {
    var _this2 = this;

    var endpoint = _ref.endpoint,
        payload = _ref.payload,
        callback = _ref.callback;

    var _this$getMiddleware = this.getMiddleware(payload.method),
        tReq = _this$getMiddleware[0],
        tRes = _this$getMiddleware[1];

    var reqMiddleware = composeMiddleware.apply(void 0, tReq.concat([function (obj) {
      return _this2.optionsHandler(obj);
    }, function (obj) {
      return _this2.endpointHandler(obj, endpoint);
    }, this.payloadHandler]));
    var resMiddleware = composeMiddleware.apply(void 0, [function (data) {
      return _this2.callbackHandler(data, callback);
    }].concat(tRes));
    var req = reqMiddleware(payload);
    return performRPC(req, resMiddleware, this.fetcher);
  }
  /**
   * @function payloadHandler
   * @memberof HttpProvider.prototype
   * @param  {Object} payload - payload object
   * @return {Object} - to payload object
   */
  ;

  _proto.payloadHandler = function payloadHandler(payload) {
    return {
      payload: payload
    };
  }
  /**
   * @function endpointHandler
   * @memberof HttpProvider.prototype
   * @param  {Object} obj      - payload object
   * @param  {String} endpoint - add the endpoint to payload object
   * @return {Object} - assign a new object
   */
  ;

  _proto.endpointHandler = function endpointHandler(obj, endpoint) {
    return _extends({}, obj, {
      url: endpoint !== null && endpoint !== undefined ? "" + this.url + endpoint : this.url
    });
  }
  /**
   * @function optionsHandler
   * @memberof HttpProvider.prototype
   * @param  {object} obj - options object
   * @return {object} - assign a new option object
   */
  ;

  _proto.optionsHandler = function optionsHandler(obj) {
    if (this.options.user && this.options.password) {
      var AUTH_TOKEN = "Basic " + Buffer.from(this.options.user + ":" + this.options.password).toString('base64');
      this.options.headers.Authorization = AUTH_TOKEN;
    }

    return _extends({}, obj, {
      options: this.options
    });
  }
  /**
   * @function callbackHandler
   * @memberof HttpProvider.prototype
   * @param  {Object} data - from server
   * @param  {Function} cb   - callback function
   * @return {Object|Function} - return object or callback function
   */
  ;

  _proto.callbackHandler = function callbackHandler(data, cb) {
    if (cb) {
      cb(null, data);
    }

    return data;
  };

  _proto.subscribe = function subscribe() {
    throw new Error('HTTPProvider does not support subscriptions.');
  };

  _proto.unsubscribe = function unsubscribe() {
    throw new Error('HTTPProvider does not support subscriptions.');
  };

  return HttpProvider;
}(BaseProvider);

/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */

/**
 * @class JsonRpc
 * @description json rpc instance
 * @return {JsonRpc} Json RPC instance
 */
var JsonRpc = function JsonRpc() {
  var _this = this;

  /**
   * @function toPayload
   * @memberof JsonRpc.prototype
   * @description convert method and params to payload object
   * @param  {String} method - RPC method
   * @param  {Array<object>} params - params that send to RPC
   * @return {Object} payload object
   */
  this.toPayload = function (method, params) {
    // FIXME: error to be done by shared/errors
    if (!method) {
      throw new Error('jsonrpc method should be specified!');
    } // advance message ID


    _this.messageId += 1;
    var sendParams = params === undefined ? [] : typeof params === 'string' ? [params] : [].concat(params);
    return {
      jsonrpc: '2.0',
      id: _this.messageId,
      method: method,
      params: sendParams
    };
  };
  /**
   * @var {Number} messageId
   * @memberof JsonRpc.prototype
   * @description message id, default 0
   */


  this.messageId = 0;
};

var WSProvider = /*#__PURE__*/function (_BaseSocket) {
  _inheritsLoose(WSProvider, _BaseSocket);

  // ws: w3cwebsocket;
  function WSProvider(url, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _BaseSocket.call(this, url) || this;

    if (!isWs(url)) {
      throw new Error(url + " is not websocket");
    }

    _this.url = url;
    _this.options = options;
    _this.connection = _this.createWebsocketProvider(_this.url, _this.options);
    _this.jsonRpc = new JsonRpc();
    _this.subscriptions = {};

    _this.registerEventListeners(); // this.on = this.emitter.on.bind(this);


    return _this;
  }

  var _proto = WSProvider.prototype;

  _proto.on = function on(type, handler) {
    this.emitter.on(type, handler);
    return this;
  };

  _proto.onData = function onData(handler) {
    this.emitter.on('data', handler);
    return this;
  };

  _proto.onError = function onError(event) {
    if (event.code === 'ECONNREFUSED') {
      this.reconnect();
      return;
    }

    _BaseSocket.prototype.onError.call(this, event);
  };

  _proto.onClose = function onClose(closeEvent) {
    if (closeEvent.code !== 1000 || closeEvent.wasClean === false) {
      this.reconnect();
      return;
    }

    _BaseSocket.prototype.onClose.call(this);
  };

  _proto.createWebsocketProvider = function createWebsocketProvider(url, options) {
    if (options === void 0) {
      options = {};
    }

    // tslint:disable-next-line: no-string-literal
    if (typeof window !== 'undefined' && window.WebSocket) {
      // tslint:disable-next-line: no-string-literal
      return new WebSocket(url, options.protocol);
    } else {
      var headers = options.headers || {};
      var urlObject = new URL(url);

      if (!headers.authorization && urlObject.username && urlObject.password) {
        var authToken = Buffer.from(urlObject.username + ":" + urlObject.password).toString('base64');
        headers.authorization = "Basic " + authToken;
      }

      return new w3cwebsocket(url, options.protocol, undefined, headers, undefined, options.clientConfig);
    }
  };

  _proto.reconnect = function reconnect() {
    var _this2 = this;

    setTimeout(function () {
      _this2.removeAllSocketListeners();

      _this2.connection = _this2.createWebsocketProvider(_this2.url, _this2.options);

      _this2.registerEventListeners();
    }, 5000);
  };

  _proto.isConnecting = function isConnecting() {
    return this.connection.readyState === this.connection.CONNECTING;
  };

  _proto.send = function send(payload) {
    var _this3 = this;

    var _this$getMiddleware = this.getMiddleware(payload.method),
        tReq = _this$getMiddleware[0],
        tRes = _this$getMiddleware[1];

    var reqMiddleware = composeMiddleware.apply(void 0, tReq);
    var resMiddleware = composeMiddleware.apply(void 0, tRes);
    return new Promise(function (resolve, reject) {
      // TODO: test on Error
      if (_this3.connected) {
        try {
          _this3.connection.send(reqMiddleware(JSON.stringify(payload)));
        } catch (error) {
          // TODO !isConnecting then reconnect?
          _this3.removeEventListener(SocketConnection.ERROR);

          throw error;
        }
      }

      _this3.emitter.on(SocketConnection.CONNECT, function () {
        try {
          _this3.connection.send(reqMiddleware(JSON.stringify(payload)));
        } catch (error) {
          // TODO !isConnecting then reconnect?
          _this3.removeEventListener(SocketConnection.ERROR);

          throw error;
        }
      });

      _this3.emitter.on("" + payload.id, function (data) {
        resolve(resMiddleware(data));

        _this3.removeEventListener("" + payload.id);
      });

      _this3.emitter.on(SocketConnection.ERROR, reject);
    });
  };

  _proto.subscribe = /*#__PURE__*/function () {
    var _subscribe = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(payload) {
      var response, responseValidateResult;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.send(payload);

            case 2:
              response = _context.sent;
              responseValidateResult = this.validate(response);

              if (!(responseValidateResult instanceof Error)) {
                _context.next = 6;
                break;
              }

              throw responseValidateResult;

            case 6:
              this.subscriptions[response.result] = {
                id: response.result,
                subscribeMethod: payload.method,
                parameters: payload.params,
                payload: payload
              };
              return _context.abrupt("return", response.result);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function subscribe(_x) {
      return _subscribe.apply(this, arguments);
    }

    return subscribe;
  }();

  _proto.unsubscribe = /*#__PURE__*/function () {
    var _unsubscribe = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(payload) {
      var _this4 = this;

      var subscriptionId;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              subscriptionId = payload.params[0];

              if (!this.hasSubscription(subscriptionId)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", this.send(payload).then(function (response) {
                if (response) {
                  _this4.removeEventListener(_this4.getSubscriptionEvent(subscriptionId));

                  delete _this4.subscriptions[subscriptionId];
                }

                return response;
              }));

            case 3:
              return _context2.abrupt("return", Promise.reject(new Error("Provider error: Subscription with ID " + subscriptionId + " does not exist.")));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function unsubscribe(_x2) {
      return _unsubscribe.apply(this, arguments);
    }

    return unsubscribe;
  }();

  _proto.clearSubscriptions = /*#__PURE__*/function () {
    var _clearSubscriptions = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(unsubscribeMethod) {
      var _this5 = this;

      var unsubscribePromises, results;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              unsubscribePromises = [];
              Object.keys(this.subscriptions).forEach(function (key) {
                _this5.removeEventListener(key);

                unsubscribePromises.push(_this5.unsubscribe(_this5.jsonRpc.toPayload(unsubscribeMethod, _this5.subscriptions[key].id)));
              });
              _context3.next = 4;
              return Promise.all(unsubscribePromises);

            case 4:
              results = _context3.sent;

              if (!results.includes(false)) {
                _context3.next = 7;
                break;
              }

              throw new Error("Could not unsubscribe all subscriptions: " + JSON.stringify(results));

            case 7:
              return _context3.abrupt("return", true);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function clearSubscriptions(_x3) {
      return _clearSubscriptions.apply(this, arguments);
    }

    return clearSubscriptions;
  }();

  _proto.registerEventListeners = function registerEventListeners() {
    this.connection.onmessage = this.onMessage.bind(this);
    this.connection.onopen = this.onReady.bind(this);
    this.connection.onopen = this.onConnect.bind(this);
    this.connection.onclose = this.onClose.bind(this);
    this.connection.onerror = this.onError.bind(this);
  };

  _proto.onMessage = function onMessage(msg) {
    if (msg && msg.data) {
      var result;
      var event;

      try {
        result = isObject(msg.data) ? msg.data : JSON.parse(msg.data);

        if (isArray(result)) {
          event = result[0].id;
        } // tslint:disable-next-line: prefer-conditional-expression


        if (typeof result.id === 'undefined') {
          event = this.getSubscriptionEvent(result.params.subscription) || result.params.subscription; // result = result.params;
        } else {
          event = result.id;
        }
      } catch (error) {
        throw error;
      }

      this.emitter.emit(SocketState.SOCKET_MESSAGE, result);
      this.emitter.emit("" + event, result);
    } else {
      throw new Error('provider error');
    }
  };

  _proto.onConnect = /*#__PURE__*/function () {
    var _onConnect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      var subscriptionKeys, _iterator, _step, key, subscriptionId;

      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.subscriptions) {
                this.subscriptions = {};
              }

              subscriptionKeys = Object.keys(this.subscriptions);

              if (!(subscriptionKeys.length > 0)) {
                _context4.next = 13;
                break;
              }

              _iterator = _createForOfIteratorHelperLoose(subscriptionKeys);

            case 4:
              if ((_step = _iterator()).done) {
                _context4.next = 13;
                break;
              }

              key = _step.value;
              _context4.next = 8;
              return this.subscribe(this.subscriptions[key].payload);

            case 8:
              subscriptionId = _context4.sent;
              delete this.subscriptions[subscriptionId];
              this.subscriptions[key].id = subscriptionId;

            case 11:
              _context4.next = 4;
              break;

            case 13:
              this.emitter.emit(SocketState.SOCKET_CONNECT);
              this.emitter.emit(SocketConnection.CONNECT);

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function onConnect() {
      return _onConnect.apply(this, arguments);
    }

    return onConnect;
  }();

  _proto.getSubscriptionEvent = function getSubscriptionEvent(subscriptionId) {
    var _this6 = this;

    if (this.subscriptions[subscriptionId]) {
      return subscriptionId;
    }

    var event;
    Object.keys(this.subscriptions).forEach(function (key) {
      if (_this6.subscriptions[key].id === subscriptionId) {
        event = key;
      }
    });
    return event;
  };

  _proto.hasSubscription = function hasSubscription(subscriptionId) {
    return typeof this.getSubscriptionEvent(subscriptionId) !== 'undefined';
  };

  _proto.validate = function validate(response, payload) {
    if (isObject(response)) {
      if (response.error) {
        if (response.error instanceof Error) {
          return new Error("Node error: " + response.error.message);
        }

        return new Error("Node error: " + JSON.stringify(response.error));
      }

      if (payload && response.id !== payload.id) {
        return new Error("Validation error: Invalid JSON-RPC response ID (request: " + payload.id + " / response: " + response.id + ")");
      }

      if (response.result === undefined) {
        return new Error('Validation error: Undefined JSON-RPC result');
      }

      return true;
    }

    return new Error('Validation error: Response should be of type Object');
  };

  _createClass(WSProvider, [{
    key: "connected",
    get: function get() {
      return this.connection.readyState === this.connection.OPEN;
    }
  }]);

  return WSProvider;
}(BaseSocket);

/**
 * @packageDocumentation
 * @module avalanche-network
 */

var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    var _this = this;

    this.handlers = {};
    this.emitter = mitt(this.handlers);
    this.off = this.emitter.off.bind(this);
    this.emit = this.emitter.emit.bind(this); // tslint:disable-next-line: no-empty

    this.promise = new Promise(function (resolve, reject) {
      _this.resolve = resolve;
      _this.reject = reject;
    });
    this.then = this.promise.then.bind(this.promise);
  }

  var _proto = Emitter.prototype;

  _proto.resetHandlers = function resetHandlers() {
    // tslint:disable-next-line: forin
    for (var i in this.handlers) {
      delete this.handlers[i];
    }
  };

  _proto.on = function on(type, handler) {
    this.emitter.on(type, handler);
    return this;
  };

  _proto.once = function once(type, handler) {
    var _this2 = this;

    this.emitter.on(type, function (e) {
      handler(e);

      _this2.removeEventListener(type);
    });
  };

  _proto.addEventListener = function addEventListener(type, handler) {
    this.emitter.on(type, handler);
  };

  _proto.removeEventListener = function removeEventListener(type, handler) {
    if (!type) {
      this.handlers = {};
      return;
    }

    if (!handler) {
      delete this.handlers[type];
    } else {
      return this.emitter.off(type, handler);
    }
  };

  _proto.onError = function onError(error) {
    this.emitter.on('error', error);
    this.removeEventListener('*');
  };

  _proto.onData = function onData(data) {
    this.emitter.on('data', data);
    this.removeEventListener('*');
  };

  _proto.listenerCount = function listenerCount(listenKey) {
    var count = 0;
    Object.keys(this.handlers).forEach(function (val) {
      if (listenKey === val) {
        count += 1;
      }
    });
    return count;
  };

  return Emitter;
}();

/**
 * @packageDocumentation
 * @module avalanche-network
 */
var ProviderType;

(function (ProviderType) {
  ProviderType["http"] = "http";
  ProviderType["ws"] = "ws";
})(ProviderType || (ProviderType = {}));

var Provider = /*#__PURE__*/function () {
  function Provider(url) {
    this.provider = this.onInitSetProvider(url);
    this.providerType = this.getType(this.provider);
  }

  Provider.getProvider = function getProvider(provider) {
    try {
      this.getProvider(provider);
      return new Provider(provider);
    } catch (error) {
      throw error;
    }
  };

  var _proto = Provider.prototype;

  _proto.onInitSetProvider = function onInitSetProvider(providerUrl) {
    if (typeof providerUrl === 'string') {
      return isHttp(providerUrl) ? new HttpProvider(providerUrl) : isWs(providerUrl) ? new WSProvider(providerUrl) : new HttpProvider(defaultConfig.Default.Chain_URL);
    }

    try {
      var providerType = this.getType(providerUrl);

      if (providerType === ProviderType.http || providerType === ProviderType.ws) {
        return providerUrl;
      } else {
        throw new Error('cannot get provider type');
      }
    } catch (error) {
      throw error;
    }
  };

  _proto.getType = function getType(provider) {
    if (provider instanceof HttpProvider) {
      return ProviderType.http;
    }

    if (provider instanceof WSProvider) {
      return ProviderType.ws;
    }

    throw new Error('provider is not correct');
  };

  return Provider;
}();

/**
 * @class ResponseMiddleware
 * @description Response middleware of RPC
 * @param  {Object}  ResponseBody - response from rpc
 * @return {ResponseMiddleware} response middleware instance
 */

var ResponseMiddleware = /*#__PURE__*/function () {
  function ResponseMiddleware(ResponseBody) {
    this.result = ResponseBody.result;
    this.error = ResponseBody.error;
    this.raw = ResponseBody;
    this.responseType = this.getResponseType();
  }

  var _proto = ResponseMiddleware.prototype;

  _proto.getResponseType = function getResponseType() {
    if (this.error) {
      return 'error';
    } else if (this.result || this.result === null && this.result !== undefined) {
      return 'result';
    } else {
      return 'raw';
    }
  };

  _proto.isError = function isError() {
    return this.responseType === 'error';
  };

  _proto.isResult = function isResult() {
    return this.responseType === 'result';
  };

  _proto.isRaw = function isRaw() {
    return this.responseType === 'raw';
  };

  _createClass(ResponseMiddleware, [{
    key: "getResult",
    get: function get() {
      return isObject(this.result) ? _extends({}, this.result, {
        responseType: 'result'
      }) : this.result;
    }
  }, {
    key: "getError",
    get: function get() {
      return isObject(this.error) ? _extends({}, this.error, {
        responseType: 'error'
      }) : this.error;
    }
  }, {
    key: "getRaw",
    get: function get() {
      return _extends({}, this.raw, {
        responseType: 'raw'
      });
    }
  }]);

  return ResponseMiddleware;
}();

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
var RPCMethod;

(function (RPCMethod) {
  // 1. hmy_getBlockByHash
  RPCMethod["GetBlockByHash"] = "hmy_getBlockByHash"; // 2. hmy_getBlockByNumber

  RPCMethod["GetBlockByNumber"] = "hmy_getBlockByNumber"; // 3. hmy_getBlockTransactionCountByHash

  RPCMethod["GetBlockTransactionCountByHash"] = "hmy_getBlockTransactionCountByHash"; // 4. hmy_getBlockTransactionCountByNumber

  RPCMethod["GetBlockTransactionCountByNumber"] = "hmy_getBlockTransactionCountByNumber"; // 5. hmy_getCode

  RPCMethod["GetCode"] = "hmy_getCode"; // 6. hmy_getTransactionByBlockHashAndIndex

  RPCMethod["GetTransactionByBlockHashAndIndex"] = "hmy_getTransactionByBlockHashAndIndex"; // 7. hmy_getTransactionByBlockNumberAndIndex

  RPCMethod["GetTransactionByBlockNumberAndIndex"] = "hmy_getTransactionByBlockNumberAndIndex"; // 8. hmy_getTransactionByHash

  RPCMethod["GetTransactionByHash"] = "hmy_getTransactionByHash";
  RPCMethod["GetTransactionReceipt"] = "hmy_getTransactionReceipt";
  RPCMethod["GetCXReceiptByHash"] = "hmy_getCXReceiptByHash"; // 9. hmy_syncing

  RPCMethod["Syncing"] = "hmy_syncing"; // 10. net_peerCount

  RPCMethod["PeerCount"] = "net_peerCount"; // 11. hmy_getBalance

  RPCMethod["GetBalance"] = "hmy_getBalance"; // 12. hmy_getStorageAt

  RPCMethod["GetStorageAt"] = "hmy_getStorageAt"; // 13. hmy_getTransactionCount

  RPCMethod["GetTransactionCount"] = "hmy_getTransactionCount"; // 14. hmy_sendTransaction

  RPCMethod["SendTransaction"] = "hmy_sendTransaction"; // 15. hmy_sendRawTransaction

  RPCMethod["SendRawTransaction"] = "hmy_sendRawTransaction"; // 16. hmy_subscribe

  RPCMethod["Subscribe"] = "hmy_subscribe"; // 17. hmy_getlogs

  RPCMethod["GetPastLogs"] = "hmy_getLogs"; // 18. hmy_getWork

  RPCMethod["GetWork"] = "hmy_getWork"; // 19. hmy_submitWork
  // SubmitWork = 'hmy_submitWork',
  // 20. hmy_getProof

  RPCMethod["GetProof"] = "hmy_getProof"; // 21, hmy_getFilterChanges

  RPCMethod["GetFilterChanges"] = "hmy_getFilterChanges"; // 22. hmy_newPendingTransactionFilter

  RPCMethod["NewPendingTransactionFilter"] = "hmy_newPendingTransactionFilter"; // 23. hmy_newBlockFilter

  RPCMethod["NewBlockFilter"] = "hmy_newBlockFilter"; // 24. hmy_newFilter

  RPCMethod["NewFilter"] = "hmy_newFilter"; // 25. hmy_call

  RPCMethod["Call"] = "hmy_call"; // 26. hmy_estimateGas

  RPCMethod["EstimateGas"] = "hmy_estimateGas"; // 27. hmy_gasPrice

  RPCMethod["GasPrice"] = "hmy_gasPrice"; // 28. hmy_blockNumber

  RPCMethod["BlockNumber"] = "hmy_blockNumber"; // 29. hmy_unsubscribe

  RPCMethod["UnSubscribe"] = "hmy_unsubscribe"; // 30. net_version

  RPCMethod["NetVersion"] = "net_version"; // 31. hmy_protocolVersion

  RPCMethod["ProtocolVersion"] = "hmy_protocolVersion"; // 32. hmy_getShardingStructure

  RPCMethod["GetShardingStructure"] = "hmy_getShardingStructure"; // 33. hmy_sendRawStakingTransaction

  RPCMethod["SendRawStakingTransaction"] = "hmy_sendRawStakingTransaction"; // 34. hmy_getAccountNonce

  RPCMethod["GetAccountNonce"] = "hmy_getAccountNonce";
})(RPCMethod || (RPCMethod = {}));
/**@ignore */


var RPCErrorCode;

(function (RPCErrorCode) {
  // Standard JSON-RPC 2.0 errors
  // RPC_INVALID_REQUEST is internally mapped to HTTP_BAD_REQUEST (400).
  // It should not be used for application-layer errors.
  RPCErrorCode[RPCErrorCode["RPC_INVALID_REQUEST"] = -32600] = "RPC_INVALID_REQUEST"; // RPC_METHOD_NOT_FOUND is internally mapped to HTTP_NOT_FOUND (404).
  // It should not be used for application-layer errors.

  RPCErrorCode[RPCErrorCode["RPC_METHOD_NOT_FOUND"] = -32601] = "RPC_METHOD_NOT_FOUND";
  RPCErrorCode[RPCErrorCode["RPC_INVALID_PARAMS"] = -32602] = "RPC_INVALID_PARAMS"; // RPC_INTERNAL_ERROR should only be used for genuine errors in bitcoind
  // (for example datadir corruption).

  RPCErrorCode[RPCErrorCode["RPC_INTERNAL_ERROR"] = -32603] = "RPC_INTERNAL_ERROR";
  RPCErrorCode[RPCErrorCode["RPC_PARSE_ERROR"] = -32700] = "RPC_PARSE_ERROR"; // General application defined errors

  RPCErrorCode[RPCErrorCode["RPC_MISC_ERROR"] = -1] = "RPC_MISC_ERROR";
  RPCErrorCode[RPCErrorCode["RPC_TYPE_ERROR"] = -3] = "RPC_TYPE_ERROR";
  RPCErrorCode[RPCErrorCode["RPC_INVALID_ADDRESS_OR_KEY"] = -5] = "RPC_INVALID_ADDRESS_OR_KEY";
  RPCErrorCode[RPCErrorCode["RPC_INVALID_PARAMETER"] = -8] = "RPC_INVALID_PARAMETER";
  RPCErrorCode[RPCErrorCode["RPC_DATABASE_ERROR"] = -20] = "RPC_DATABASE_ERROR";
  RPCErrorCode[RPCErrorCode["RPC_DESERIALIZATION_ERROR"] = -22] = "RPC_DESERIALIZATION_ERROR";
  RPCErrorCode[RPCErrorCode["RPC_VERIFY_ERROR"] = -25] = "RPC_VERIFY_ERROR";
  RPCErrorCode[RPCErrorCode["RPC_VERIFY_REJECTED"] = -26] = "RPC_VERIFY_REJECTED";
  RPCErrorCode[RPCErrorCode["RPC_IN_WARMUP"] = -28] = "RPC_IN_WARMUP";
  RPCErrorCode[RPCErrorCode["RPC_METHOD_DEPRECATED"] = -32] = "RPC_METHOD_DEPRECATED";
})(RPCErrorCode || (RPCErrorCode = {}));

/**
 * ## How to Create a Massage
 * @example
 * ```
 * const { HttpProvider, Messenger } = require('avalanche-js-network');
 * const { ChainType, ChainID } = require('avalanche-js-utils');
 *
 * // create a custom messenger
 * const customMessenger = new Messenger(
 *   new HttpProvider('http://localhost:9500'),
 *   ChainType.Avalanche, // if you are connected to Avalanche's blockchain
 *   ChainID.HmyLocal, // check if the chainId is correct
 * )
 * ```
 */

var Messenger = /*#__PURE__*/function (_AvalancheCore) {
  _inheritsLoose(Messenger, _AvalancheCore);

  function Messenger(provider, chainType, chainId, config) {
    var _this;

    if (chainType === void 0) {
      chainType = defaultConfig.Default.Chain_Type;
    }

    if (chainId === void 0) {
      chainId = defaultConfig.Default.Chain_ID;
    }

    if (config === void 0) {
      config = defaultConfig;
    }

    _this = _AvalancheCore.call(this, chainType, chainId) || this; // tslint:disable-next-line: variable-name

    _this.Network_ID = 'Default';
    /**
     * @function send
     * @memberof Messenger.prototype
     * @param  {String} method - RPC method
     * @param  {Object} params - RPC method params
     * @return {Object} RPC result
     */

    _this.send = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(method, params, rpcPrefix, shardID) {
        var rpcMethod, payload, _provider, result;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (shardID === void 0) {
                  shardID = _this.currentShard;
                }

                _this.providerCheck();

                rpcMethod = method;

                if (rpcPrefix && isString(rpcPrefix) && rpcPrefix !== _this.chainPrefix) {
                  rpcMethod = _this.setRPCPrefix(method, rpcPrefix);
                } else if (!rpcPrefix || rpcPrefix === _this.chainPrefix) {
                  rpcMethod = _this.setRPCPrefix(method, _this.chainPrefix);
                }

                _context.prev = 4;
                payload = _this.JsonRpc.toPayload(rpcMethod, params);
                _provider = _this.getShardProvider(shardID);

                _this.setResMiddleware(function (data) {
                  if (!(data instanceof ResponseMiddleware)) {
                    return new ResponseMiddleware(data);
                  } else {
                    return data;
                  }
                }, '*', _provider);

                _context.next = 10;
                return _provider.send(payload);

              case 10:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](4);
                throw new Error(_context.t0);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 14]]);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.subscribe = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(method, params, returnType, rpcPrefix, shardID) {
        var rpcMethod, id, provider, reProvider, payload;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (returnType === void 0) {
                  returnType = SubscribeReturns.all;
                }

                if (rpcPrefix === void 0) {
                  rpcPrefix = _this.chainPrefix;
                }

                if (shardID === void 0) {
                  shardID = _this.currentShard;
                }

                rpcMethod = method;

                if (rpcPrefix && isString(rpcPrefix) && rpcPrefix !== _this.chainPrefix) {
                  rpcMethod = _this.setRPCPrefix(method, rpcPrefix);
                } else if (!rpcPrefix || rpcPrefix === _this.chainPrefix) {
                  rpcMethod = _this.setRPCPrefix(method, _this.chainPrefix);
                }

                id = null;
                provider = _this.getShardProvider(shardID);

                if (!(provider instanceof WSProvider)) {
                  _context2.next = 37;
                  break;
                }

                reProvider = provider;
                _context2.prev = 9;
                payload = _this.JsonRpc.toPayload(rpcMethod, params);
                _context2.next = 13;
                return reProvider.subscribe(payload);

              case 13:
                id = _context2.sent;
                reProvider.on(id, function (result) {
                  reProvider.emitter.emit('data', result);
                });
                reProvider.once('error', function (error) {
                  reProvider.removeEventListener(id);
                  reProvider.emitter.emit('error', error);
                  reProvider.removeEventListener('*');
                });
                _context2.next = 22;
                break;

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](9);
                reProvider.emitter.emit('error', _context2.t0);
                reProvider.removeEventListener('*');

              case 22:
                if (!(returnType === SubscribeReturns.all)) {
                  _context2.next = 26;
                  break;
                }

                return _context2.abrupt("return", [reProvider, id]);

              case 26:
                if (!(returnType === SubscribeReturns.method)) {
                  _context2.next = 30;
                  break;
                }

                return _context2.abrupt("return", reProvider);

              case 30:
                if (!(returnType === SubscribeReturns.id)) {
                  _context2.next = 34;
                  break;
                }

                return _context2.abrupt("return", id);

              case 34:
                throw new Error('Invalid returns');

              case 35:
                _context2.next = 38;
                break;

              case 37:
                throw new Error('HttpProvider does not support this');

              case 38:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[9, 18]]);
      }));

      return function (_x5, _x6, _x7, _x8, _x9) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.unsubscribe = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(method, params, rpcPrefix, shardID) {
        var rpcMethod, provider, reProvider, payload, response;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (shardID === void 0) {
                  shardID = _this.currentShard;
                }

                rpcMethod = method;

                if (rpcPrefix && isString(rpcPrefix) && rpcPrefix !== _this.chainPrefix) {
                  rpcMethod = _this.setRPCPrefix(method, rpcPrefix);
                } else if (!rpcPrefix || rpcPrefix === _this.chainPrefix) {
                  rpcMethod = _this.setRPCPrefix(method, _this.chainPrefix);
                }

                provider = _this.getShardProvider(shardID);

                if (!(provider instanceof WSProvider)) {
                  _context3.next = 19;
                  break;
                }

                reProvider = _this.provider;
                _context3.prev = 6;
                payload = _this.JsonRpc.toPayload(rpcMethod, params);
                _context3.next = 10;
                return reProvider.unsubscribe(payload);

              case 10:
                response = _context3.sent;
                return _context3.abrupt("return", response);

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](6);
                throw _context3.t0;

              case 17:
                _context3.next = 20;
                break;

              case 19:
                throw new Error('HttpProvider does not support this');

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[6, 14]]);
      }));

      return function (_x10, _x11, _x12, _x13) {
        return _ref3.apply(this, arguments);
      };
    }();
    /**
     * @var {Provider} provider
     * @memberof Messenger.prototype
     * @description Provider instance
     */


    _this.provider = provider;
    /**
     * @var {Object} config
     * @memberof Messenger.prototype
     * @description Messenger config
     */

    _this.config = config;
    /**
     * @var {Number} Network_ID
     * @memberof Messenger.prototype
     * @description Network ID for current provider
     */

    /**
     * @var {JsonRpc} JsonRpc
     * @memberof Messenger.prototype
     * @description JsonRpc instance
     */

    _this.JsonRpc = new JsonRpc(); // set Network ID

    _this.setNetworkID(defaultConfig.Default.Network_ID); // set shardingProviders


    _this.shardProviders = new Map(); // this.setShardingProviders();

    return _this;
  }
  /**
   * @example
   * ```
   * customMessenger.currentShard
   * ```
   */


  var _proto = Messenger.prototype;

  /**
   * @function setProvider
   * @memberof Messenger
   * @description provider setter
   * @param  {Provider} provider - provider instance
   */
  _proto.setProvider = function setProvider(provider) {
    this.provider = provider;
  }
  /**
   * @function providerCheck
   * @memberof Messenger
   * @description provider checker
   * @return {Error|null} provider validator
   */
  ;

  _proto.providerCheck = function providerCheck() {
    if (!this.provider) {
      throw new Error('provider is not found');
    }
  }
  /**
   * @function setReqMiddleware
   * @description set request middleware
   * @memberof Messenger
   * @param  {any} middleware - middle ware for req
   * @param  {String} method  - method name
   * @hidden
   */
  ;

  _proto.setReqMiddleware = function setReqMiddleware(middleware, method, provider) {
    if (method === void 0) {
      method = '*';
    }

    provider.middlewares.request.use(middleware, method);
  }
  /**
   * @function setResMiddleware
   * @description set response middleware
   * @memberof Messenger
   * @param  {any} middleware - middle ware for req
   * @param  {String} method  - method name
   * @hidden
   */
  ;

  _proto.setResMiddleware = function setResMiddleware(middleware, method, provider) {
    if (method === void 0) {
      method = '*';
    }

    provider.middlewares.response.use(middleware, method);
  }
  /**
   * @function setNetworkID
   * @description set network id
   * @memberof Messenger
   * @param  {String} id network id string
   */
  ;

  _proto.setNetworkID = function setNetworkID(id) {
    this.Network_ID = id;
  };

  _proto.setRPCPrefix = function setRPCPrefix(method, prefix) {
    var stringArray = method.split('_');

    if (stringArray.length !== 2) {
      throw new Error("could not set prefix with " + method);
    }

    stringArray[0] = prefix;
    return stringArray.join('_');
  };

  _proto.setShardingProviders = /*#__PURE__*/function () {
    var _setShardingProviders = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      var response, shardingStructures, _iterator, _step, shard, shardID;

      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(this.chainPrefix !== ChainType.Avalanche)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return");

            case 2:
              _context4.prev = 2;
              _context4.next = 5;
              return this.send(RPCMethod.GetShardingStructure, [], this.chainPrefix);

            case 5:
              response = _context4.sent;

              if (response.result) {
                shardingStructures = response.result;

                for (_iterator = _createForOfIteratorHelperLoose(shardingStructures); !(_step = _iterator()).done;) {
                  shard = _step.value;
                  shardID = typeof shard.shardID === 'string' ? Number.parseInt(shard.shardID, 10) : shard.shardID;
                  this.shardProviders.set(shardID, {
                    current: shard.current,
                    shardID: shardID,
                    http: shard.http,
                    ws: shard.ws
                  });
                }
              }

              _context4.next = 12;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](2);
              return _context4.abrupt("return");

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[2, 9]]);
    }));

    function setShardingProviders() {
      return _setShardingProviders.apply(this, arguments);
    }

    return setShardingProviders;
  }()
  /**
   * @example
   * ```
   * hmy.messenger.getShardProvider()
   * ```
   */
  ;

  _proto.getShardProvider = function getShardProvider(shardID) {
    var provider = this.shardProviders.get(shardID);

    if (provider) {
      return this.provider instanceof HttpProvider ? new HttpProvider(provider.http) : new WSProvider(provider.ws);
    }

    return this.provider;
  }
  /**
   * @example
   * ```
   * hmy.messenger.getCurrentShardID()
   * ```
   */
  ;

  _proto.getCurrentShardID = function getCurrentShardID() {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.shardProviders), _step2; !(_step2 = _iterator2()).done;) {
      var shard = _step2.value;

      if (shard[1].current === true || shard[1].http === this.provider.url || shard[1].ws === this.provider.url) {
        return shard[1].shardID;
      }
    }
  };

  _proto.setDefaultShardID = function setDefaultShardID(shardID) {
    this.defaultShardID = shardID;
  };

  _createClass(Messenger, [{
    key: "currentShard",
    get: function get() {
      return this.getCurrentShardID() || this.defaultShardID || 0;
    }
    /**
     * @example
     * ```
     * customMessenger.shardCount
     * ```
     */

  }, {
    key: "shardCount",
    get: function get() {
      return this.shardProviders.size;
    }
  }]);

  return Messenger;
}(AvalancheCore);

var sec = 1000;

var calculateSum = function calculateSum(accumulator, currentValue) {
  return accumulator + currentValue;
};

var blockTrackerEvents = ['sync', 'latest'];
var BaseBlockTracker = /*#__PURE__*/function (_Emitter) {
  _inheritsLoose(BaseBlockTracker, _Emitter);

  function BaseBlockTracker(opts) {
    var _this;

    if (opts === void 0) {
      opts = {
        blockResetDuration: undefined,
        retryTimeout: undefined,
        keepEventLoopActive: undefined,
        setSkipCacheFlag: false
      };
    }

    _this = _Emitter.call(this) || this; // config

    _this._blockResetDuration = opts.blockResetDuration || 20 * sec; // state
    _this._currentBlock = null;
    _this._isRunning = false; // bind functions for internal use
    // this._onNewListener = this._onNewListener.bind(this);
    // this._onRemoveListener = this._onRemoveListener.bind(this);
    // this._resetCurrentBlock = this._resetCurrentBlock.bind(this);
    // listen for handler changes
    // this._setupInternalEvents();

    _this._maybeStart();

    return _this;
  }

  var _proto = BaseBlockTracker.prototype;

  _proto.isRunning = function isRunning() {
    return this._isRunning;
  };

  _proto.getCurrentBlock = function getCurrentBlock() {
    return this._currentBlock;
  };

  _proto.getLatestBlock = /*#__PURE__*/function () {
    var _getLatestBlock = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _this2 = this;

      var latestBlock;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this._currentBlock) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", this._currentBlock);

            case 2:
              _context.next = 4;
              return new Promise(function (resolve) {
                return _this2.once('latest', resolve);
              });

            case 4:
              latestBlock = _context.sent;
              return _context.abrupt("return", latestBlock);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getLatestBlock() {
      return _getLatestBlock.apply(this, arguments);
    }

    return getLatestBlock;
  }() // dont allow module consumer to remove our internal event listeners
  ;

  _proto.removeAllListeners = function removeAllListeners(eventName) {
    // perform default behavior, preserve fn arity
    if (eventName) {
      _Emitter.prototype.removeEventListener.call(this, eventName);
    } else {
      _Emitter.prototype.removeEventListener.call(this, '*');
    } // re-add internal events


    this._setupInternalEvents(); // trigger stop check just in case


    this._onRemoveListener('*');
  } //
  // to be implemented in subclass
  //
  ;

  _proto._start = function _start() {// default behavior is noop
  };

  _proto._end = function _end() {// default behavior is noop
  } //
  // private
  //
  ;

  _proto._setupInternalEvents = function _setupInternalEvents() {
    // first remove listeners for idempotence
    this.removeEventListener('newListener', this._onNewListener);
    this.removeEventListener('removeListener', this._onRemoveListener); // then add them

    this.on('newListener', this._onNewListener);
    this.on('removeListener', this._onRemoveListener);
  };

  _proto._onNewListener = function _onNewListener(eventName, handler) {
    // `newListener` is called *before* the listener is added
    if (!blockTrackerEvents.includes(eventName)) {
      return;
    }

    this._maybeStart();
  };

  _proto._onRemoveListener = function _onRemoveListener(eventName, handler) {
    // `removeListener` is called *after* the listener is removed
    if (this._getBlockTrackerEventCount() > 0) {
      return;
    }

    this._maybeEnd();
  };

  _proto._maybeStart = function _maybeStart() {
    if (this._isRunning) {
      return;
    }

    this._isRunning = true; // cancel setting latest block to stale

    this._cancelBlockResetTimeout();

    this._start();
  };

  _proto._maybeEnd = function _maybeEnd() {
    if (!this._isRunning) {
      return;
    }

    this._isRunning = false;

    this._setupBlockResetTimeout();

    this._end();
  };

  _proto._getBlockTrackerEventCount = function _getBlockTrackerEventCount() {
    var _this3 = this;

    return blockTrackerEvents.map(function (eventName) {
      return _this3.listenerCount(eventName);
    }).reduce(calculateSum);
  };

  _proto._newPotentialLatest = function _newPotentialLatest(newBlock) {
    var currentBlock = this._currentBlock; // only update if blok number is higher

    if (currentBlock && isHex(currentBlock) && isHex(newBlock) && hexToNumber(newBlock) <= hexToNumber(currentBlock)) {
      return;
    }

    this._setCurrentBlock(newBlock);
  };

  _proto._setCurrentBlock = function _setCurrentBlock(newBlock) {
    var oldBlock = this._currentBlock;
    this._currentBlock = newBlock;
    this.emit('latest', newBlock);
    this.emit('sync', {
      oldBlock: oldBlock,
      newBlock: newBlock
    });
  };

  _proto._setupBlockResetTimeout = function _setupBlockResetTimeout() {
    // clear any existing timeout
    this._cancelBlockResetTimeout(); // clear latest block when stale


    this._blockResetTimeout = setTimeout(this._resetCurrentBlock, this._blockResetDuration); // nodejs - dont hold process open

    if (this._blockResetTimeout.unref) {
      this._blockResetTimeout.unref();
    }
  };

  _proto._cancelBlockResetTimeout = function _cancelBlockResetTimeout() {
    clearTimeout(this._blockResetTimeout);
  };

  _proto._resetCurrentBlock = function _resetCurrentBlock() {
    this._currentBlock = null;
  };

  return BaseBlockTracker;
}(Emitter);

var sec$1 = 1000;
function timeout(duration, unref) {
  return new Promise(function (resolve) {
    var timoutRef = setTimeout(resolve, duration); // don't keep process open

    if (timoutRef.unref && unref) {
      timoutRef.unref();
    }
  });
}
var PollingBlockTracker = /*#__PURE__*/function (_BaseBlockTracker) {
  _inheritsLoose(PollingBlockTracker, _BaseBlockTracker);

  function PollingBlockTracker(messenger, opts) {
    var _this;

    if (opts === void 0) {
      opts = {
        pollingInterval: undefined,
        retryTimeout: undefined,
        keepEventLoopActive: false,
        setSkipCacheFlag: false
      };
    }

    // parse + validate args
    if (!messenger) {
      throw new Error('PollingBlockTracker - no provider specified.');
    }

    var pollingInterval = opts.pollingInterval || 20 * sec$1;
    var retryTimeout = opts.retryTimeout || pollingInterval / 10;
    var keepEventLoopActive = opts.keepEventLoopActive !== undefined ? opts.keepEventLoopActive : true;
    var setSkipCacheFlag = opts.setSkipCacheFlag || false; // BaseBlockTracker constructor

    _this = _BaseBlockTracker.call(this, {
      blockResetDuration: pollingInterval,
      retryTimeout: retryTimeout,
      keepEventLoopActive: keepEventLoopActive,
      setSkipCacheFlag: setSkipCacheFlag
    }) || this; // config

    _this.messenger = messenger;
    _this._pollingInterval = pollingInterval;
    _this._retryTimeout = retryTimeout;
    _this._keepEventLoopActive = keepEventLoopActive;
    _this._setSkipCacheFlag = setSkipCacheFlag;
    return _this;
  } //
  // public
  //
  // trigger block polling


  var _proto = PollingBlockTracker.prototype;

  _proto.checkForLatestBlock =
  /*#__PURE__*/
  function () {
    var _checkForLatestBlock = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var result;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._updateLatestBlock();

            case 2:
              _context.next = 4;
              return this.getLatestBlock();

            case 4:
              result = _context.sent;
              return _context.abrupt("return", result);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function checkForLatestBlock() {
      return _checkForLatestBlock.apply(this, arguments);
    }

    return checkForLatestBlock;
  }() //
  // private
  //
  ;

  _proto._start = function _start() {
    var _this2 = this;

    this._performSync()["catch"](function (err) {
      return _this2.emit('error', err);
    });
  };

  _proto._performSync = /*#__PURE__*/function () {
    var _performSync2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var newErr;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this._isRunning) {
                _context2.next = 16;
                break;
              }

              _context2.prev = 1;
              _context2.next = 4;
              return this._updateLatestBlock();

            case 4:
              _context2.next = 6;
              return timeout(this._pollingInterval, !this._keepEventLoopActive);

            case 6:
              _context2.next = 14;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              newErr = new Error("PollingBlockTracker - encountered an error while attempting to update latest block:\n" + _context2.t0.stack);

              try {
                this.emit('error', newErr);
              } catch (emitErr) {
                console.error(newErr);
              }

              _context2.next = 14;
              return timeout(this._retryTimeout, !this._keepEventLoopActive);

            case 14:
              _context2.next = 0;
              break;

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 8]]);
    }));

    function _performSync() {
      return _performSync2.apply(this, arguments);
    }

    return _performSync;
  }();

  _proto._updateLatestBlock = /*#__PURE__*/function () {
    var _updateLatestBlock2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var latestBlock;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this._fetchLatestBlock();

            case 2:
              latestBlock = _context3.sent;

              this._newPotentialLatest(latestBlock);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _updateLatestBlock() {
      return _updateLatestBlock2.apply(this, arguments);
    }

    return _updateLatestBlock;
  }();

  _proto._fetchLatestBlock = /*#__PURE__*/function () {
    var _fetchLatestBlock2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      var result;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return this.messenger.send(RPCMethod.BlockNumber, []);

            case 3:
              result = _context4.sent;

              if (!result.isError()) {
                _context4.next = 8;
                break;
              }

              throw result.message;

            case 8:
              if (!result.isResult()) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", result.result);

            case 10:
              _context4.next = 15;
              break;

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 12]]);
    }));

    function _fetchLatestBlock() {
      return _fetchLatestBlock2.apply(this, arguments);
    }

    return _fetchLatestBlock;
  }();

  return PollingBlockTracker;
}(BaseBlockTracker);

var SubscribeBlockTracker = /*#__PURE__*/function (_BaseBlockTracker) {
  _inheritsLoose(SubscribeBlockTracker, _BaseBlockTracker);

  // tslint:disable-next-line: variable-name
  function SubscribeBlockTracker(messenger, opts) {
    var _this;

    if (opts === void 0) {
      opts = {};
    }

    // parse + validate args
    if (!messenger) {
      throw new Error('SubscribeBlockTracker - no provider specified.');
    }

    if (!(messenger.provider instanceof WSProvider)) {
      throw new Error('This provider not supported');
    } // BaseBlockTracker constructor


    _this = _BaseBlockTracker.call(this, opts) || this; // config

    _this.messenger = messenger;
    _this.subscriptionId = null;
    return _this;
  }

  var _proto = SubscribeBlockTracker.prototype;

  _proto.checkForLatestBlock = /*#__PURE__*/function () {
    var _checkForLatestBlock = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var result;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getLatestBlock();

            case 2:
              result = _context.sent;
              return _context.abrupt("return", result);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function checkForLatestBlock() {
      return _checkForLatestBlock.apply(this, arguments);
    }

    return checkForLatestBlock;
  }();

  _proto._start = /*#__PURE__*/function () {
    var _start2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var blockNumber, subs;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this.messenger.send(RPCMethod.BlockNumber, []);

            case 3:
              blockNumber = _context2.sent;

              if (!blockNumber.isError()) {
                _context2.next = 8;
                break;
              }

              throw blockNumber.message;

            case 8:
              if (!blockNumber.isResult()) {
                _context2.next = 15;
                break;
              }

              _context2.next = 11;
              return this.messenger.subscribe(RPCMethod.Subscribe, ['newHeads']);

            case 11:
              subs = _context2.sent;
              this.subscriptionId = subs;
              subs[0].onData(this._handleSubData);

              this._newPotentialLatest(blockNumber);

            case 15:
              _context2.next = 20;
              break;

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](0);
              this.emit('error', _context2.t0);

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 17]]);
    }));

    function _start() {
      return _start2.apply(this, arguments);
    }

    return _start;
  }();

  _proto._end = /*#__PURE__*/function () {
    var _end2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.subscriptionId != null) {
                this.messenger.unsubscribe(RPCMethod.UnSubscribe, [this.subscriptionId]);
                delete this.subscriptionId;
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _end() {
      return _end2.apply(this, arguments);
    }

    return _end;
  }();

  _proto._handleSubData = function _handleSubData(data) {
    if ( // data.method === 'eth_subscription' &&
    data.params.subscription === this.subscriptionId) {
      this._newPotentialLatest(data.params.result.number);
    }
  };

  return SubscribeBlockTracker;
}(BaseBlockTracker);

var SubscriptionMethod = /*#__PURE__*/function (_WSProvider) {
  _inheritsLoose(SubscriptionMethod, _WSProvider);

  function SubscriptionMethod(param, options, messenger, shardID) {
    var _this;

    if (shardID === void 0) {
      shardID = 0;
    }

    _this = _WSProvider.call(this, shardID !== 0 ? messenger.getShardProvider(shardID).url : messenger.provider.url) || this;
    _this.subscriptionId = null;
    _this.shardID = shardID;
    _this.param = param;
    _this.options = options;
    _this.messenger = messenger;
    return _this;
  }

  var _proto = SubscriptionMethod.prototype;

  _proto.constructPayload = function constructPayload(method, param, options) {
    var rpcMethod = method;
    var payload = [];
    payload.push(param);

    if (options) {
      payload.push(options);
    }

    rpcMethod = this.messenger.setRPCPrefix(method, this.messenger.chainPrefix);
    return this.jsonRpc.toPayload(rpcMethod, payload);
  };

  _proto.start = /*#__PURE__*/function () {
    var _start = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _this2 = this;

      var subscribePayload, id;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              subscribePayload = this.constructPayload(RPCMethod.Subscribe, this.param, this.options);
              _context.prev = 1;
              _context.next = 4;
              return _WSProvider.prototype.subscribe.call(this, subscribePayload);

            case 4:
              id = _context.sent;
              this.subscriptionId = id;
              this.on(id, function (result) {
                var output = _this2.onNewSubscriptionItem(result);

                _this2.emitter.emit('data', output);
              });
              this.once('error', function (error) {
                _this2.removeEventListener(id);

                _this2.emitter.emit('error', error);

                _this2.removeEventListener('*');
              });
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              this.emitter.emit('error', _context.t0);
              this.removeEventListener('*');

            case 14:
              return _context.abrupt("return", this);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 10]]);
    }));

    function start() {
      return _start.apply(this, arguments);
    }

    return start;
  }();

  _proto.unsubscribe = function unsubscribe() {
    var unsubscribePayload = this.constructPayload(RPCMethod.UnSubscribe, this.subscriptionId);
    return _WSProvider.prototype.unsubscribe.call(this, unsubscribePayload);
  };

  _proto.onNewSubscriptionItem = function onNewSubscriptionItem(subscriptionItem) {
    return subscriptionItem;
  };

  return SubscriptionMethod;
}(WSProvider);

var LogSub = /*#__PURE__*/function (_SubscriptionMethod) {
  _inheritsLoose(LogSub, _SubscriptionMethod);

  function LogSub(options, messenger, shardID) {
    var _this;

    if (shardID === void 0) {
      shardID = 0;
    }

    _this = _SubscriptionMethod.call(this, 'logs', options, messenger, shardID) || this;

    _this.preprocess();

    return _this;
  }

  var _proto = LogSub.prototype;

  _proto.preprocess = /*#__PURE__*/function () {
    var _preprocess = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _this2 = this;

      var getPastLogs, logs;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.options.fromBlock && this.options.fromBlock !== 'latest' || this.options.fromBlock === 0 || this.options.fromBlock === '0x')) {
                _context.next = 14;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return this.messenger.send(RPCMethod.GetPastLogs, [].concat(this.options), this.messenger.chainType, this.shardID);

            case 4:
              getPastLogs = _context.sent;

              if (getPastLogs.isError()) {
                this.emitter.emit('error', getPastLogs.error.message);
              } else {
                logs = getPastLogs.result;
                logs.forEach(function (log) {
                  var formattedLog = _this2.onNewSubscriptionItem(log);

                  _this2.emitter.emit('data', formattedLog);
                });
              }

              delete this.options.fromBlock; // const sub = this.start();

              return _context.abrupt("return", this.start());

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              this.emitter.emit('error', _context.t0);
              throw _context.t0;

            case 14:
              return _context.abrupt("return", this.start());

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 10]]);
    }));

    function preprocess() {
      return _preprocess.apply(this, arguments);
    }

    return preprocess;
  }();

  _proto.onNewSubscriptionItem = function onNewSubscriptionItem(subscriptionItem) {
    // todo log formatter
    var log = subscriptionItem;

    if (log.removed) {
      this.emitter.emit('changed', log);
    }

    return log;
  };

  return LogSub;
}(SubscriptionMethod);

/**
 * ### Description:
 * Subscribes to incoming block headers. This can be used as timer to check for changes on the blockchain.
 */

var NewHeaders = /*#__PURE__*/function (_SubscriptionMethod) {
  _inheritsLoose(NewHeaders, _SubscriptionMethod);

  function NewHeaders(messenger, shardID) {
    var _this;

    if (shardID === void 0) {
      shardID = 0;
    }

    _this = _SubscriptionMethod.call(this, 'newHeads', undefined, messenger, shardID) || this;

    _this.start();

    return _this;
  }

  return NewHeaders;
}(SubscriptionMethod);

/**
 * ### Description:
 * Subscribes to incoming pending transactions
 */

var NewPendingTransactions = /*#__PURE__*/function (_SubscriptionMethod) {
  _inheritsLoose(NewPendingTransactions, _SubscriptionMethod);

  function NewPendingTransactions(messenger, shardID) {
    var _this;

    if (shardID === void 0) {
      shardID = 0;
    }

    _this = _SubscriptionMethod.call(this, 'newPendingTransactions', undefined, messenger, shardID) || this;

    _this.start();

    return _this;
  }

  return NewPendingTransactions;
}(SubscriptionMethod);

var Syncing = /*#__PURE__*/function (_SubscriptionMethod) {
  _inheritsLoose(Syncing, _SubscriptionMethod);

  function Syncing(messenger, shardID) {
    var _this;

    if (shardID === void 0) {
      shardID = 0;
    }

    _this = _SubscriptionMethod.call(this, 'syncing', undefined, messenger, shardID) || this;
    _this.isSyncing = null;

    _this.start();

    return _this;
  }

  var _proto = Syncing.prototype;

  _proto.onNewSubscriptionItem = function onNewSubscriptionItem(subscriptionItem) {
    var isSyncing = subscriptionItem.params.result.syncing;

    if (this.isSyncing === null) {
      this.isSyncing = isSyncing;
      this.emitter.emit('changed', this.isSyncing);
    }

    if (this.isSyncing === true && isSyncing === false) {
      this.isSyncing = isSyncing;
      this.emitter.emit('changed', this.isSyncing);
    }

    if (this.isSyncing === false && isSyncing === true) {
      this.isSyncing = isSyncing;
      this.emitter.emit('changed', this.isSyncing);
    } // todo formatter


    return subscriptionItem;
  };

  return Syncing;
}(SubscriptionMethod);

/**
 * @packageDocumentation
 * @module avalanche-network
 * @hidden
 */

/**
 * @function getResultForData
 * @description get result for data by default
 * @param  {any} data - object get from provider
 * @return {any} data result or data
 */
function getResultForData(data) {
  if (data.result) {
    return data.getResult;
  }

  if (data.error) {
    return data.getError;
  }

  return data.getRaw;
}
function getRawForData(data) {
  return data.getRaw;
}
function onResponse(response) {
  if (response.responseType === 'result') {
    return response.getResult;
  } else if (response.responseType === 'error') {
    return response.getError;
  } else {
    return response.raw;
  }
}

export { BaseBlockTracker, BaseProvider, BaseSocket, DEFAULT_HEADERS, DEFAULT_TIMEOUT, EmittType, Emitter, HttpProvider, JsonRpc, LogSub, Messenger, MiddlewareType, NewHeaders, NewPendingTransactions, PollingBlockTracker, Provider, ProviderType, RPCErrorCode, RPCMethod, ResponseMiddleware, SocketConnection, SocketState, SubscribeBlockTracker, SubscribeReturns, SubscriptionMethod, Syncing, WSProvider, composeMiddleware, fetchRPC, getRawForData, getResultForData, onResponse, performRPC, timeout };
//# sourceMappingURL=avalanche-js-network.esm.js.map
