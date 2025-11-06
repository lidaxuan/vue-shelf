const DOMAIN_MAP = {
  cn: {
    test: {
      base: "https://test-prd18.easyliao.net",
      im: "https://test-prd18.easyliao.net/im-gateway",
      webcall: "https://test-prd18.easyliao.net/im-gateway",
    },
    prod: {
      base: "https://group-mgr.easyliao.com",
      authEupms: "https://auth.easyliao.com",
      im: "https://group-im-api.easyliao.com",
      webcall: "https://group-im-api.easyliao.com",
    },
    group5: {
      base: "https://group5-gw.easyliao.com",
      authEupms: "https://group5-auth.easyliao.com",
      im: "https://group5-gw.easyliao.com/im-gateway",
      webcall: "https://group5-gw.easyliao.com/im-gateway",
    },
    group6: {
      authEupms: "https://group6-auth.easyliao.com",
      im: "https://group6-gw1.easyliao.com/im-gateway",
      webcall: "https://group6-gw1.easyliao.com/im-gateway",
      base: "https://group6-gw1.easyliao.com",
    },
  },
  en: {
    // 海外环境同理
  }
};

const serviceContextMap = {
  authEupms: "/auth-eupms",
  authSso: "/auth-sso",
  im: "/im",
  webcall: "/webcall",
  eachbotFlowWeb: "/eachbot-flow-web",
  trust: window.__sso == "test" ? "/trust" : "/webcall-trust-web",
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

const envs = ['test', 'prod', 'group5', 'group6'];

// 拼接全路径，优先取对应服务，没有则用 base
function getServicePath(region, env) {
  const domainObj = DOMAIN_MAP[region] && DOMAIN_MAP[region][env];
  if (!domainObj) return {};
  let result = {};
  for (let key in serviceContextMap) {
    let domain = domainObj[key] || domainObj.base;
    if (domain) {
      result[key] = domain //+ serviceContextMap[key];
    }
  }
  return result;
}

function getLocalProxyServicePath(region, env) {
  const domainObj = DOMAIN_MAP[region] ? DOMAIN_MAP[region][env] : "";
  if (!domainObj) return {};

  return Object.keys(domainObj).reduce((acc, item) => {
    acc[item] = `/${region}${env}${item}`;
    return acc;
  }, {});
}

// 自动生成代理配置
function getProxyConfig(region, env) {
  if (Array.isArray(env)) {
    return env.reduce((acc, curEnv) => {
      const proxyPart = getProxyConfig(region, curEnv); // 递归复用自身
      return { ...acc, ...proxyPart }; // 合并对象
    }, {});
  }

  const domainObj = DOMAIN_MAP[region] && DOMAIN_MAP[region][env];
  if (!domainObj) return {};

  let proxy = {};
  const localPaths = getLocalProxyServicePath(region, env)
  Object.keys(domainObj).forEach(proxyKey => {
    proxy[localPaths[proxyKey]] = {
      target: domainObj[proxyKey]+ (serviceContextMap[proxyKey] || ""),
      changeOrigin: true,
      loglevel: "debug",
      pathRewrite: {
        [`^${localPaths[proxyKey]}`]: ""
      },
      localPath: localPaths[`${region}${env}${proxyKey}`] // 额外字段，按需保留
    };
  });
  return proxy;
}
// 获取完整 API 地址
function getApi(serviceKey, path) {
  path = path || "";
  let region = window.__region || "cn";
  let env = window.__sso || "test";
  let servicePathObj = getServicePath(region, env);
  let baseUrl = servicePathObj[serviceKey];
  if (window.isLocal) {
    return "/" + region + env + serviceKey + path;
  }
  if (!baseUrl) {
    console.warn("未找到 " + region + "-" + env + " 的服务 " + serviceKey + " 路径");
    return "";
  }
  return baseUrl + path;
}

// 导出全局配置 EL-PubBase
const region = window.$CONFIG  ? window.$CONFIG.lang : '' || "cn";
const env = window.__sso || "test";
window.__config = {
  // getApi: getApi,
  SERVICE_CONTEXT_MAP: serviceContextMap,
  SERVICE_PATH: getServicePath(region, env),
  PROXY_CONFIG: getProxyConfig(region, envs),
  LOCAL_PROXY_SERVICE_PATH: getLocalProxyServicePath(region, env),
  // DOMAIN_MAP: DOMAIN_MAP[region][env]
};

