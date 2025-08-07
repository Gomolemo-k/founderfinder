
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.7.0";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, l = true;
        try {
          e[o](i, i.exports, t), l = false;
        } finally {
          l && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var l = e2.length; l > 0 && e2[l - 1][2] > i; l--) e2[l] = e2[l - 1];
            e2[l] = [o, n, i];
            return;
          }
          for (var a = 1 / 0, l = 0; l < e2.length; l++) {
            for (var [o, n, i] = e2[l], f = true, u = 0; u < o.length; u++) a >= i && Object.keys(t.O).every((e3) => t.O[e3](o[u])) ? o.splice(u--, 1) : (f = false, i < a && (a = i));
            if (f) {
              e2.splice(l--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 993: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [l, a, f] = o2, u = 0;
          if (l.some((r4) => 0 !== e2[r4])) {
            for (n in a) t.o(a, n) && (t.m[n] = a[n]);
            if (f) var s = f(t);
          }
          for (r3 && r3(o2); u < l.length; u++) i = l[u], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/middleware.js
var require_middleware = __commonJS({
  ".next/server/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[826], { 67: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 195: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 468: () => {
    }, 968: (e, t, r) => {
      "use strict";
      let a, n;
      r.r(t), r.d(t, { default: () => tJ });
      var i, o, s, l, c, d, u, p, h, f, g, m, b = {};
      async function y() {
        let e10 = "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && (await _ENTRIES.middleware_instrumentation).register;
        if (e10) try {
          await e10();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      r.r(b), r.d(b, { config: () => tK, middleware: () => tV });
      let w = null;
      function v() {
        return w || (w = y()), w;
      }
      function S(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t2 = new Proxy(function() {
        }, { get(t3, r2) {
          if ("then" === r2) return {};
          throw Error(S(e10));
        }, construct() {
          throw Error(S(e10));
        }, apply(r2, a2, n2) {
          if ("function" == typeof n2[0]) return n2[0](t2);
          throw Error(S(e10));
        } });
        return new Proxy({}, { get: () => t2 });
      }, enumerable: false, configurable: false }), v();
      class _ extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class x extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class E extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let P = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", appMetadataRoute: "app-metadata-route", appRouteHandler: "app-route-handler" };
      function O(e10) {
        var t2, r2, a2, n2, i2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e10.length && /\s/.test(e10.charAt(s2)); ) s2 += 1;
          return s2 < e10.length;
        }
        for (; s2 < e10.length; ) {
          for (t2 = s2, i2 = false; l2(); ) if ("," === (r2 = e10.charAt(s2))) {
            for (a2 = s2, s2 += 1, l2(), n2 = s2; s2 < e10.length && "=" !== (r2 = e10.charAt(s2)) && ";" !== r2 && "," !== r2; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (i2 = true, s2 = n2, o2.push(e10.substring(t2, a2)), t2 = s2) : s2 = a2 + 1;
          } else s2 += 1;
          (!i2 || s2 >= e10.length) && o2.push(e10.substring(t2, e10.length));
        }
        return o2;
      }
      function T(e10) {
        let t2 = {}, r2 = [];
        if (e10) for (let [a2, n2] of e10.entries()) "set-cookie" === a2.toLowerCase() ? (r2.push(...O(n2)), t2[a2] = 1 === r2.length ? r2[0] : r2) : t2[a2] = n2;
        return t2;
      }
      function R(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t2) {
          throw Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t2 });
        }
      }
      ({ ...P, GROUP: { serverOnly: [P.reactServerComponents, P.actionBrowser, P.appMetadataRoute, P.appRouteHandler, P.instrument], clientOnly: [P.serverSideRendering, P.appPagesBrowser], nonClientServerTarget: [P.middleware, P.api], app: [P.reactServerComponents, P.actionBrowser, P.appMetadataRoute, P.appRouteHandler, P.serverSideRendering, P.appPagesBrowser, P.shared, P.instrument] } });
      let C = Symbol("response"), A = Symbol("passThrough"), N = Symbol("waitUntil");
      class I {
        constructor(e10) {
          this[N] = [], this[A] = false;
        }
        respondWith(e10) {
          this[C] || (this[C] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[A] = true;
        }
        waitUntil(e10) {
          this[N].push(e10);
        }
      }
      class k extends I {
        constructor(e10) {
          super(e10.request), this.sourcePage = e10.page;
        }
        get request() {
          throw new _({ page: this.sourcePage });
        }
        respondWith() {
          throw new _({ page: this.sourcePage });
        }
      }
      function M(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function L(e10) {
        let t2 = e10.indexOf("#"), r2 = e10.indexOf("?"), a2 = r2 > -1 && (t2 < 0 || r2 < t2);
        return a2 || t2 > -1 ? { pathname: e10.substring(0, a2 ? r2 : t2), query: a2 ? e10.substring(r2, t2 > -1 ? t2 : void 0) : "", hash: t2 > -1 ? e10.slice(t2) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function j(e10, t2) {
        if (!e10.startsWith("/") || !t2) return e10;
        let { pathname: r2, query: a2, hash: n2 } = L(e10);
        return "" + t2 + r2 + a2 + n2;
      }
      function D(e10, t2) {
        if (!e10.startsWith("/") || !t2) return e10;
        let { pathname: r2, query: a2, hash: n2 } = L(e10);
        return "" + r2 + t2 + a2 + n2;
      }
      function H(e10, t2) {
        if ("string" != typeof e10) return false;
        let { pathname: r2 } = L(e10);
        return r2 === t2 || r2.startsWith(t2 + "/");
      }
      function U(e10, t2) {
        let r2;
        let a2 = e10.split("/");
        return (t2 || []).some((t3) => !!a2[1] && a2[1].toLowerCase() === t3.toLowerCase() && (r2 = t3, a2.splice(1, 1), e10 = a2.join("/") || "/", true)), { pathname: e10, detectedLocale: r2 };
      }
      let B = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function W(e10, t2) {
        return new URL(String(e10).replace(B, "localhost"), t2 && String(t2).replace(B, "localhost"));
      }
      let V = Symbol("NextURLInternal");
      class K {
        constructor(e10, t2, r2) {
          let a2, n2;
          "object" == typeof t2 && "pathname" in t2 || "string" == typeof t2 ? (a2 = t2, n2 = r2 || {}) : n2 = r2 || t2 || {}, this[V] = { url: W(e10, a2 ?? n2.base), options: n2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t2, r2, a2, n2;
          let i2 = function(e11, t3) {
            var r3, a3;
            let { basePath: n3, i18n: i3, trailingSlash: o3 } = null != (r3 = t3.nextConfig) ? r3 : {}, s3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : o3 };
            n3 && H(s3.pathname, n3) && (s3.pathname = function(e12, t4) {
              if (!H(e12, t4)) return e12;
              let r4 = e12.slice(t4.length);
              return r4.startsWith("/") ? r4 : "/" + r4;
            }(s3.pathname, n3), s3.basePath = n3);
            let l2 = s3.pathname;
            if (s3.pathname.startsWith("/_next/data/") && s3.pathname.endsWith(".json")) {
              let e12 = s3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r4 = e12[0];
              s3.buildId = r4, l2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t3.parseData && (s3.pathname = l2);
            }
            if (i3) {
              let e12 = t3.i18nProvider ? t3.i18nProvider.analyze(s3.pathname) : U(s3.pathname, i3.locales);
              s3.locale = e12.detectedLocale, s3.pathname = null != (a3 = e12.pathname) ? a3 : s3.pathname, !e12.detectedLocale && s3.buildId && (e12 = t3.i18nProvider ? t3.i18nProvider.analyze(l2) : U(l2, i3.locales)).detectedLocale && (s3.locale = e12.detectedLocale);
            }
            return s3;
          }(this[V].url.pathname, { nextConfig: this[V].options.nextConfig, parseData: true, i18nProvider: this[V].options.i18nProvider }), o2 = function(e11, t3) {
            let r3;
            if ((null == t3 ? void 0 : t3.host) && !Array.isArray(t3.host)) r3 = t3.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r3 = e11.hostname;
            }
            return r3.toLowerCase();
          }(this[V].url, this[V].options.headers);
          this[V].domainLocale = this[V].options.i18nProvider ? this[V].options.i18nProvider.detectDomainLocale(o2) : function(e11, t3, r3) {
            if (e11) for (let i3 of (r3 && (r3 = r3.toLowerCase()), e11)) {
              var a3, n3;
              if (t3 === (null == (a3 = i3.domain) ? void 0 : a3.split(":", 1)[0].toLowerCase()) || r3 === i3.defaultLocale.toLowerCase() || (null == (n3 = i3.locales) ? void 0 : n3.some((e12) => e12.toLowerCase() === r3))) return i3;
            }
          }(null == (t2 = this[V].options.nextConfig) ? void 0 : null == (e10 = t2.i18n) ? void 0 : e10.domains, o2);
          let s2 = (null == (r2 = this[V].domainLocale) ? void 0 : r2.defaultLocale) || (null == (n2 = this[V].options.nextConfig) ? void 0 : null == (a2 = n2.i18n) ? void 0 : a2.defaultLocale);
          this[V].url.pathname = i2.pathname, this[V].defaultLocale = s2, this[V].basePath = i2.basePath ?? "", this[V].buildId = i2.buildId, this[V].locale = i2.locale ?? s2, this[V].trailingSlash = i2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t2;
          return t2 = function(e11, t3, r2, a2) {
            if (!t3 || t3 === r2) return e11;
            let n2 = e11.toLowerCase();
            return !a2 && (H(n2, "/api") || H(n2, "/" + t3.toLowerCase())) ? e11 : j(e11, "/" + t3);
          }((e10 = { basePath: this[V].basePath, buildId: this[V].buildId, defaultLocale: this[V].options.forceLocale ? void 0 : this[V].defaultLocale, locale: this[V].locale, pathname: this[V].url.pathname, trailingSlash: this[V].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t2 = M(t2)), e10.buildId && (t2 = D(j(t2, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t2 = j(t2, e10.basePath), !e10.buildId && e10.trailingSlash ? t2.endsWith("/") ? t2 : D(t2, "/") : M(t2);
        }
        formatSearch() {
          return this[V].url.search;
        }
        get buildId() {
          return this[V].buildId;
        }
        set buildId(e10) {
          this[V].buildId = e10;
        }
        get locale() {
          return this[V].locale ?? "";
        }
        set locale(e10) {
          var t2, r2;
          if (!this[V].locale || !(null == (r2 = this[V].options.nextConfig) ? void 0 : null == (t2 = r2.i18n) ? void 0 : t2.locales.includes(e10))) throw TypeError(`The NextURL configuration includes no locale "${e10}"`);
          this[V].locale = e10;
        }
        get defaultLocale() {
          return this[V].defaultLocale;
        }
        get domainLocale() {
          return this[V].domainLocale;
        }
        get searchParams() {
          return this[V].url.searchParams;
        }
        get host() {
          return this[V].url.host;
        }
        set host(e10) {
          this[V].url.host = e10;
        }
        get hostname() {
          return this[V].url.hostname;
        }
        set hostname(e10) {
          this[V].url.hostname = e10;
        }
        get port() {
          return this[V].url.port;
        }
        set port(e10) {
          this[V].url.port = e10;
        }
        get protocol() {
          return this[V].url.protocol;
        }
        set protocol(e10) {
          this[V].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t2 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t2}${this.hash}`;
        }
        set href(e10) {
          this[V].url = W(e10), this.analyze();
        }
        get origin() {
          return this[V].url.origin;
        }
        get pathname() {
          return this[V].url.pathname;
        }
        set pathname(e10) {
          this[V].url.pathname = e10;
        }
        get hash() {
          return this[V].url.hash;
        }
        set hash(e10) {
          this[V].url.hash = e10;
        }
        get search() {
          return this[V].url.search;
        }
        set search(e10) {
          this[V].url.search = e10;
        }
        get password() {
          return this[V].url.password;
        }
        set password(e10) {
          this[V].url.password = e10;
        }
        get username() {
          return this[V].url.username;
        }
        set username(e10) {
          this[V].url.username = e10;
        }
        get basePath() {
          return this[V].basePath;
        }
        set basePath(e10) {
          this[V].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new K(String(this), this[V].options);
        }
      }
      var $ = r(945);
      let q = Symbol("internal request");
      class G extends Request {
        constructor(e10, t2 = {}) {
          let r2 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          R(r2), e10 instanceof Request ? super(e10, t2) : super(r2, t2);
          let a2 = new K(r2, { headers: T(this.headers), nextConfig: t2.nextConfig });
          this[q] = { cookies: new $.RequestCookies(this.headers), geo: t2.geo || {}, ip: t2.ip, nextUrl: a2, url: a2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, geo: this.geo, ip: this.ip, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[q].cookies;
        }
        get geo() {
          return this[q].geo;
        }
        get ip() {
          return this[q].ip;
        }
        get nextUrl() {
          return this[q].nextUrl;
        }
        get page() {
          throw new x();
        }
        get ua() {
          throw new E();
        }
        get url() {
          return this[q].url;
        }
      }
      class J {
        static get(e10, t2, r2) {
          let a2 = Reflect.get(e10, t2, r2);
          return "function" == typeof a2 ? a2.bind(e10) : a2;
        }
        static set(e10, t2, r2, a2) {
          return Reflect.set(e10, t2, r2, a2);
        }
        static has(e10, t2) {
          return Reflect.has(e10, t2);
        }
        static deleteProperty(e10, t2) {
          return Reflect.deleteProperty(e10, t2);
        }
      }
      let F = Symbol("internal response"), z = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function X(e10, t2) {
        var r2;
        if (null == e10 ? void 0 : null == (r2 = e10.request) ? void 0 : r2.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r3 = [];
          for (let [a2, n2] of e10.request.headers) t2.set("x-middleware-request-" + a2, n2), r3.push(a2);
          t2.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class Y extends Response {
        constructor(e10, t2 = {}) {
          super(e10, t2);
          let r2 = this.headers, a2 = new Proxy(new $.ResponseCookies(r2), { get(e11, a3, n2) {
            switch (a3) {
              case "delete":
              case "set":
                return (...n3) => {
                  let i2 = Reflect.apply(e11[a3], e11, n3), o2 = new Headers(r2);
                  return i2 instanceof $.ResponseCookies && r2.set("x-middleware-set-cookie", i2.getAll().map((e12) => (0, $.stringifyCookie)(e12)).join(",")), X(t2, o2), i2;
                };
              default:
                return J.get(e11, a3, n2);
            }
          } });
          this[F] = { cookies: a2, url: t2.url ? new K(t2.url, { headers: T(r2), nextConfig: t2.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[F].cookies;
        }
        static json(e10, t2) {
          let r2 = Response.json(e10, t2);
          return new Y(r2.body, r2);
        }
        static redirect(e10, t2) {
          let r2 = "number" == typeof t2 ? t2 : (null == t2 ? void 0 : t2.status) ?? 307;
          if (!z.has(r2)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let a2 = "object" == typeof t2 ? t2 : {}, n2 = new Headers(null == a2 ? void 0 : a2.headers);
          return n2.set("Location", R(e10)), new Y(null, { ...a2, headers: n2, status: r2 });
        }
        static rewrite(e10, t2) {
          let r2 = new Headers(null == t2 ? void 0 : t2.headers);
          return r2.set("x-middleware-rewrite", R(e10)), X(t2, r2), new Y(null, { ...t2, headers: r2 });
        }
        static next(e10) {
          let t2 = new Headers(null == e10 ? void 0 : e10.headers);
          return t2.set("x-middleware-next", "1"), X(e10, t2), new Y(null, { ...e10, headers: t2 });
        }
      }
      function Z(e10, t2) {
        let r2 = "string" == typeof t2 ? new URL(t2) : t2, a2 = new URL(e10, t2), n2 = r2.protocol + "//" + r2.host;
        return a2.protocol + "//" + a2.host === n2 ? a2.toString().replace(n2, "") : a2.toString();
      }
      let Q = [["RSC"], ["Next-Router-State-Tree"], ["Next-Router-Prefetch"]], ee = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], et = ["__nextDataReq"];
      class er extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new er();
        }
      }
      class ea extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t2, r2, a2) {
            if ("symbol" == typeof r2) return J.get(t2, r2, a2);
            let n2 = r2.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            if (void 0 !== i2) return J.get(t2, i2, a2);
          }, set(t2, r2, a2, n2) {
            if ("symbol" == typeof r2) return J.set(t2, r2, a2, n2);
            let i2 = r2.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            return J.set(t2, o2 ?? r2, a2, n2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return J.has(t2, r2);
            let a2 = r2.toLowerCase(), n2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return void 0 !== n2 && J.has(t2, n2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return J.deleteProperty(t2, r2);
            let a2 = r2.toLowerCase(), n2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return void 0 === n2 || J.deleteProperty(t2, n2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return er.callable;
              default:
                return J.get(e11, t2, r2);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new ea(e10);
        }
        append(e10, t2) {
          let r2 = this.headers[e10];
          "string" == typeof r2 ? this.headers[e10] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e10] = t2;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t2 = this.headers[e10];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t2) {
          this.headers[e10] = t2;
        }
        forEach(e10, t2) {
          for (let [r2, a2] of this.entries()) e10.call(t2, a2, r2, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t2 = e10.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t2 = e10.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t2 = this.get(e10);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let en = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class ei {
        disable() {
          throw en;
        }
        getStore() {
        }
        run() {
          throw en;
        }
        exit() {
          throw en;
        }
        enterWith() {
          throw en;
        }
      }
      let eo = globalThis.AsyncLocalStorage;
      function es() {
        return eo ? new eo() : new ei();
      }
      let el = es();
      class ec extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
        }
        static callable() {
          throw new ec();
        }
      }
      class ed {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return ec.callable;
              default:
                return J.get(e11, t2, r2);
            }
          } });
        }
      }
      let eu = Symbol.for("next.mutated.cookies");
      class ep {
        static wrap(e10, t2) {
          let r2 = new $.ResponseCookies(new Headers());
          for (let t3 of e10.getAll()) r2.set(t3);
          let a2 = [], n2 = /* @__PURE__ */ new Set(), i2 = () => {
            let e11 = el.getStore();
            if (e11 && (e11.pathWasRevalidated = true), a2 = r2.getAll().filter((e12) => n2.has(e12.name)), t2) {
              let e12 = [];
              for (let t3 of a2) {
                let r3 = new $.ResponseCookies(new Headers());
                r3.set(t3), e12.push(r3.toString());
              }
              t2(e12);
            }
          };
          return new Proxy(r2, { get(e11, t3, r3) {
            switch (t3) {
              case eu:
                return a2;
              case "delete":
                return function(...t4) {
                  n2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    e11.delete(...t4);
                  } finally {
                    i2();
                  }
                };
              case "set":
                return function(...t4) {
                  n2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e11.set(...t4);
                  } finally {
                    i2();
                  }
                };
              default:
                return J.get(e11, t3, r3);
            }
          } });
        }
      }
      !function(e10) {
        e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404";
      }(i || (i = {})), function(e10) {
        e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents";
      }(o || (o = {})), function(e10) {
        e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer";
      }(s || (s = {})), function(e10) {
        e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch";
      }(l || (l = {})), (c || (c = {})).startServer = "startServer.startServer", function(e10) {
        e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult";
      }(d || (d = {})), function(e10) {
        e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch";
      }(u || (u = {})), (p || (p = {})).executeRoute = "Router.executeRoute", (h || (h = {})).runHandler = "Node.runHandler", (f || (f = {})).runHandler = "AppRouteRouteHandlers.runHandler", function(e10) {
        e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport";
      }(g || (g = {})), (m || (m = {})).execute = "Middleware.execute";
      let eh = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], ef = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"], { context: eg, propagation: em, trace: eb, SpanStatusCode: ey, SpanKind: ew, ROOT_CONTEXT: ev } = a = r(439), eS = (e10) => null !== e10 && "object" == typeof e10 && "function" == typeof e10.then, e_ = (e10, t2) => {
        (null == t2 ? void 0 : t2.bubble) === true ? e10.setAttribute("next.bubble", true) : (t2 && e10.recordException(t2), e10.setStatus({ code: ey.ERROR, message: null == t2 ? void 0 : t2.message })), e10.end();
      }, ex = /* @__PURE__ */ new Map(), eE = a.createContextKey("next.rootSpanId"), eP = 0, eO = () => eP++;
      class eT {
        getTracerInstance() {
          return eb.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eg;
        }
        getActiveScopeSpan() {
          return eb.getSpan(null == eg ? void 0 : eg.active());
        }
        withPropagatedContext(e10, t2, r2) {
          let a2 = eg.active();
          if (eb.getSpanContext(a2)) return t2();
          let n2 = em.extract(a2, e10, r2);
          return eg.with(n2, t2);
        }
        trace(...e10) {
          var t2;
          let [r2, a2, n2] = e10, { fn: i2, options: o2 } = "function" == typeof a2 ? { fn: a2, options: {} } : { fn: n2, options: { ...a2 } }, s2 = o2.spanName ?? r2;
          if (!eh.includes(r2) && "1" !== process.env.NEXT_OTEL_VERBOSE || o2.hideSpan) return i2();
          let l2 = this.getSpanContext((null == o2 ? void 0 : o2.parentSpan) ?? this.getActiveScopeSpan()), c2 = false;
          l2 ? (null == (t2 = eb.getSpanContext(l2)) ? void 0 : t2.isRemote) && (c2 = true) : (l2 = (null == eg ? void 0 : eg.active()) ?? ev, c2 = true);
          let d2 = eO();
          return o2.attributes = { "next.span_name": s2, "next.span_type": r2, ...o2.attributes }, eg.with(l2.setValue(eE, d2), () => this.getTracerInstance().startActiveSpan(s2, o2, (e11) => {
            let t3 = "performance" in globalThis ? globalThis.performance.now() : void 0, a3 = () => {
              ex.delete(d2), t3 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && ef.includes(r2 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r2.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t3, end: performance.now() });
            };
            c2 && ex.set(d2, new Map(Object.entries(o2.attributes ?? {})));
            try {
              if (i2.length > 1) return i2(e11, (t5) => e_(e11, t5));
              let t4 = i2(e11);
              if (eS(t4)) return t4.then((t5) => (e11.end(), t5)).catch((t5) => {
                throw e_(e11, t5), t5;
              }).finally(a3);
              return e11.end(), a3(), t4;
            } catch (t4) {
              throw e_(e11, t4), a3(), t4;
            }
          }));
        }
        wrap(...e10) {
          let t2 = this, [r2, a2, n2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eh.includes(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = a2;
            "function" == typeof e11 && "function" == typeof n2 && (e11 = e11.apply(this, arguments));
            let i2 = arguments.length - 1, o2 = arguments[i2];
            if ("function" != typeof o2) return t2.trace(r2, e11, () => n2.apply(this, arguments));
            {
              let a3 = t2.getContext().bind(eg.active(), o2);
              return t2.trace(r2, e11, (e12, t3) => (arguments[i2] = function(e13) {
                return null == t3 || t3(e13), a3.apply(this, arguments);
              }, n2.apply(this, arguments)));
            }
          } : n2;
        }
        startSpan(...e10) {
          let [t2, r2] = e10, a2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t2, r2, a2);
        }
        getSpanContext(e10) {
          return e10 ? eb.setSpan(eg.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eg.active().getValue(eE);
          return ex.get(e10);
        }
      }
      let eR = (() => {
        let e10 = new eT();
        return () => e10;
      })(), eC = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eC);
      class eA {
        constructor(e10, t2, r2, a2) {
          var n2;
          let i2 = e10 && function(e11, t3) {
            let r3 = ea.from(e11.headers);
            return { isOnDemandRevalidate: r3.get("x-prerender-revalidate") === t3.previewModeId, revalidateOnlyGenerated: r3.has("x-prerender-revalidate-if-generated") };
          }(t2, e10).isOnDemandRevalidate, o2 = null == (n2 = r2.get(eC)) ? void 0 : n2.value;
          this.isEnabled = !!(!i2 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = a2;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: eC, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: eC, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function eN(e10, t2) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r2 = e10.headers["x-middleware-set-cookie"], a2 = new Headers();
          for (let e11 of O(r2)) a2.append("set-cookie", e11);
          for (let e11 of new $.ResponseCookies(a2).getAll()) t2.set(e11);
        }
      }
      let eI = { wrap(e10, { req: t2, res: r2, renderOpts: a2 }, n2) {
        let i2;
        function o2(e11) {
          r2 && r2.setHeader("Set-Cookie", e11);
        }
        a2 && "previewProps" in a2 && (i2 = a2.previewProps);
        let s2 = {}, l2 = { get headers() {
          return s2.headers || (s2.headers = function(e11) {
            let t3 = ea.from(e11);
            for (let e12 of Q) t3.delete(e12.toString().toLowerCase());
            return ea.seal(t3);
          }(t2.headers)), s2.headers;
        }, get cookies() {
          if (!s2.cookies) {
            let e11 = new $.RequestCookies(ea.from(t2.headers));
            eN(t2, e11), s2.cookies = ed.seal(e11);
          }
          return s2.cookies;
        }, get mutableCookies() {
          if (!s2.mutableCookies) {
            let e11 = function(e12, t3) {
              let r3 = new $.RequestCookies(ea.from(e12));
              return ep.wrap(r3, t3);
            }(t2.headers, (null == a2 ? void 0 : a2.onUpdateCookies) || (r2 ? o2 : void 0));
            eN(t2, e11), s2.mutableCookies = e11;
          }
          return s2.mutableCookies;
        }, get draftMode() {
          return s2.draftMode || (s2.draftMode = new eA(i2, t2, this.cookies, this.mutableCookies)), s2.draftMode;
        }, reactLoadableManifest: (null == a2 ? void 0 : a2.reactLoadableManifest) || {}, assetPrefix: (null == a2 ? void 0 : a2.assetPrefix) || "" };
        return e10.run(l2, n2, l2);
      } }, ek = es();
      function eM() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      class eL extends G {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new _({ page: this.sourcePage });
        }
        respondWith() {
          throw new _({ page: this.sourcePage });
        }
        waitUntil() {
          throw new _({ page: this.sourcePage });
        }
      }
      let ej = { keys: (e10) => Array.from(e10.keys()), get: (e10, t2) => e10.get(t2) ?? void 0 }, eD = (e10, t2) => eR().withPropagatedContext(e10.headers, t2, ej), eH = false;
      async function eU(e10) {
        let t2, a2;
        !function() {
          if (!eH && (eH = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e11, wrapRequestHandler: t3 } = r(177);
            e11(), eD = t3(eD);
          }
        }(), await v();
        let n2 = void 0 !== self.__BUILD_MANIFEST;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let i2 = new K(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...i2.searchParams.keys()]) {
          let t3 = i2.searchParams.getAll(e11);
          !function(e12, t4) {
            for (let r2 of ["nxtP", "nxtI"]) e12 !== r2 && e12.startsWith(r2) && t4(e12.substring(r2.length));
          }(e11, (r2) => {
            for (let e12 of (i2.searchParams.delete(r2), t3)) i2.searchParams.append(r2, e12);
            i2.searchParams.delete(e11);
          });
        }
        let o2 = i2.buildId;
        i2.buildId = "";
        let s2 = e10.request.headers["x-nextjs-data"];
        s2 && "/index" === i2.pathname && (i2.pathname = "/");
        let l2 = function(e11) {
          let t3 = new Headers();
          for (let [r2, a3] of Object.entries(e11)) for (let e12 of Array.isArray(a3) ? a3 : [a3]) void 0 !== e12 && ("number" == typeof e12 && (e12 = e12.toString()), t3.append(r2, e12));
          return t3;
        }(e10.request.headers), c2 = /* @__PURE__ */ new Map();
        if (!n2) for (let e11 of Q) {
          let t3 = e11.toString().toLowerCase();
          l2.get(t3) && (c2.set(t3, l2.get(t3)), l2.delete(t3));
        }
        let d2 = new eL({ page: e10.page, input: function(e11, t3) {
          let r2 = "string" == typeof e11, a3 = r2 ? new URL(e11) : e11;
          for (let e12 of ee) a3.searchParams.delete(e12);
          if (t3) for (let e12 of et) a3.searchParams.delete(e12);
          return r2 ? a3.toString() : a3;
        }(i2, true).toString(), init: { body: e10.request.body, geo: e10.request.geo, headers: l2, ip: e10.request.ip, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        s2 && Object.defineProperty(d2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: eM() }) }));
        let u2 = new k({ request: d2, page: e10.page });
        if ((t2 = await eD(d2, () => "/middleware" === e10.page || "/src/middleware" === e10.page ? eR().trace(m.execute, { spanName: `middleware ${d2.method} ${d2.nextUrl.pathname}`, attributes: { "http.target": d2.nextUrl.pathname, "http.method": d2.method } }, () => eI.wrap(ek, { req: d2, renderOpts: { onUpdateCookies: (e11) => {
          a2 = e11;
        }, previewProps: eM() } }, () => e10.handler(d2, u2))) : e10.handler(d2, u2))) && !(t2 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        t2 && a2 && t2.headers.set("set-cookie", a2);
        let p2 = null == t2 ? void 0 : t2.headers.get("x-middleware-rewrite");
        if (t2 && p2 && !n2) {
          let r2 = new K(p2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          r2.host === d2.nextUrl.host && (r2.buildId = o2 || r2.buildId, t2.headers.set("x-middleware-rewrite", String(r2)));
          let a3 = Z(String(r2), String(i2));
          s2 && t2.headers.set("x-nextjs-rewrite", a3);
        }
        let h2 = null == t2 ? void 0 : t2.headers.get("Location");
        if (t2 && h2 && !n2) {
          let r2 = new K(h2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          t2 = new Response(t2.body, t2), r2.host === d2.nextUrl.host && (r2.buildId = o2 || r2.buildId, t2.headers.set("Location", String(r2))), s2 && (t2.headers.delete("Location"), t2.headers.set("x-nextjs-redirect", Z(String(r2), String(i2))));
        }
        let f2 = t2 || Y.next(), g2 = f2.headers.get("x-middleware-override-headers"), b2 = [];
        if (g2) {
          for (let [e11, t3] of c2) f2.headers.set(`x-middleware-request-${e11}`, t3), b2.push(e11);
          b2.length > 0 && f2.headers.set("x-middleware-override-headers", g2 + "," + b2.join(","));
        }
        return { response: f2, waitUntil: Promise.all(u2[N]), fetchMetrics: d2.fetchMetrics };
      }
      r(340), "undefined" == typeof URLPattern || URLPattern, r(468);
      var eB = "undefined" != typeof process && process && "function" == typeof process.nextTick ? "function" == typeof setImmediate ? setImmediate : process.nextTick : setTimeout, eW = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), eV = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], eK = [3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946, 1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055, 3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504, 976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462], e$ = [1332899944, 1700884034, 1701343084, 1684370003, 1668446532, 1869963892];
      function eq(e10, t2, r2, a2) {
        var n2 = e10[t2], i2 = e10[t2 + 1];
        return n2 ^= r2[0], i2 ^= (a2[n2 >>> 24] + a2[256 | n2 >> 16 & 255] ^ a2[512 | n2 >> 8 & 255]) + a2[768 | 255 & n2] ^ r2[1], n2 ^= (a2[i2 >>> 24] + a2[256 | i2 >> 16 & 255] ^ a2[512 | i2 >> 8 & 255]) + a2[768 | 255 & i2] ^ r2[2], i2 ^= (a2[n2 >>> 24] + a2[256 | n2 >> 16 & 255] ^ a2[512 | n2 >> 8 & 255]) + a2[768 | 255 & n2] ^ r2[3], n2 ^= (a2[i2 >>> 24] + a2[256 | i2 >> 16 & 255] ^ a2[512 | i2 >> 8 & 255]) + a2[768 | 255 & i2] ^ r2[4], i2 ^= (a2[n2 >>> 24] + a2[256 | n2 >> 16 & 255] ^ a2[512 | n2 >> 8 & 255]) + a2[768 | 255 & n2] ^ r2[5], n2 ^= (a2[i2 >>> 24] + a2[256 | i2 >> 16 & 255] ^ a2[512 | i2 >> 8 & 255]) + a2[768 | 255 & i2] ^ r2[6], i2 ^= (a2[n2 >>> 24] + a2[256 | n2 >> 16 & 255] ^ a2[512 | n2 >> 8 & 255]) + a2[768 | 255 & n2] ^ r2[7], n2 ^= (a2[i2 >>> 24] + a2[256 | i2 >> 16 & 255] ^ a2[512 | i2 >> 8 & 255]) + a2[768 | 255 & i2] ^ r2[8], i2 ^= (a2[n2 >>> 24] + a2[256 | n2 >> 16 & 255] ^ a2[512 | n2 >> 8 & 255]) + a2[768 | 255 & n2] ^ r2[9], n2 ^= (a2[i2 >>> 24] + a2[256 | i2 >> 16 & 255] ^ a2[512 | i2 >> 8 & 255]) + a2[768 | 255 & i2] ^ r2[10], i2 ^= (a2[n2 >>> 24] + a2[256 | n2 >> 16 & 255] ^ a2[512 | n2 >> 8 & 255]) + a2[768 | 255 & n2] ^ r2[11], n2 ^= (a2[i2 >>> 24] + a2[256 | i2 >> 16 & 255] ^ a2[512 | i2 >> 8 & 255]) + a2[768 | 255 & i2] ^ r2[12], i2 ^= (a2[n2 >>> 24] + a2[256 | n2 >> 16 & 255] ^ a2[512 | n2 >> 8 & 255]) + a2[768 | 255 & n2] ^ r2[13], n2 ^= (a2[i2 >>> 24] + a2[256 | i2 >> 16 & 255] ^ a2[512 | i2 >> 8 & 255]) + a2[768 | 255 & i2] ^ r2[14], i2 ^= (a2[n2 >>> 24] + a2[256 | n2 >> 16 & 255] ^ a2[512 | n2 >> 8 & 255]) + a2[768 | 255 & n2] ^ r2[15], n2 ^= (a2[i2 >>> 24] + a2[256 | i2 >> 16 & 255] ^ a2[512 | i2 >> 8 & 255]) + a2[768 | 255 & i2] ^ r2[16], e10[t2] = i2 ^ r2[17], e10[t2 + 1] = n2, e10;
      }
      function eG(e10, t2) {
        for (var r2 = 0, a2 = 0; r2 < 4; ++r2) a2 = a2 << 8 | 255 & e10[t2], t2 = (t2 + 1) % e10.length;
        return { key: a2, offp: t2 };
      }
      function eJ(e10, t2, r2) {
        for (var a2, n2 = 0, i2 = [0, 0], o2 = t2.length, s2 = r2.length, l2 = 0; l2 < o2; l2++) n2 = (a2 = eG(e10, n2)).offp, t2[l2] = t2[l2] ^ a2.key;
        for (l2 = 0; l2 < o2; l2 += 2) i2 = eq(i2, 0, t2, r2), t2[l2] = i2[0], t2[l2 + 1] = i2[1];
        for (l2 = 0; l2 < s2; l2 += 2) i2 = eq(i2, 0, t2, r2), r2[l2] = i2[0], r2[l2 + 1] = i2[1];
      }
      let eF = new TextEncoder(), ez = new TextDecoder();
      function eX(...e10) {
        let t2 = new Uint8Array(e10.reduce((e11, { length: t3 }) => e11 + t3, 0)), r2 = 0;
        for (let a2 of e10) t2.set(a2, r2), r2 += a2.length;
        return t2;
      }
      function eY(e10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e10 ? e10 : ez.decode(e10), { alphabet: "base64url" });
        let t2 = e10;
        t2 instanceof Uint8Array && (t2 = ez.decode(t2)), t2 = t2.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
        try {
          return function(e11) {
            if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e11);
            let t3 = atob(e11), r2 = new Uint8Array(t3.length);
            for (let e12 = 0; e12 < t3.length; e12++) r2[e12] = t3.charCodeAt(e12);
            return r2;
          }(t2);
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }
      function eZ(e10) {
        let t2 = e10;
        return ("string" == typeof t2 && (t2 = eF.encode(t2)), Uint8Array.prototype.toBase64) ? t2.toBase64({ alphabet: "base64url", omitPadding: true }) : function(e11) {
          if (Uint8Array.prototype.toBase64) return e11.toBase64();
          let t3 = [];
          for (let r2 = 0; r2 < e11.length; r2 += 32768) t3.push(String.fromCharCode.apply(null, e11.subarray(r2, r2 + 32768)));
          return btoa(t3.join(""));
        }(t2).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      class eQ extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e10, t2) {
          super(e10, t2), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class e0 extends eQ {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e10, t2, r2 = "unspecified", a2 = "unspecified") {
          super(e10, { cause: { claim: r2, reason: a2, payload: t2 } }), this.claim = r2, this.reason = a2, this.payload = t2;
        }
      }
      class e1 extends eQ {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e10, t2, r2 = "unspecified", a2 = "unspecified") {
          super(e10, { cause: { claim: r2, reason: a2, payload: t2 } }), this.claim = r2, this.reason = a2, this.payload = t2;
        }
      }
      class e2 extends eQ {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class e3 extends eQ {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class e5 extends eQ {
        static code = "ERR_JWS_INVALID";
        code = "ERR_JWS_INVALID";
      }
      class e4 extends eQ {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class e6 extends eQ {
        [Symbol.asyncIterator];
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(e10 = "multiple matching keys found in the JSON Web Key Set", t2) {
          super(e10, t2);
        }
      }
      class e7 extends eQ {
        static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        constructor(e10 = "signature verification failed", t2) {
          super(e10, t2);
        }
      }
      let e9 = (e10, t2) => {
        let r2 = `SHA-${e10.slice(-3)}`;
        switch (e10) {
          case "HS256":
          case "HS384":
          case "HS512":
            return { hash: r2, name: "HMAC" };
          case "PS256":
          case "PS384":
          case "PS512":
            return { hash: r2, name: "RSA-PSS", saltLength: parseInt(e10.slice(-3), 10) >> 3 };
          case "RS256":
          case "RS384":
          case "RS512":
            return { hash: r2, name: "RSASSA-PKCS1-v1_5" };
          case "ES256":
          case "ES384":
          case "ES512":
            return { hash: r2, name: "ECDSA", namedCurve: t2.namedCurve };
          case "Ed25519":
          case "EdDSA":
            return { name: "Ed25519" };
          default:
            throw new e3(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      }, e8 = (e10, t2) => {
        if (e10.startsWith("RS") || e10.startsWith("PS")) {
          let { modulusLength: r2 } = t2.algorithm;
          if ("number" != typeof r2 || r2 < 2048) throw TypeError(`${e10} requires key modulusLength to be 2048 bits or larger`);
        }
      };
      function te(e10, t2 = "algorithm.name") {
        return TypeError(`CryptoKey does not support this operation, its ${t2} must be ${e10}`);
      }
      function tt(e10, t2) {
        return e10.name === t2;
      }
      function tr(e10) {
        return parseInt(e10.name.slice(4), 10);
      }
      function ta(e10, t2, ...r2) {
        if ((r2 = r2.filter(Boolean)).length > 2) {
          let t3 = r2.pop();
          e10 += `one of type ${r2.join(", ")}, or ${t3}.`;
        } else 2 === r2.length ? e10 += `one of type ${r2[0]} or ${r2[1]}.` : e10 += `of type ${r2[0]}.`;
        return null == t2 ? e10 += ` Received ${t2}` : "function" == typeof t2 && t2.name ? e10 += ` Received function ${t2.name}` : "object" == typeof t2 && null != t2 && t2.constructor?.name && (e10 += ` Received an instance of ${t2.constructor.name}`), e10;
      }
      let tn = (e10, ...t2) => ta("Key must be ", e10, ...t2);
      function ti(e10, t2, ...r2) {
        return ta(`Key for the ${e10} algorithm must be `, t2, ...r2);
      }
      let to = async (e10, t2, r2) => {
        if (t2 instanceof Uint8Array) {
          if (!e10.startsWith("HS")) throw TypeError(tn(t2, "CryptoKey", "KeyObject", "JSON Web Key"));
          return crypto.subtle.importKey("raw", t2, { hash: `SHA-${e10.slice(-3)}`, name: "HMAC" }, false, [r2]);
        }
        return !function(e11, t3, r3) {
          switch (t3) {
            case "HS256":
            case "HS384":
            case "HS512": {
              if (!tt(e11.algorithm, "HMAC")) throw te("HMAC");
              let r4 = parseInt(t3.slice(2), 10);
              if (tr(e11.algorithm.hash) !== r4) throw te(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "RS256":
            case "RS384":
            case "RS512": {
              if (!tt(e11.algorithm, "RSASSA-PKCS1-v1_5")) throw te("RSASSA-PKCS1-v1_5");
              let r4 = parseInt(t3.slice(2), 10);
              if (tr(e11.algorithm.hash) !== r4) throw te(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "PS256":
            case "PS384":
            case "PS512": {
              if (!tt(e11.algorithm, "RSA-PSS")) throw te("RSA-PSS");
              let r4 = parseInt(t3.slice(2), 10);
              if (tr(e11.algorithm.hash) !== r4) throw te(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "Ed25519":
            case "EdDSA":
              if (!tt(e11.algorithm, "Ed25519")) throw te("Ed25519");
              break;
            case "ES256":
            case "ES384":
            case "ES512": {
              if (!tt(e11.algorithm, "ECDSA")) throw te("ECDSA");
              let r4 = function(e12) {
                switch (e12) {
                  case "ES256":
                    return "P-256";
                  case "ES384":
                    return "P-384";
                  case "ES512":
                    return "P-521";
                  default:
                    throw Error("unreachable");
                }
              }(t3);
              if (e11.algorithm.namedCurve !== r4) throw te(r4, "algorithm.namedCurve");
              break;
            }
            default:
              throw TypeError("CryptoKey does not support this operation");
          }
          (function(e12, t4) {
            if (t4 && !e12.usages.includes(t4)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${t4}.`);
          })(e11, r3);
        }(t2, e10, r2), t2;
      }, ts = async (e10, t2, r2) => {
        let a2 = await to(e10, t2, "sign");
        return e8(e10, a2), new Uint8Array(await crypto.subtle.sign(e9(e10, a2.algorithm), a2, r2));
      }, tl = (...e10) => {
        let t2;
        let r2 = e10.filter(Boolean);
        if (0 === r2.length || 1 === r2.length) return true;
        for (let e11 of r2) {
          let r3 = Object.keys(e11);
          if (!t2 || 0 === t2.size) {
            t2 = new Set(r3);
            continue;
          }
          for (let e12 of r3) {
            if (t2.has(e12)) return false;
            t2.add(e12);
          }
        }
        return true;
      };
      function tc(e10) {
        return e10?.[Symbol.toStringTag] === "CryptoKey";
      }
      function td(e10) {
        return e10?.[Symbol.toStringTag] === "KeyObject";
      }
      let tu = (e10) => tc(e10) || td(e10), tp = (e10) => {
        if (!/* @__PURE__ */ function(e11) {
          return "object" == typeof e11 && null !== e11;
        }(e10) || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t2 = e10;
        for (; null !== Object.getPrototypeOf(t2); ) t2 = Object.getPrototypeOf(t2);
        return Object.getPrototypeOf(e10) === t2;
      };
      function th(e10) {
        return tp(e10) && "string" == typeof e10.kty;
      }
      let tf = (e10) => e10?.[Symbol.toStringTag], tg = (e10, t2, r2) => {
        if (void 0 !== t2.use) {
          let e11;
          switch (r2) {
            case "sign":
            case "verify":
              e11 = "sig";
              break;
            case "encrypt":
            case "decrypt":
              e11 = "enc";
          }
          if (t2.use !== e11) throw TypeError(`Invalid key for this operation, its "use" must be "${e11}" when present`);
        }
        if (void 0 !== t2.alg && t2.alg !== e10) throw TypeError(`Invalid key for this operation, its "alg" must be "${e10}" when present`);
        if (Array.isArray(t2.key_ops)) {
          let a2;
          switch (true) {
            case ("sign" === r2 || "verify" === r2):
            case "dir" === e10:
            case e10.includes("CBC-HS"):
              a2 = r2;
              break;
            case e10.startsWith("PBES2"):
              a2 = "deriveBits";
              break;
            case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e10):
              a2 = !e10.includes("GCM") && e10.endsWith("KW") ? "encrypt" === r2 ? "wrapKey" : "unwrapKey" : r2;
              break;
            case ("encrypt" === r2 && e10.startsWith("RSA")):
              a2 = "wrapKey";
              break;
            case "decrypt" === r2:
              a2 = e10.startsWith("RSA") ? "unwrapKey" : "deriveBits";
          }
          if (a2 && t2.key_ops?.includes?.(a2) === false) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${a2}" when present`);
        }
        return true;
      }, tm = (e10, t2, r2) => {
        if (!(t2 instanceof Uint8Array)) {
          if (th(t2)) {
            if (function(e11) {
              return "oct" === e11.kty && "string" == typeof e11.k;
            }(t2) && tg(e10, t2, r2)) return;
            throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
          }
          if (!tu(t2)) throw TypeError(ti(e10, t2, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
          if ("secret" !== t2.type) throw TypeError(`${tf(t2)} instances for symmetric algorithms must be of type "secret"`);
        }
      }, tb = (e10, t2, r2) => {
        if (th(t2)) switch (r2) {
          case "decrypt":
          case "sign":
            if (function(e11) {
              return "oct" !== e11.kty && "string" == typeof e11.d;
            }(t2) && tg(e10, t2, r2)) return;
            throw TypeError("JSON Web Key for this operation be a private JWK");
          case "encrypt":
          case "verify":
            if (function(e11) {
              return "oct" !== e11.kty && void 0 === e11.d;
            }(t2) && tg(e10, t2, r2)) return;
            throw TypeError("JSON Web Key for this operation be a public JWK");
        }
        if (!tu(t2)) throw TypeError(ti(e10, t2, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("secret" === t2.type) throw TypeError(`${tf(t2)} instances for asymmetric algorithms must not be of type "secret"`);
        if ("public" === t2.type) switch (r2) {
          case "sign":
            throw TypeError(`${tf(t2)} instances for asymmetric algorithm signing must be of type "private"`);
          case "decrypt":
            throw TypeError(`${tf(t2)} instances for asymmetric algorithm decryption must be of type "private"`);
        }
        if ("private" === t2.type) switch (r2) {
          case "verify":
            throw TypeError(`${tf(t2)} instances for asymmetric algorithm verifying must be of type "public"`);
          case "encrypt":
            throw TypeError(`${tf(t2)} instances for asymmetric algorithm encryption must be of type "public"`);
        }
      }, ty = (e10, t2, r2) => {
        e10.startsWith("HS") || "dir" === e10 || e10.startsWith("PBES2") || /^A(?:128|192|256)(?:GCM)?(?:KW)?$/.test(e10) || /^A(?:128|192|256)CBC-HS(?:256|384|512)$/.test(e10) ? tm(e10, t2, r2) : tb(e10, t2, r2);
      }, tw = (e10, t2, r2, a2, n2) => {
        let i2;
        if (void 0 !== n2.crit && a2?.crit === void 0) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!a2 || void 0 === a2.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(a2.crit) || 0 === a2.crit.length || a2.crit.some((e11) => "string" != typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let o2 of (i2 = void 0 !== r2 ? new Map([...Object.entries(r2), ...t2.entries()]) : t2, a2.crit)) {
          if (!i2.has(o2)) throw new e3(`Extension Header Parameter "${o2}" is not recognized`);
          if (void 0 === n2[o2]) throw new e10(`Extension Header Parameter "${o2}" is missing`);
          if (i2.get(o2) && void 0 === a2[o2]) throw new e10(`Extension Header Parameter "${o2}" MUST be integrity protected`);
        }
        return new Set(a2.crit);
      }, tv = async (e10) => {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t2, keyUsages: r2 } = function(e11) {
          let t3, r3;
          switch (e11.kty) {
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t3 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t3 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t3 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r3 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new e3('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                  t3 = { name: "ECDSA", namedCurve: "P-256" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES384":
                  t3 = { name: "ECDSA", namedCurve: "P-384" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES512":
                  t3 = { name: "ECDSA", namedCurve: "P-521" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t3 = { name: "ECDH", namedCurve: e11.crv }, r3 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new e3('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                case "EdDSA":
                  t3 = { name: "Ed25519" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t3 = { name: e11.crv }, r3 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new e3('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            default:
              throw new e3('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t3, keyUsages: r3 };
        }(e10), a2 = { ...e10 };
        return delete a2.alg, delete a2.use, crypto.subtle.importKey("jwk", a2, t2, e10.ext ?? !e10.d, e10.key_ops ?? r2);
      }, tS = async (e10, t2, r2, a2 = false) => {
        let i2 = (n ||= /* @__PURE__ */ new WeakMap()).get(e10);
        if (i2?.[r2]) return i2[r2];
        let o2 = await tv({ ...t2, alg: r2 });
        return a2 && Object.freeze(e10), i2 ? i2[r2] = o2 : n.set(e10, { [r2]: o2 }), o2;
      }, t_ = (e10, t2) => {
        let r2;
        let a2 = (n ||= /* @__PURE__ */ new WeakMap()).get(e10);
        if (a2?.[t2]) return a2[t2];
        let i2 = "public" === e10.type, o2 = !!i2;
        if ("x25519" === e10.asymmetricKeyType) {
          switch (t2) {
            case "ECDH-ES":
            case "ECDH-ES+A128KW":
            case "ECDH-ES+A192KW":
            case "ECDH-ES+A256KW":
              break;
            default:
              throw TypeError("given KeyObject instance cannot be used for this algorithm");
          }
          r2 = e10.toCryptoKey(e10.asymmetricKeyType, o2, i2 ? [] : ["deriveBits"]);
        }
        if ("ed25519" === e10.asymmetricKeyType) {
          if ("EdDSA" !== t2 && "Ed25519" !== t2) throw TypeError("given KeyObject instance cannot be used for this algorithm");
          r2 = e10.toCryptoKey(e10.asymmetricKeyType, o2, [i2 ? "verify" : "sign"]);
        }
        if ("rsa" === e10.asymmetricKeyType) {
          let a3;
          switch (t2) {
            case "RSA-OAEP":
              a3 = "SHA-1";
              break;
            case "RS256":
            case "PS256":
            case "RSA-OAEP-256":
              a3 = "SHA-256";
              break;
            case "RS384":
            case "PS384":
            case "RSA-OAEP-384":
              a3 = "SHA-384";
              break;
            case "RS512":
            case "PS512":
            case "RSA-OAEP-512":
              a3 = "SHA-512";
              break;
            default:
              throw TypeError("given KeyObject instance cannot be used for this algorithm");
          }
          if (t2.startsWith("RSA-OAEP")) return e10.toCryptoKey({ name: "RSA-OAEP", hash: a3 }, o2, i2 ? ["encrypt"] : ["decrypt"]);
          r2 = e10.toCryptoKey({ name: t2.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: a3 }, o2, [i2 ? "verify" : "sign"]);
        }
        if ("ec" === e10.asymmetricKeyType) {
          let a3 = (/* @__PURE__ */ new Map([["prime256v1", "P-256"], ["secp384r1", "P-384"], ["secp521r1", "P-521"]])).get(e10.asymmetricKeyDetails?.namedCurve);
          if (!a3) throw TypeError("given KeyObject instance cannot be used for this algorithm");
          "ES256" === t2 && "P-256" === a3 && (r2 = e10.toCryptoKey({ name: "ECDSA", namedCurve: a3 }, o2, [i2 ? "verify" : "sign"])), "ES384" === t2 && "P-384" === a3 && (r2 = e10.toCryptoKey({ name: "ECDSA", namedCurve: a3 }, o2, [i2 ? "verify" : "sign"])), "ES512" === t2 && "P-521" === a3 && (r2 = e10.toCryptoKey({ name: "ECDSA", namedCurve: a3 }, o2, [i2 ? "verify" : "sign"])), t2.startsWith("ECDH-ES") && (r2 = e10.toCryptoKey({ name: "ECDH", namedCurve: a3 }, o2, i2 ? [] : ["deriveBits"]));
        }
        if (!r2) throw TypeError("given KeyObject instance cannot be used for this algorithm");
        return a2 ? a2[t2] = r2 : n.set(e10, { [t2]: r2 }), r2;
      }, tx = async (e10, t2) => {
        if (e10 instanceof Uint8Array || tc(e10)) return e10;
        if (td(e10)) {
          if ("secret" === e10.type) return e10.export();
          if ("toCryptoKey" in e10 && "function" == typeof e10.toCryptoKey) try {
            return t_(e10, t2);
          } catch (e11) {
            if (e11 instanceof TypeError) throw e11;
          }
          let r2 = e10.export({ format: "jwk" });
          return tS(e10, r2, t2);
        }
        if (th(e10)) return e10.k ? eY(e10.k) : tS(e10, e10, t2, true);
        throw Error("unreachable");
      };
      class tE {
        #e;
        #t;
        #r;
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("payload must be an instance of Uint8Array");
          this.#e = e10;
        }
        setProtectedHeader(e10) {
          if (this.#t) throw TypeError("setProtectedHeader can only be called once");
          return this.#t = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this.#r) throw TypeError("setUnprotectedHeader can only be called once");
          return this.#r = e10, this;
        }
        async sign(e10, t2) {
          let r2;
          if (!this.#t && !this.#r) throw new e5("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
          if (!tl(this.#t, this.#r)) throw new e5("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
          let a2 = { ...this.#t, ...this.#r }, n2 = tw(e5, /* @__PURE__ */ new Map([["b64", true]]), t2?.crit, this.#t, a2), i2 = true;
          if (n2.has("b64") && "boolean" != typeof (i2 = this.#t.b64)) throw new e5('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
          let { alg: o2 } = a2;
          if ("string" != typeof o2 || !o2) throw new e5('JWS "alg" (Algorithm) Header Parameter missing or invalid');
          ty(o2, e10, "sign");
          let s2 = this.#e;
          i2 && (s2 = eF.encode(eZ(s2)));
          let l2 = eX(r2 = this.#t ? eF.encode(eZ(JSON.stringify(this.#t))) : eF.encode(""), eF.encode("."), s2), c2 = await tx(e10, o2), d2 = { signature: eZ(await ts(o2, c2, l2)), payload: "" };
          return i2 && (d2.payload = ez.decode(s2)), this.#r && (d2.header = this.#r), this.#t && (d2.protected = ez.decode(r2)), d2;
        }
      }
      class tP {
        #a;
        constructor(e10) {
          this.#a = new tE(e10);
        }
        setProtectedHeader(e10) {
          return this.#a.setProtectedHeader(e10), this;
        }
        async sign(e10, t2) {
          let r2 = await this.#a.sign(e10, t2);
          if (void 0 === r2.payload) throw TypeError("use the flattened module for creating JWS with b64: false");
          return `${r2.protected}.${r2.payload}.${r2.signature}`;
        }
      }
      let tO = (e10) => Math.floor(e10.getTime() / 1e3), tT = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, tR = (e10) => {
        let t2;
        let r2 = tT.exec(e10);
        if (!r2 || r2[4] && r2[1]) throw TypeError("Invalid time period format");
        let a2 = parseFloat(r2[2]);
        switch (r2[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t2 = Math.round(a2);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t2 = Math.round(60 * a2);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t2 = Math.round(3600 * a2);
            break;
          case "day":
          case "days":
          case "d":
            t2 = Math.round(86400 * a2);
            break;
          case "week":
          case "weeks":
          case "w":
            t2 = Math.round(604800 * a2);
            break;
          default:
            t2 = Math.round(31557600 * a2);
        }
        return "-" === r2[1] || "ago" === r2[4] ? -t2 : t2;
      };
      function tC(e10, t2) {
        if (!Number.isFinite(t2)) throw TypeError(`Invalid ${e10} input`);
        return t2;
      }
      let tA = (e10) => e10.includes("/") ? e10.toLowerCase() : `application/${e10.toLowerCase()}`, tN = (e10, t2) => "string" == typeof e10 ? t2.includes(e10) : !!Array.isArray(e10) && t2.some(Set.prototype.has.bind(new Set(e10)));
      class tI {
        #e;
        constructor(e10) {
          if (!tp(e10)) throw TypeError("JWT Claims Set MUST be an object");
          this.#e = structuredClone(e10);
        }
        data() {
          return eF.encode(JSON.stringify(this.#e));
        }
        get iss() {
          return this.#e.iss;
        }
        set iss(e10) {
          this.#e.iss = e10;
        }
        get sub() {
          return this.#e.sub;
        }
        set sub(e10) {
          this.#e.sub = e10;
        }
        get aud() {
          return this.#e.aud;
        }
        set aud(e10) {
          this.#e.aud = e10;
        }
        set jti(e10) {
          this.#e.jti = e10;
        }
        set nbf(e10) {
          "number" == typeof e10 ? this.#e.nbf = tC("setNotBefore", e10) : e10 instanceof Date ? this.#e.nbf = tC("setNotBefore", tO(e10)) : this.#e.nbf = tO(/* @__PURE__ */ new Date()) + tR(e10);
        }
        set exp(e10) {
          "number" == typeof e10 ? this.#e.exp = tC("setExpirationTime", e10) : e10 instanceof Date ? this.#e.exp = tC("setExpirationTime", tO(e10)) : this.#e.exp = tO(/* @__PURE__ */ new Date()) + tR(e10);
        }
        set iat(e10) {
          void 0 === e10 ? this.#e.iat = tO(/* @__PURE__ */ new Date()) : e10 instanceof Date ? this.#e.iat = tC("setIssuedAt", tO(e10)) : "string" == typeof e10 ? this.#e.iat = tC("setIssuedAt", tO(/* @__PURE__ */ new Date()) + tR(e10)) : this.#e.iat = tC("setIssuedAt", e10);
        }
      }
      class tk {
        #t;
        #n;
        constructor(e10 = {}) {
          this.#n = new tI(e10);
        }
        setIssuer(e10) {
          return this.#n.iss = e10, this;
        }
        setSubject(e10) {
          return this.#n.sub = e10, this;
        }
        setAudience(e10) {
          return this.#n.aud = e10, this;
        }
        setJti(e10) {
          return this.#n.jti = e10, this;
        }
        setNotBefore(e10) {
          return this.#n.nbf = e10, this;
        }
        setExpirationTime(e10) {
          return this.#n.exp = e10, this;
        }
        setIssuedAt(e10) {
          return this.#n.iat = e10, this;
        }
        setProtectedHeader(e10) {
          return this.#t = e10, this;
        }
        async sign(e10, t2) {
          let r2 = new tP(this.#n.data());
          if (r2.setProtectedHeader(this.#t), Array.isArray(this.#t?.crit) && this.#t.crit.includes("b64") && false === this.#t.b64) throw new e4("JWTs MUST NOT use unencoded payload");
          return r2.sign(e10, t2);
        }
      }
      let tM = async (e10, t2, r2, a2) => {
        let n2 = await to(e10, t2, "verify");
        e8(e10, n2);
        let i2 = e9(e10, n2.algorithm);
        try {
          return await crypto.subtle.verify(i2, n2, r2, a2);
        } catch {
          return false;
        }
      }, tL = (e10, t2) => {
        if (void 0 !== t2 && (!Array.isArray(t2) || t2.some((e11) => "string" != typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t2) return new Set(t2);
      };
      async function tj(e10, t2, r2) {
        let a2, n2;
        if (!tp(e10)) throw new e5("Flattened JWS must be an object");
        if (void 0 === e10.protected && void 0 === e10.header) throw new e5('Flattened JWS must have either of the "protected" or "header" members');
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new e5("JWS Protected Header incorrect type");
        if (void 0 === e10.payload) throw new e5("JWS Payload missing");
        if ("string" != typeof e10.signature) throw new e5("JWS Signature missing or incorrect type");
        if (void 0 !== e10.header && !tp(e10.header)) throw new e5("JWS Unprotected Header incorrect type");
        let i2 = {};
        if (e10.protected) try {
          let t3 = eY(e10.protected);
          i2 = JSON.parse(ez.decode(t3));
        } catch {
          throw new e5("JWS Protected Header is invalid");
        }
        if (!tl(i2, e10.header)) throw new e5("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let o2 = { ...i2, ...e10.header }, s2 = tw(e5, /* @__PURE__ */ new Map([["b64", true]]), r2?.crit, i2, o2), l2 = true;
        if (s2.has("b64") && "boolean" != typeof (l2 = i2.b64)) throw new e5('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        let { alg: c2 } = o2;
        if ("string" != typeof c2 || !c2) throw new e5('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        let d2 = r2 && tL("algorithms", r2.algorithms);
        if (d2 && !d2.has(c2)) throw new e2('"alg" (Algorithm) Header Parameter value not allowed');
        if (l2) {
          if ("string" != typeof e10.payload) throw new e5("JWS Payload must be a string");
        } else if ("string" != typeof e10.payload && !(e10.payload instanceof Uint8Array)) throw new e5("JWS Payload must be a string or an Uint8Array instance");
        let u2 = false;
        "function" == typeof t2 && (t2 = await t2(i2, e10), u2 = true), ty(c2, t2, "verify");
        let p2 = eX(eF.encode(e10.protected ?? ""), eF.encode("."), "string" == typeof e10.payload ? eF.encode(e10.payload) : e10.payload);
        try {
          a2 = eY(e10.signature);
        } catch {
          throw new e5("Failed to base64url decode the signature");
        }
        let h2 = await tx(t2, c2);
        if (!await tM(c2, h2, a2, p2)) throw new e7();
        if (l2) try {
          n2 = eY(e10.payload);
        } catch {
          throw new e5("Failed to base64url decode the payload");
        }
        else n2 = "string" == typeof e10.payload ? eF.encode(e10.payload) : e10.payload;
        let f2 = { payload: n2 };
        return (void 0 !== e10.protected && (f2.protectedHeader = i2), void 0 !== e10.header && (f2.unprotectedHeader = e10.header), u2) ? { ...f2, key: h2 } : f2;
      }
      async function tD(e10, t2, r2) {
        if (e10 instanceof Uint8Array && (e10 = ez.decode(e10)), "string" != typeof e10) throw new e5("Compact JWS must be a string or Uint8Array");
        let { 0: a2, 1: n2, 2: i2, length: o2 } = e10.split(".");
        if (3 !== o2) throw new e5("Invalid Compact JWS");
        let s2 = await tj({ payload: n2, protected: a2, signature: i2 }, t2, r2), l2 = { payload: s2.payload, protectedHeader: s2.protectedHeader };
        return "function" == typeof t2 ? { ...l2, key: s2.key } : l2;
      }
      async function tH(e10, t2, r2) {
        let a2 = await tD(e10, t2, r2);
        if (a2.protectedHeader.crit?.includes("b64") && false === a2.protectedHeader.b64) throw new e4("JWTs MUST NOT use unencoded payload");
        let n2 = { payload: function(e11, t3, r3 = {}) {
          let a3, n3;
          try {
            a3 = JSON.parse(ez.decode(t3));
          } catch {
          }
          if (!tp(a3)) throw new e4("JWT Claims Set must be a top-level JSON object");
          let { typ: i2 } = r3;
          if (i2 && ("string" != typeof e11.typ || tA(e11.typ) !== tA(i2))) throw new e0('unexpected "typ" JWT header value', a3, "typ", "check_failed");
          let { requiredClaims: o2 = [], issuer: s2, subject: l2, audience: c2, maxTokenAge: d2 } = r3, u2 = [...o2];
          for (let e12 of (void 0 !== d2 && u2.push("iat"), void 0 !== c2 && u2.push("aud"), void 0 !== l2 && u2.push("sub"), void 0 !== s2 && u2.push("iss"), new Set(u2.reverse()))) if (!(e12 in a3)) throw new e0(`missing required "${e12}" claim`, a3, e12, "missing");
          if (s2 && !(Array.isArray(s2) ? s2 : [s2]).includes(a3.iss)) throw new e0('unexpected "iss" claim value', a3, "iss", "check_failed");
          if (l2 && a3.sub !== l2) throw new e0('unexpected "sub" claim value', a3, "sub", "check_failed");
          if (c2 && !tN(a3.aud, "string" == typeof c2 ? [c2] : c2)) throw new e0('unexpected "aud" claim value', a3, "aud", "check_failed");
          switch (typeof r3.clockTolerance) {
            case "string":
              n3 = tR(r3.clockTolerance);
              break;
            case "number":
              n3 = r3.clockTolerance;
              break;
            case "undefined":
              n3 = 0;
              break;
            default:
              throw TypeError("Invalid clockTolerance option type");
          }
          let { currentDate: p2 } = r3, h2 = tO(p2 || /* @__PURE__ */ new Date());
          if ((void 0 !== a3.iat || d2) && "number" != typeof a3.iat) throw new e0('"iat" claim must be a number', a3, "iat", "invalid");
          if (void 0 !== a3.nbf) {
            if ("number" != typeof a3.nbf) throw new e0('"nbf" claim must be a number', a3, "nbf", "invalid");
            if (a3.nbf > h2 + n3) throw new e0('"nbf" claim timestamp check failed', a3, "nbf", "check_failed");
          }
          if (void 0 !== a3.exp) {
            if ("number" != typeof a3.exp) throw new e0('"exp" claim must be a number', a3, "exp", "invalid");
            if (a3.exp <= h2 - n3) throw new e1('"exp" claim timestamp check failed', a3, "exp", "check_failed");
          }
          if (d2) {
            let e12 = h2 - a3.iat;
            if (e12 - n3 > ("number" == typeof d2 ? d2 : tR(d2))) throw new e1('"iat" claim timestamp check failed (too far in the past)', a3, "iat", "check_failed");
            if (e12 < 0 - n3) throw new e0('"iat" claim timestamp check failed (it should be in the past)', a3, "iat", "check_failed");
          }
          return a3;
        }(a2.protectedHeader, a2.payload, r2), protectedHeader: a2.protectedHeader };
        return "function" == typeof t2 ? { ...n2, key: a2.key } : n2;
      }
      es(), r(23).unstable_postpone;
      let tU = new TextEncoder().encode(process.env.AUTH_SECRET);
      async function tB(e10) {
        return await new tk(e10).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1 day from now").sign(tU);
      }
      async function tW(e10) {
        let { payload: t2 } = await tH(e10, tU, { algorithms: ["HS256"] });
        return t2;
      }
      async function tV(e10) {
        let { pathname: t2 } = e10.nextUrl, r2 = e10.cookies.get("session"), a2 = t2.startsWith("/dashboard");
        if (a2 && !r2) return Y.redirect(new URL("/sign-in", e10.url));
        let n2 = Y.next();
        if (r2 && "GET" === e10.method) try {
          let e11 = await tW(r2.value), t3 = new Date(Date.now() + 864e5);
          n2.cookies.set({ name: "session", value: await tB({ ...e11, expires: t3.toISOString() }), httpOnly: true, secure: true, sameSite: "lax", expires: t3 });
        } catch (t3) {
          if (console.error("Error updating session:", t3), n2.cookies.delete("session"), a2) return Y.redirect(new URL("/sign-in", e10.url));
        }
        return n2;
      }
      let tK = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], runtime: "nodejs" }, t$ = { ...b }, tq = t$.middleware || t$.default, tG = "/middleware";
      if ("function" != typeof tq) throw Error(`The Middleware "${tG}" must export a \`middleware\` or a \`default\` function`);
      function tJ(e10) {
        return eU({ ...e10, page: tG, handler: tq });
      }
    }, 945: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, n = Object.prototype.hasOwnProperty, i = {};
      function o(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), a2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? a2 : `${a2}; ${r2.join("; ")}`;
      }
      function s(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [a2, n2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(a2, decodeURIComponent(null != n2 ? n2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        var t2, r2;
        if (!e2) return;
        let [[a2, n2], ...i2] = s(e2), { domain: o2, expires: l2, httponly: u2, maxage: p2, path: h, samesite: f, secure: g, partitioned: m, priority: b } = Object.fromEntries(i2.map(([e3, t3]) => [e3.toLowerCase(), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3) e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: a2, value: decodeURIComponent(n2), domain: o2, ...l2 && { expires: new Date(l2) }, ...u2 && { httpOnly: true }, ..."string" == typeof p2 && { maxAge: Number(p2) }, path: h, ...f && { sameSite: c.includes(t2 = (t2 = f).toLowerCase()) ? t2 : void 0 }, ...g && { secure: true }, ...b && { priority: d.includes(r2 = (r2 = b).toLowerCase()) ? r2 : void 0 }, ...m && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var a2 in r2) t(e2, a2, { get: r2[a2], enumerable: true });
      })(i, { RequestCookies: () => u, ResponseCookies: () => p, parseCookie: () => s, parseSetCookie: () => l, stringifyCookie: () => o }), e.exports = ((e2, i2, o2, s2) => {
        if (i2 && "object" == typeof i2 || "function" == typeof i2) for (let l2 of a(i2)) n.call(e2, l2) || l2 === o2 || t(e2, l2, { get: () => i2[l2], enumerable: !(s2 = r(i2, l2)) || s2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), i);
      var c = ["strict", "lax", "none"], d = ["low", "medium", "high"], u = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of s(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let a2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === a2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, a2 = this._parsed;
          return a2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(a2).map(([e3, t3]) => o(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => o(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, p = class {
        constructor(e2) {
          var t2, r2, a2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let n2 = null != (a2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? a2 : [];
          for (let e3 of Array.isArray(n2) ? n2 : function(e4) {
            if (!e4) return [];
            var t3, r3, a3, n3, i2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, i2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (a3 = s2, s2 += 1, l2(), n3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (i2 = true, s2 = n3, o2.push(e4.substring(t3, a3)), t3 = s2) : s2 = a3 + 1;
              } else s2 += 1;
              (!i2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(n2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let a2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === a2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, a2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, n2 = this._parsed;
          return n2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...a2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = o(r3);
              t3.append("set-cookie", e4);
            }
          }(n2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2, a2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0].path, e2[0].domain];
          return this.set({ name: t2, path: r2, domain: a2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(o).join("; ");
        }
      };
    }, 439: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let a2 = r2(223), n2 = r2(172), i2 = r2(930), o = "context", s = new a2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, n2.registerGlobal)(o, e3, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...a3) {
              return this._getContextManager().with(e3, t4, r3, ...a3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, n2.getGlobal)(o) || s;
            }
            disable() {
              this._getContextManager().disable(), (0, n2.unregisterGlobal)(o, i2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let a2 = r2(56), n2 = r2(912), i2 = r2(957), o = r2(172);
          class s {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, o.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var a3, s2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (a3 = e5.stack) && void 0 !== a3 ? a3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let c = (0, o.getGlobal)("diag"), d = (0, n2.createLogLevelDiagLogger)(null !== (s2 = r3.logLevel) && void 0 !== s2 ? s2 : i2.DiagLogLevel.INFO, e4);
                if (c && !r3.suppressOverrideMessage) {
                  let e5 = null !== (l = Error().stack) && void 0 !== l ? l : "<failed to generate stacktrace>";
                  c.warn(`Current logger will be overwritten from ${e5}`), d.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o.registerGlobal)("diag", d, t4, true);
              }, t4.disable = () => {
                (0, o.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new a2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
          }
          t3.DiagAPI = s;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let a2 = r2(660), n2 = r2(172), i2 = r2(930), o = "metrics";
          class s {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, n2.registerGlobal)(o, e3, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, n2.getGlobal)(o) || a2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, n2.unregisterGlobal)(o, i2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = s;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let a2 = r2(172), n2 = r2(874), i2 = r2(194), o = r2(277), s = r2(369), l = r2(930), c = "propagation", d = new n2.NoopTextMapPropagator();
          class u {
            constructor() {
              this.createBaggage = s.createBaggage, this.getBaggage = o.getBaggage, this.getActiveBaggage = o.getActiveBaggage, this.setBaggage = o.setBaggage, this.deleteBaggage = o.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new u()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, a2.registerGlobal)(c, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, a2.unregisterGlobal)(c, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, a2.getGlobal)(c) || d;
            }
          }
          t3.PropagationAPI = u;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let a2 = r2(172), n2 = r2(846), i2 = r2(139), o = r2(607), s = r2(930), l = "trace";
          class c {
            constructor() {
              this._proxyTracerProvider = new n2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = o.deleteSpan, this.getSpan = o.getSpan, this.getActiveSpan = o.getActiveSpan, this.getSpanContext = o.getSpanContext, this.setSpan = o.setSpan, this.setSpanContext = o.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, a2.registerGlobal)(l, this._proxyTracerProvider, s.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, a2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, a2.unregisterGlobal)(l, s.DiagAPI.instance()), this._proxyTracerProvider = new n2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = c;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let a2 = r2(491), n2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(n2) || void 0;
          }
          t3.getBaggage = i2, t3.getActiveBaggage = function() {
            return i2(a2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(n2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(n2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let a2 = new r2(this._entries);
              return a2._entries.set(e3, t4), a2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let a2 = r2(930), n2 = r2(993), i2 = r2(830), o = a2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new n2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let a2 = r2(491);
          t3.context = a2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let a2 = r2(780);
          class n2 {
            active() {
              return a2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...a3) {
              return t4.call(r3, ...a3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = n2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, a2) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.set(e4, a2), n2;
              }, t4.deleteValue = (e4) => {
                let a2 = new r2(t4._currentContext);
                return a2._currentContext.delete(e4), a2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let a2 = r2(930);
          t3.diag = a2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let a2 = r2(172);
          class n2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return i2("debug", this._namespace, e3);
            }
            error(...e3) {
              return i2("error", this._namespace, e3);
            }
            info(...e3) {
              return i2("info", this._namespace, e3);
            }
            warn(...e3) {
              return i2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return i2("verbose", this._namespace, e3);
            }
          }
          function i2(e3, t4, r3) {
            let n3 = (0, a2.getGlobal)("diag");
            if (n3) return r3.unshift(t4), n3[e3](...r3);
          }
          t3.DiagComponentLogger = n2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class a2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = a2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let a2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, a3) {
              let n2 = t4[r4];
              return "function" == typeof n2 && e3 >= a3 ? n2.bind(t4) : function() {
              };
            }
            return e3 < a2.DiagLogLevel.NONE ? e3 = a2.DiagLogLevel.NONE : e3 > a2.DiagLogLevel.ALL && (e3 = a2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", a2.DiagLogLevel.ERROR), warn: r3("warn", a2.DiagLogLevel.WARN), info: r3("info", a2.DiagLogLevel.INFO), debug: r3("debug", a2.DiagLogLevel.DEBUG), verbose: r3("verbose", a2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let a2 = r2(200), n2 = r2(521), i2 = r2(130), o = n2.VERSION.split(".")[0], s = Symbol.for(`opentelemetry.js.api.${o}`), l = a2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, a3 = false) {
            var i3;
            let o2 = l[s] = null !== (i3 = l[s]) && void 0 !== i3 ? i3 : { version: n2.VERSION };
            if (!a3 && o2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (o2.version !== n2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${o2.version} for ${e3} does not match previously registered API v${n2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return o2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${n2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let a3 = null === (t4 = l[s]) || void 0 === t4 ? void 0 : t4.version;
            if (a3 && (0, i2.isCompatible)(a3)) return null === (r3 = l[s]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${n2.VERSION}.`);
            let r3 = l[s];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let a2 = r2(521), n2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), a3 = e3.match(n2);
            if (!a3) return () => false;
            let i3 = { major: +a3[1], minor: +a3[2], patch: +a3[3], prerelease: a3[4] };
            if (null != i3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function o(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let a4 = e4.match(n2);
              if (!a4) return o(e4);
              let s = { major: +a4[1], minor: +a4[2], patch: +a4[3], prerelease: a4[4] };
              return null != s.prerelease || i3.major !== s.major ? o(e4) : 0 === i3.major ? i3.minor === s.minor && i3.patch <= s.patch ? (t4.add(e4), true) : o(e4) : i3.minor <= s.minor ? (t4.add(e4), true) : o(e4);
            };
          }
          t3._makeCompatibilityCheck = i2, t3.isCompatible = i2(a2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let a2 = r2(653);
          t3.metrics = a2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class a2 {
          }
          t3.NoopMetric = a2;
          class n2 extends a2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = n2;
          class i2 extends a2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = i2;
          class o extends a2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = o;
          class s {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = s;
          class l extends s {
          }
          t3.NoopObservableCounterMetric = l;
          class c extends s {
          }
          t3.NoopObservableGaugeMetric = c;
          class d extends s {
          }
          t3.NoopObservableUpDownCounterMetric = d, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new n2(), t3.NOOP_HISTOGRAM_METRIC = new o(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new c(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new d(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let a2 = r2(102);
          class n2 {
            getMeter(e3, t4, r3) {
              return a2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = n2, t3.NOOP_METER_PROVIDER = new n2();
        }, 200: function(e2, t3, r2) {
          var a2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, a3) {
            void 0 === a3 && (a3 = r3), Object.defineProperty(e3, a3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, a3) {
            void 0 === a3 && (a3 = r3), e3[a3] = t4[r3];
          }), n2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || a2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), n2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var a2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, a3) {
            void 0 === a3 && (a3 = r3), Object.defineProperty(e3, a3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, a3) {
            void 0 === a3 && (a3 = r3), e3[a3] = t4[r3];
          }), n2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || a2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), n2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let a2 = r2(181);
          t3.propagation = a2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let a2 = r2(997);
          t3.trace = a2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let a2 = r2(476);
          class n2 {
            constructor(e3 = a2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = n2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let a2 = r2(491), n2 = r2(607), i2 = r2(403), o = r2(139), s = a2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = s.active()) {
              if (null == t4 ? void 0 : t4.root) return new i2.NonRecordingSpan();
              let a3 = r3 && (0, n2.getSpanContext)(r3);
              return "object" == typeof a3 && "string" == typeof a3.spanId && "string" == typeof a3.traceId && "number" == typeof a3.traceFlags && (0, o.isSpanContextValid)(a3) ? new i2.NonRecordingSpan(a3) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, a3) {
              let i3, o2, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (i3 = t4, l2 = r3) : (i3 = t4, o2 = r3, l2 = a3);
              let c = null != o2 ? o2 : s.active(), d = this.startSpan(e3, i3, c), u = (0, n2.setSpan)(c, d);
              return s.with(u, l2, void 0, d);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let a2 = r2(614);
          class n2 {
            getTracer(e3, t4, r3) {
              return new a2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = n2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let a2 = new (r2(614)).NoopTracer();
          class n2 {
            constructor(e3, t4, r3, a3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = a3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, a3) {
              let n3 = this._getTracer();
              return Reflect.apply(n3.startActiveSpan, n3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : a2;
            }
          }
          t3.ProxyTracer = n2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let a2 = r2(125), n2 = new (r2(124)).NoopTracerProvider();
          class i2 {
            getTracer(e3, t4, r3) {
              var n3;
              return null !== (n3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== n3 ? n3 : new a2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : n2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var a3;
              return null === (a3 = this._delegate) || void 0 === a3 ? void 0 : a3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = i2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let a2 = r2(780), n2 = r2(403), i2 = r2(491), o = (0, a2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s(e3) {
            return e3.getValue(o) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(o, t4);
          }
          t3.getSpan = s, t3.getActiveSpan = function() {
            return s(i2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(o);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new n2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = s(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let a2 = r2(564);
          class n2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), n3 = r3.indexOf("=");
                if (-1 !== n3) {
                  let i2 = r3.slice(0, n3), o = r3.slice(n3 + 1, t4.length);
                  (0, a2.validateKey)(i2) && (0, a2.validateValue)(o) && e4.set(i2, o);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new n2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = n2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", a2 = `[a-z]${r2}{0,255}`, n2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, i2 = RegExp(`^(?:${a2}|${n2})$`), o = /^[ -~]{0,255}[!-~]$/, s = /,|=/;
          t3.validateKey = function(e3) {
            return i2.test(e3);
          }, t3.validateValue = function(e3) {
            return o.test(e3) && !s.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let a2 = r2(325);
          t3.createTraceState = function(e3) {
            return new a2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let a2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: a2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let a2 = r2(476), n2 = r2(403), i2 = /^([0-9a-f]{32})$/i, o = /^[0-9a-f]{16}$/i;
          function s(e3) {
            return i2.test(e3) && e3 !== a2.INVALID_TRACEID;
          }
          function l(e3) {
            return o.test(e3) && e3 !== a2.INVALID_SPANID;
          }
          t3.isValidTraceId = s, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return s(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new n2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, a = {};
        function n(e2) {
          var r2 = a[e2];
          if (void 0 !== r2) return r2.exports;
          var i2 = a[e2] = { exports: {} }, o = true;
          try {
            t2[e2].call(i2.exports, i2, i2.exports, n), o = false;
          } finally {
            o && delete a[e2];
          }
          return i2.exports;
        }
        n.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true }), i.trace = i.propagation = i.metrics = i.diag = i.context = i.INVALID_SPAN_CONTEXT = i.INVALID_TRACEID = i.INVALID_SPANID = i.isValidSpanId = i.isValidTraceId = i.isSpanContextValid = i.createTraceState = i.TraceFlags = i.SpanStatusCode = i.SpanKind = i.SamplingDecision = i.ProxyTracerProvider = i.ProxyTracer = i.defaultTextMapSetter = i.defaultTextMapGetter = i.ValueType = i.createNoopMeter = i.DiagLogLevel = i.DiagConsoleLogger = i.ROOT_CONTEXT = i.createContextKey = i.baggageEntryMetadataFromString = void 0;
          var e2 = n(369);
          Object.defineProperty(i, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = n(780);
          Object.defineProperty(i, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(i, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = n(972);
          Object.defineProperty(i, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var a2 = n(957);
          Object.defineProperty(i, "DiagLogLevel", { enumerable: true, get: function() {
            return a2.DiagLogLevel;
          } });
          var o = n(102);
          Object.defineProperty(i, "createNoopMeter", { enumerable: true, get: function() {
            return o.createNoopMeter;
          } });
          var s = n(901);
          Object.defineProperty(i, "ValueType", { enumerable: true, get: function() {
            return s.ValueType;
          } });
          var l = n(194);
          Object.defineProperty(i, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(i, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var c = n(125);
          Object.defineProperty(i, "ProxyTracer", { enumerable: true, get: function() {
            return c.ProxyTracer;
          } });
          var d = n(846);
          Object.defineProperty(i, "ProxyTracerProvider", { enumerable: true, get: function() {
            return d.ProxyTracerProvider;
          } });
          var u = n(996);
          Object.defineProperty(i, "SamplingDecision", { enumerable: true, get: function() {
            return u.SamplingDecision;
          } });
          var p = n(357);
          Object.defineProperty(i, "SpanKind", { enumerable: true, get: function() {
            return p.SpanKind;
          } });
          var h = n(847);
          Object.defineProperty(i, "SpanStatusCode", { enumerable: true, get: function() {
            return h.SpanStatusCode;
          } });
          var f = n(475);
          Object.defineProperty(i, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var g = n(98);
          Object.defineProperty(i, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var m = n(139);
          Object.defineProperty(i, "isSpanContextValid", { enumerable: true, get: function() {
            return m.isSpanContextValid;
          } }), Object.defineProperty(i, "isValidTraceId", { enumerable: true, get: function() {
            return m.isValidTraceId;
          } }), Object.defineProperty(i, "isValidSpanId", { enumerable: true, get: function() {
            return m.isValidSpanId;
          } });
          var b = n(476);
          Object.defineProperty(i, "INVALID_SPANID", { enumerable: true, get: function() {
            return b.INVALID_SPANID;
          } }), Object.defineProperty(i, "INVALID_TRACEID", { enumerable: true, get: function() {
            return b.INVALID_TRACEID;
          } }), Object.defineProperty(i, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return b.INVALID_SPAN_CONTEXT;
          } });
          let y = n(67);
          Object.defineProperty(i, "context", { enumerable: true, get: function() {
            return y.context;
          } });
          let w = n(506);
          Object.defineProperty(i, "diag", { enumerable: true, get: function() {
            return w.diag;
          } });
          let v = n(886);
          Object.defineProperty(i, "metrics", { enumerable: true, get: function() {
            return v.metrics;
          } });
          let S = n(939);
          Object.defineProperty(i, "propagation", { enumerable: true, get: function() {
            return S.propagation;
          } });
          let _ = n(845);
          Object.defineProperty(i, "trace", { enumerable: true, get: function() {
            return _.trace;
          } }), i.default = { context: y.context, diag: w.diag, metrics: v.metrics, propagation: S.propagation, trace: _.trace };
        })(), e.exports = i;
      })();
    }, 133: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var n2 = {}, i = t2.split(a), o = (r2 || {}).decode || e2, s = 0; s < i.length; s++) {
              var l = i[s], c = l.indexOf("=");
              if (!(c < 0)) {
                var d = l.substr(0, c).trim(), u = l.substr(++c, l.length).trim();
                '"' == u[0] && (u = u.slice(1, -1)), void 0 == n2[d] && (n2[d] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(u, o));
              }
            }
            return n2;
          }, t.serialize = function(e3, t2, a2) {
            var i = a2 || {}, o = i.encode || r;
            if ("function" != typeof o) throw TypeError("option encode is invalid");
            if (!n.test(e3)) throw TypeError("argument name is invalid");
            var s = o(t2);
            if (s && !n.test(s)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + s;
            if (null != i.maxAge) {
              var c = i.maxAge - 0;
              if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(c);
            }
            if (i.domain) {
              if (!n.test(i.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + i.domain;
            }
            if (i.path) {
              if (!n.test(i.path)) throw TypeError("option path is invalid");
              l += "; Path=" + i.path;
            }
            if (i.expires) {
              if ("function" != typeof i.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + i.expires.toUTCString();
            }
            if (i.httpOnly && (l += "; HttpOnly"), i.secure && (l += "; Secure"), i.sameSite) switch ("string" == typeof i.sameSite ? i.sameSite.toLowerCase() : i.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, a = /; */, n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 340: (e, t, r) => {
      var a;
      (() => {
        var n = { 226: function(n2, i2) {
          !function(o2, s2) {
            "use strict";
            var l = "function", c = "undefined", d = "object", u = "string", p = "major", h = "model", f = "name", g = "type", m = "vendor", b = "version", y = "architecture", w = "console", v = "mobile", S = "tablet", _ = "smarttv", x = "wearable", E = "embedded", P = "Amazon", O = "Apple", T = "ASUS", R = "BlackBerry", C = "Browser", A = "Chrome", N = "Firefox", I = "Google", k = "Huawei", M = "Microsoft", L = "Motorola", j = "Opera", D = "Samsung", H = "Sharp", U = "Sony", B = "Xiaomi", W = "Zebra", V = "Facebook", K = "Chromium OS", $ = "Mac OS", q = function(e2, t2) {
              var r2 = {};
              for (var a2 in e2) t2[a2] && t2[a2].length % 2 == 0 ? r2[a2] = t2[a2].concat(e2[a2]) : r2[a2] = e2[a2];
              return r2;
            }, G = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, J = function(e2, t2) {
              return typeof e2 === u && -1 !== F(t2).indexOf(F(e2));
            }, F = function(e2) {
              return e2.toLowerCase();
            }, z = function(e2, t2) {
              if (typeof e2 === u) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === c ? e2 : e2.substring(0, 350);
            }, X = function(e2, t2) {
              for (var r2, a2, n3, i3, o3, c2, u2 = 0; u2 < t2.length && !o3; ) {
                var p2 = t2[u2], h2 = t2[u2 + 1];
                for (r2 = a2 = 0; r2 < p2.length && !o3 && p2[r2]; ) if (o3 = p2[r2++].exec(e2)) for (n3 = 0; n3 < h2.length; n3++) c2 = o3[++a2], typeof (i3 = h2[n3]) === d && i3.length > 0 ? 2 === i3.length ? typeof i3[1] == l ? this[i3[0]] = i3[1].call(this, c2) : this[i3[0]] = i3[1] : 3 === i3.length ? typeof i3[1] !== l || i3[1].exec && i3[1].test ? this[i3[0]] = c2 ? c2.replace(i3[1], i3[2]) : void 0 : this[i3[0]] = c2 ? i3[1].call(this, c2, i3[2]) : void 0 : 4 === i3.length && (this[i3[0]] = c2 ? i3[3].call(this, c2.replace(i3[1], i3[2])) : void 0) : this[i3] = c2 || s2;
                u2 += 2;
              }
            }, Y = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === d && t2[r2].length > 0) {
                for (var a2 = 0; a2 < t2[r2].length; a2++) if (J(t2[r2][a2], e2)) return "?" === r2 ? s2 : r2;
              } else if (J(t2[r2], e2)) return "?" === r2 ? s2 : r2;
              return e2;
            }, Z = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Q = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [b, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [b, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, b], [/opios[\/ ]+([\w\.]+)/i], [b, [f, j + " Mini"]], [/\bopr\/([\w\.]+)/i], [b, [f, j]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, b], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [b, [f, "UC" + C]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [b, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [b, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [b, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [b, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [b, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + C], b], [/\bfocus\/([\w\.]+)/i], [b, [f, N + " Focus"]], [/\bopt\/([\w\.]+)/i], [b, [f, j + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [b, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [b, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [b, [f, j + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [b, [f, "MIUI " + C]], [/fxios\/([-\w\.]+)/i], [b, [f, N]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + C]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + C], b], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], b], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, b], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, V], b], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, b], [/\bgsa\/([\w\.]+) .*safari\//i], [b, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [b, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [b, [f, A + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, A + " WebView"], b], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [b, [f, "Android " + C]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, b], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [b, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [b, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [b, Y, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, b], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], b], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [b, [f, N + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, b], [/(cobalt)\/([\w\.]+)/i], [f, [b, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[y, "amd64"]], [/(ia32(?=;))/i], [[y, F]], [/((?:i[346]|x)86)[;\)]/i], [[y, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[y, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[y, "armhf"]], [/windows (ce|mobile); ppc;/i], [[y, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[y, /ower/, "", F]], [/(sun4\w)[;\)]/i], [[y, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[y, F]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [h, [m, D], [g, S]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [h, [m, D], [g, v]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [h, [m, O], [g, v]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [h, [m, O], [g, S]], [/(macintosh);/i], [h, [m, O]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [h, [m, H], [g, v]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [h, [m, k], [g, S]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [h, [m, k], [g, v]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[h, /_/g, " "], [m, B], [g, v]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[h, /_/g, " "], [m, B], [g, S]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [h, [m, "OPPO"], [g, v]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [h, [m, "Vivo"], [g, v]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [h, [m, "Realme"], [g, v]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [h, [m, L], [g, v]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [h, [m, L], [g, S]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [h, [m, "LG"], [g, S]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [h, [m, "LG"], [g, v]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [h, [m, "Lenovo"], [g, S]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[h, /_/g, " "], [m, "Nokia"], [g, v]], [/(pixel c)\b/i], [h, [m, I], [g, S]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [h, [m, I], [g, v]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [h, [m, U], [g, v]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[h, "Xperia Tablet"], [m, U], [g, S]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [h, [m, "OnePlus"], [g, v]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [h, [m, P], [g, S]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[h, /(.+)/g, "Fire Phone $1"], [m, P], [g, v]], [/(playbook);[-\w\),; ]+(rim)/i], [h, m, [g, S]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [h, [m, R], [g, v]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [h, [m, T], [g, S]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [h, [m, T], [g, v]], [/(nexus 9)/i], [h, [m, "HTC"], [g, S]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m, [h, /_/g, " "], [g, v]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [h, [m, "Acer"], [g, S]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [h, [m, "Meizu"], [g, v]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, h, [g, v]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, h, [g, S]], [/(surface duo)/i], [h, [m, M], [g, S]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [h, [m, "Fairphone"], [g, v]], [/(u304aa)/i], [h, [m, "AT&T"], [g, v]], [/\bsie-(\w*)/i], [h, [m, "Siemens"], [g, v]], [/\b(rct\w+) b/i], [h, [m, "RCA"], [g, S]], [/\b(venue[\d ]{2,7}) b/i], [h, [m, "Dell"], [g, S]], [/\b(q(?:mv|ta)\w+) b/i], [h, [m, "Verizon"], [g, S]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [h, [m, "Barnes & Noble"], [g, S]], [/\b(tm\d{3}\w+) b/i], [h, [m, "NuVision"], [g, S]], [/\b(k88) b/i], [h, [m, "ZTE"], [g, S]], [/\b(nx\d{3}j) b/i], [h, [m, "ZTE"], [g, v]], [/\b(gen\d{3}) b.+49h/i], [h, [m, "Swiss"], [g, v]], [/\b(zur\d{3}) b/i], [h, [m, "Swiss"], [g, S]], [/\b((zeki)?tb.*\b) b/i], [h, [m, "Zeki"], [g, S]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], h, [g, S]], [/\b(ns-?\w{0,9}) b/i], [h, [m, "Insignia"], [g, S]], [/\b((nxa|next)-?\w{0,9}) b/i], [h, [m, "NextBook"], [g, S]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], h, [g, v]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], h, [g, v]], [/\b(ph-1) /i], [h, [m, "Essential"], [g, v]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [h, [m, "Envizen"], [g, S]], [/\b(trio[-\w\. ]+) b/i], [h, [m, "MachSpeed"], [g, S]], [/\btu_(1491) b/i], [h, [m, "Rotor"], [g, S]], [/(shield[\w ]+) b/i], [h, [m, "Nvidia"], [g, S]], [/(sprint) (\w+)/i], [m, h, [g, v]], [/(kin\.[onetw]{3})/i], [[h, /\./g, " "], [m, M], [g, v]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [h, [m, W], [g, S]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [h, [m, W], [g, v]], [/smart-tv.+(samsung)/i], [m, [g, _]], [/hbbtv.+maple;(\d+)/i], [[h, /^/, "SmartTV"], [m, D], [g, _]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, "LG"], [g, _]], [/(apple) ?tv/i], [m, [h, O + " TV"], [g, _]], [/crkey/i], [[h, A + "cast"], [m, I], [g, _]], [/droid.+aft(\w)( bui|\))/i], [h, [m, P], [g, _]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [h, [m, H], [g, _]], [/(bravia[\w ]+)( bui|\))/i], [h, [m, U], [g, _]], [/(mitv-\w{5}) bui/i], [h, [m, B], [g, _]], [/Hbbtv.*(technisat) (.*);/i], [m, h, [g, _]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m, z], [h, z], [g, _]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[g, _]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, h, [g, w]], [/droid.+; (shield) bui/i], [h, [m, "Nvidia"], [g, w]], [/(playstation [345portablevi]+)/i], [h, [m, U], [g, w]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [h, [m, M], [g, w]], [/((pebble))app/i], [m, h, [g, x]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [h, [m, O], [g, x]], [/droid.+; (glass) \d/i], [h, [m, I], [g, x]], [/droid.+; (wt63?0{2,3})\)/i], [h, [m, W], [g, x]], [/(quest( 2| pro)?)/i], [h, [m, V], [g, x]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [g, E]], [/(aeobc)\b/i], [h, [m, P], [g, E]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [h, [g, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [h, [g, S]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[g, S]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[g, v]], [/(android[-\w\. ]{0,9});.+buil/i], [h, [m, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [b, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [b, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, b], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [b, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, b], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [b, Y, Z]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [b, Y, Z]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[b, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, $], [b, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [b, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, b], [/\(bb(10);/i], [b, [f, R]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [b, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [b, [f, N + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [b, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [b, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [b, [f, A + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, K], b], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, b], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], b], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, b]] }, ee = function(e2, t2) {
              if (typeof e2 === d && (t2 = e2, e2 = s2), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof o2 !== c && o2.navigator ? o2.navigator : s2, a2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), n3 = r2 && r2.userAgentData ? r2.userAgentData : s2, i3 = t2 ? q(Q, t2) : Q, w2 = r2 && r2.userAgent == a2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = s2, t3[b] = s2, X.call(t3, a2, i3.browser), t3[p] = typeof (e3 = t3[b]) === u ? e3.replace(/[^\d\.]/g, "").split(".")[0] : s2, w2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[y] = s2, X.call(e3, a2, i3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[m] = s2, e3[h] = s2, e3[g] = s2, X.call(e3, a2, i3.device), w2 && !e3[g] && n3 && n3.mobile && (e3[g] = v), w2 && "Macintosh" == e3[h] && r2 && typeof r2.standalone !== c && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[h] = "iPad", e3[g] = S), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = s2, e3[b] = s2, X.call(e3, a2, i3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = s2, e3[b] = s2, X.call(e3, a2, i3.os), w2 && !e3[f] && n3 && "Unknown" != n3.platform && (e3[f] = n3.platform.replace(/chrome os/i, K).replace(/macos/i, $)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return a2;
              }, this.setUA = function(e3) {
                return a2 = typeof e3 === u && e3.length > 350 ? z(e3, 350) : e3, this;
              }, this.setUA(a2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = G([f, b, p]), ee.CPU = G([y]), ee.DEVICE = G([h, m, g, w, v, _, S, x, E]), ee.ENGINE = ee.OS = G([f, b]), typeof i2 !== c ? (n2.exports && (i2 = n2.exports = ee), i2.UAParser = ee) : r.amdO ? void 0 !== (a = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = a) : typeof o2 !== c && (o2.UAParser = ee);
            var et = typeof o2 !== c && (o2.jQuery || o2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, i = {};
        function o(e2) {
          var t2 = i[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = i[e2] = { exports: {} }, a2 = true;
          try {
            n[e2].call(r2.exports, r2, r2.exports, o), a2 = false;
          } finally {
            a2 && delete i[e2];
          }
          return r2.exports;
        }
        o.ab = "//";
        var s = o(226);
        e.exports = s;
      })();
    }, 488: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return o;
      }, withRequest: function() {
        return i;
      } });
      let a = new (r(67)).AsyncLocalStorage();
      function n(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2) return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function i(e2, t2, r2) {
        let i2 = n(e2, t2);
        return i2 ? a.run(i2, r2) : r2();
      }
      function o(e2, t2) {
        return a.getStore() || (e2 && t2 ? n(e2, t2) : void 0);
      }
    }, 375: (e, t, r) => {
      "use strict";
      var a = r(195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return s;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return i;
      } });
      let n = r(488), i = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function o(e2, t2) {
        let { url: r2, method: n2, headers: i2, body: o2, cache: s2, credentials: l2, integrity: c, mode: d, redirect: u, referrer: p, referrerPolicy: h } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(i2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? a.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: c, mode: d, redirect: u, referrer: p, referrerPolicy: h } };
      }
      async function s(e2, t2) {
        let r2 = (0, n.getTestReqInfo)(t2, i);
        if (!r2) return e2(t2);
        let { testData: s2, proxyPort: l2 } = r2, c = await o(s2, t2), d = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(c), next: { internal: true } });
        if (!d.ok) throw Error(`Proxy request failed: ${d.status}`);
        let u = await d.json(), { api: p } = u;
        switch (p) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: n2 } = e3.response;
          return new Response(n2 ? a.from(n2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(u);
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var a2;
          return (null == r2 ? void 0 : null == (a2 = r2.next) ? void 0 : a2.internal) ? e2(t2, r2) : s(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 177: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return i;
      }, wrapRequestHandler: function() {
        return o;
      } });
      let a = r(488), n = r(375);
      function i() {
        return (0, n.interceptFetch)(r.g.fetch);
      }
      function o(e2) {
        return (t2, r2) => (0, a.withRequest)(t2, n.reader, () => e2(t2, r2));
      }
    }, 835: (e, t) => {
      "use strict";
      Symbol.for("react.element"), Symbol.for("react.portal"), Symbol.for("react.fragment"), Symbol.for("react.strict_mode"), Symbol.for("react.profiler"), Symbol.for("react.provider"), Symbol.for("react.context"), Symbol.for("react.forward_ref"), Symbol.for("react.suspense"), Symbol.for("react.memo"), Symbol.for("react.lazy"), Symbol.iterator;
      var r = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } }, a = Object.assign, n = {};
      function i(e2, t2, a2) {
        this.props = e2, this.context = t2, this.refs = n, this.updater = a2 || r;
      }
      function o() {
      }
      function s(e2, t2, a2) {
        this.props = e2, this.context = t2, this.refs = n, this.updater = a2 || r;
      }
      i.prototype.isReactComponent = {}, i.prototype.setState = function(e2, t2) {
        if ("object" != typeof e2 && "function" != typeof e2 && null != e2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e2, t2, "setState");
      }, i.prototype.forceUpdate = function(e2) {
        this.updater.enqueueForceUpdate(this, e2, "forceUpdate");
      }, o.prototype = i.prototype;
      var l = s.prototype = new o();
      l.constructor = s, a(l, i.prototype), l.isPureReactComponent = true, Object.prototype.hasOwnProperty;
    }, 23: (e, t, r) => {
      "use strict";
      e.exports = r(835);
    } }, (e) => {
      var t = e(e.s = 968);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES).middleware_middleware = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next\\/static|_next\\/image|favicon.ico).*))(.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const override = config[handler3.type]?.override;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { Readable as Readable2 } from "node:stream";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.js", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "analyticsId": "", "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "inline", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "optimizeFonts": true, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "httpAgentOptions": { "keepAlive": true }, "outputFileTracing": true, "staticPageGenerationTimeout": 60, "swcMinify": true, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "experimental": { "multiZoneDraftMode": false, "prerenderEarlyExit": false, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 9, "memoryBasedWorkersCount": false, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "outputFileTracingRoot": "/Users/gomolemokgatitsoe/founderfinder", "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "adjustFontFallbacks": false, "adjustFontFallbacksWithSizeAdjust": false, "typedRoutes": false, "instrumentationHook": false, "bundlePagesExternals": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "missingSuspenseWithCSRBailout": true, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 30, "static": 300 }, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "configFileName": "next.config.js" };
var BuildId = "cNU8Z4JoHEAUGvUFeOn41";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/dashboard", "regex": "^/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard(?:/)?$" }, { "page": "/dashboard/activity", "regex": "^/dashboard/activity(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/activity(?:/)?$" }, { "page": "/dashboard/general", "regex": "^/dashboard/general(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/general(?:/)?$" }, { "page": "/dashboard/security", "regex": "^/dashboard/security(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/security(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/pricing", "regex": "^/pricing(?:/)?$", "routeKeys": {}, "namedRegex": "^/pricing(?:/)?$" }, { "page": "/sign-in", "regex": "^/sign\\-in(?:/)?$", "routeKeys": {}, "namedRegex": "^/sign\\-in(?:/)?$" }, { "page": "/sign-up", "regex": "^/sign\\-up(?:/)?$", "routeKeys": {}, "namedRegex": "^/sign\\-up(?:/)?$" }], "dynamic": [], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "adbf02648a3825d2bdeceaef978fd937", "previewModeSigningKey": "da3968be86a1c724623bfe16a022c07df0f7b802ce6fa11f36189efd5dff80aa", "previewModeEncryptionKey": "92500da096f0d7086e7f694fd6219df840566829e882551b167e423c88712634" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/middleware.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next\\/static|_next\\/image|favicon.ico).*))(.json)?[\\/#\\?]?$", "originalSource": "/((?!api|_next/static|_next/image|favicon.ico).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "cNU8Z4JoHEAUGvUFeOn41", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "aHAuLhR/GyjPTkQl24hCBn/nZDzBCasc9/OCIkXtu2A=", "__NEXT_PREVIEW_MODE_ID": "adbf02648a3825d2bdeceaef978fd937", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "92500da096f0d7086e7f694fd6219df840566829e882551b167e423c88712634", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "da3968be86a1c724623bfe16a022c07df0f7b802ce6fa11f36189efd5dff80aa" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/(login)/sign-up/page": "/sign-up", "/(login)/sign-in/page": "/sign-in", "/api/stripe/webhook/route": "/api/stripe/webhook", "/api/team/route": "/api/team", "/api/user/route": "/api/user", "/favicon.ico/route": "/favicon.ico", "/api/stripe/checkout/route": "/api/stripe/checkout", "/(dashboard)/page": "/", "/(dashboard)/pricing/page": "/pricing", "/(dashboard)/dashboard/general/page": "/dashboard/general", "/(dashboard)/dashboard/security/page": "/dashboard/security", "/(dashboard)/dashboard/activity/page": "/dashboard/activity", "/(dashboard)/dashboard/page": "/dashboard" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/api/user": {}, "/api/stripe/checkout": {}, "/pricing": {} } };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    return value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    statusCode: cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath ?? "/") || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => route.startsWith("/api/") || route === "/api" && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest.preview.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = new URL(redirect.headers.Location).href;
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    headers = {
      ...middlewareEventOrResult.responseHeaders,
      ...headers
    };
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const config = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(config?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(config?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(config?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
