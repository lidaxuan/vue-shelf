const DOMAIN_MAP = {
  cn: {
    test: {
      base: "//test-prd18.easyliao.net",
    },
    group5: {
      auth: "//group5-auth.easyliao.com",
      im: "//group5-gw.easyliao.com",
      webcall: "//group5-gw.easyliao.com",
      base: "//group5-gw.easyliao.com",
    },
    group6: {
      auth: "//group6-auth.easyliao.com",
      im: "//group6-gw1.easyliao.com",
      webcall: "//group6-gw1.easyliao.com",
      base: "//group6-gw1.easyliao.com",
    },
  },
  en: {
    // 海外环境同理
  }
};

var serviceMap = {
  authEupms: "/auth-eupms",
  authSso: "/auth-sso",
  im: "/im",
  webcall: "/webcall",
  eachbotFlowWeb: "/eachbot-flow-web",
  apiTrust: window.isLocal ? (window.ReferEnv === "prod" ? "/trust" : "/webcall-trust-web") : "/trust",
  ocomsWeb: "/ocoms-web",
  consoleWeb: "/console/Service",
  report: "/report",
  payBillWeb: "/pay-bill-web",
  integrationWeb: "/external-web",
  appletConsole: "/applet-console",
  console: "/console",
  operate: "/operate",
  record: "/record",
  clues: "/clues",
  cuour: "/cuour",
  rpaConsole: "/rpa-console",
  agentWeb: "/boss-agent",
  eachbotKnowledgeWeb: "/eachbot-knowledge-web",
  appletShop: "/applet-shop",
  rpaClientApi: "/rpa-client-api"
};

// 拼接全路径，优先取对应服务，没有则用 base
function getServicePath(region, env) {
  var domainObj = DOMAIN_MAP[region] && DOMAIN_MAP[region][env];
  if (!domainObj) return {};
  var result = {};
  for (var key in serviceMap) {
    var domain = domainObj[key] || domainObj.base;
    if (domain) {
      result[key] = domain + serviceMap[key];
    }
  }
  return result;
}

// 自动生成代理配置
function getProxyConfig(region, env) {
  var domainObj = DOMAIN_MAP[region] && DOMAIN_MAP[region][env];
  if (!domainObj) return {};
  var proxy = {};
  for (var key in serviceMap) {
    var domain = domainObj[key] || domainObj.base;
    if (domain) {
      var proxyKey = "/" + region + env + key;
      var pathRewrite = {};
      pathRewrite["^" + proxyKey] = serviceMap[key];
      proxy[proxyKey] = {
        target: domain,
        changeOrigin: true,
        loglevel: "debug",
        pathRewrite: pathRewrite
      };
    }
  }
  return proxy;
}

function getLocalProxyServicePath(region, env) {
  var domainObj = DOMAIN_MAP[region] && DOMAIN_MAP[region][env];
  if (!domainObj) return {};
  var result = {};
  var hasOnlyBase = Object.keys(domainObj).length === 1 && domainObj.base;
  for (var key in serviceMap) {
    if (hasOnlyBase) {
      // 只有 base 时，所有服务都走 base
      result[key] = "/" + region + env + "base";
    } else {
      // 有独立域名时，服务走自己的代理前缀
      result[key] = "/" + region + env + key;
    }
  }
  return result;
}

// 获取完整 API 地址
function getApi(serviceKey, path) {
  path = path || "";
  var region = window.__region || "cn";
  var env = window.__sso || "test";
  var servicePathObj = getServicePath(region, env);
  var baseUrl = servicePathObj[serviceKey];
  if (window.isLocal) {
    return "/" + region + env + serviceKey + path;
  }
  if (!baseUrl) {
    console.warn("未找到 " + region + "-" + env + " 的服务 " + serviceKey + " 路径");
    return "";
  }
  return baseUrl + path;
}

// 导出全局配置
var region = window.__region || "cn";
var env = window.__sso || "test";
window.__config = {
  // getApi: getApi,
  SERVICE_PATH: getServicePath(region, env),
  LOCAL_PROXY_SERVICE_PATH: getLocalProxyServicePath(region, env)
  // PROXY_CONFIG: getProxyConfig(region, env),
  // DOMAIN_MAP: DOMAIN_MAP[region][env]
};