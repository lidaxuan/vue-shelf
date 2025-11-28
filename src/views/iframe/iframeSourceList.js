/*
 * @Description: iframe 来源配置
 * @Author: chunxu.Zhao
 * @Date: 2023-10-31 10:09:40
 * @LastEditors: chunxu.Zhao
 * @LastEditTime: 2024-07-01 11:23:34
 * @FilePath: \hw-web-client-view\src\utils\iframeSourceList.js
 */

window.$CONFIG = {
  lang:'cn'
}

const isEn = window.$CONFIG.lang === "en";
const appId = 10000;
const token = `eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiLmmJPogYrnp5HmioAiLCJpc3MiOiLmmJPogYrnp5HmioAiLCJpYXQiOjE3NjQwNTAyNzMsImV4cCI6MTc2NjY0MjI3MywiY29tcGFueUlkIjoxLCJ1c2VySWQiOiJkZXYtbGp4MSIsImFwcElkIjoiMTAwMDAiLCJkZXBhcnRtZW50SWQiOjM3MDAzLCJ1c2VyS2lkIjoxODg0Njc0ODE5NjM5NDA4NzM3LCJnZW5lcmF0ZVRpbWUiOiIyMDI1LTExLTI1IDEzOjU3OjUzIiwib3JpZ2luIjoiMTAwMDAiLCJpcCI6IjE5Mi4xNjguMTYwLjIzMiIsImp0aSI6ImVlMzJmYjMxLTUxNjktNDNhMi1hYjNiLWI0NmQ0ZmZiNjhiYiJ9.kRHJkYLeFH94pvKvcfTfxLLZXbYZMmgjAacZkxodyBVNWqQDgyau8WHeOtN88st54sgP9C0GnXn6M47nAy4nFyxBT1Uy56U8yloIMThPpIvvQ9381FmIffJhzXYgLePQEsWfkZFIa0nnCsAThj8cx0M057T-fqvAM-QOTCbet3Q`;
const refreshToken = "xxx";
const clientFrom = isEn ? "hyWebClient" : "webClient";
const env = sessionStorage.getItem("accountEnv");

// ----------------- 在线服务域名 -----------------
const webcallOnlineDomain = isEn
  ? {
    test: "//test19.easyliao.net",
    pre: "//pre.upbeat.chat",
    prod: "//mgr.upbeat.chat",
  }
  : {
    test: "//test-prd18.easyliao.net",
    "test-prd18": "//test-prd18.easyliao.net",
    prd19: "//prd19.easyliao.com",
    pre: "//pre-mgr.easyliao.net",
    group6: "//group6-mgr.easyliao.com",
    group5: "//group5-mgr.easyliao.com",
    "group2-prd4": "//group2-prd4-mgr.easyliao.com",
    "group-prd3": "//group-prd3-mgr.easyliao.com",
    "group2-prd2": "//group2-mgr.easyliao.com",
    "group-prd1": "//group-mgr.easyliao.com",
    "tx-mgr": "//tx-mgr.easyliao.com",
    "group-prd5": "//tx-mgr.easyliao.com",
  };

export const webcallOnlineMenus = [
  "pageCommonWord",
  "customerAccount",
  "channelQF",
  "chatWidget",
  "visitorCol",
  "customerGroup",
  "clues",
  "chatRecord",
  "HomeBusinessOverview",
  "almostAlwaysDate",
  "almostAlwaysArea",
  "insertDate",
  "insertGroup",
  "insertArea",
  "talkGroup",
  "talkReceptionType",
  "busCardDate",
  "serviceWork",
];

// ----------------- ai6 -----------------
const ai6Domain = {
  test: "//test-prd18.easyliao.net/eachbot-flow-web/index",
  pre: "//group6-mgr.easyliao.com/eachbot-flow-web/index",
  prod: "//train.easyliao.com/eachbot-flow-web/index",
  group6: "//group6-mgr.easyliao.com/eachbot-flow-web/index",
  group5: "//train.easyliao.com/eachbot-flow-web/index",
};
export const ai6Menus = ["pageMachineLearning", "pageKnowledgeBase"];

// ----------------- 用户中心 -----------------
const userCenterMenus = isEn ? ["manual-user", "role-per-hw"] : ["department"];

const userCenterDomain = {
  test: isEn ? "//test19.easyliao.net/auth-eupms/vi/ad" : "//test-prd18.easyliao.net/auth-eupms/vi/ad",
  pre: isEn ? "//pre-auth.upbeat.chat/auth-eupms/vi/ad" : "//pre-auth.easyliao.net/auth-eupms/vi/ad",
  prod: isEn ? "//auth.upbeat.chat/auth-eupms/vi/ad" : "//auth.easyliao.com/auth-eupms/vi/ad",
  group6: "//group6-auth.easyliao.com/auth-eupms/vi/ad",
  group5: "//group5-auth.easyliao.com/auth-eupms/vi/ad",
};

// ----------------- 菜单 ID 映射 -----------------
const uriMap = {
  "manual-user": "Teams1001",
  department: "992f506b-b189-4b35-9c01-9473104e9903",
  "role-per-hw": "RolesandPermissions1001",
  pageCommonWord: "633a9f19-fcdd-45f0-be56-3038e5254eed",
  visitorCol: "a3bc02db-970f-4a9c-9c32-a3883942cd73",
  chatWidget: "chatWidget",
  customerGroup: "2b2da17f-67fa-4321-ac11-92191a78e7d6",
  clues: "85cb2779-d129-4e3a-ac2d-d1724c1125fa",
  record: "chatRecord",
  HomeBusinessOverview: "report-home-business-profile",
  almostAlwaysDate: "35fd8b9f-b00f-4686-b0db-2c1d48c3415a",
  almostAlwaysArea: "fb916555-ef16-442d-a190-c90d1d6343b4",
  insertDate: "e3c6d7f1-ef87-48ae-b5cb-1e9896fbff99",
  insertGroup: "ecd5ef50-d8d8-44fc-a7c1-96b0de7ec83a",
  insertArea: "86ac1374-13ba-482e-a7ab-ddf60911f7df",
  talkGroup: "report_visitor_record_group",
  talkReceptionType: "report_visitor_record_receptionType",
  busCardDate: "cdfe1aed-8720-4253-8466-fe8b2e5e333c",
  serviceWork: "assess_orederCs",
};

// ----------------- URL 构造器 -----------------
const builders = (() => {
  const userCenter = (menu) => `${userCenterDomain[window.__sso]}/${appId}/?code=${menu}&access_token=${token}&clientFrom=${clientFrom}${isEn ? "&lang=en" : ""}`;

  const ai6 = (menu) => `${ai6Domain[window.__sso]}/?access_token=${token}&refresh_token=${refreshToken}&clientFrom=${clientFrom}/#/${menu}`;

  const routes = {
    pageCommonWord: `/console/?jumpType&clientFrom=${clientFrom}&check=${token}&pPath=auxliary&type=pageCommonWord`,
    customerAccount: `/console/?jumpType&clientFrom=${clientFrom}&check=${token}&pPath=configInfo&type=customerAccount`,
    customerGroup: `/console/?jumpType&clientFrom=${clientFrom}&check=${token}&pPath=configInfo&type=customerGroup`,
    chatRecord: isEn ? `/record/?hwCheck=${token}` : `/record/?juliangCheck=${token}&clientFrom=${clientFrom}`,
    clues: isEn ? `/clues/?hwCheck=${token}` : `/clues/?juliangCheck=${token}&clientFrom=${clientFrom}`,
    channelQF: `/operate/?jumpType&check=${token}&clientFrom=${clientFrom}&type=channelQF`,
    visitorCol: `/console/?jumpType&clientFrom=${clientFrom}&check=${token}&pPath=auxliary&type=visitorCol`,
  };

  const webcallOnline = (menu) => {
    // 优先根据环境 env 选择域名（兼容历史 key），回退到 window.__sso
    const key = isEn ? window.__sso : (env || window.__sso);
    const domain = webcallOnlineDomain[key];
    return domain + (routes[menu] || "");
  };

  return { userCenter, ai6, webcallOnline };
})();

// ----------------- 统一获取系统菜单 -----------------
const getSysList = (menus, system) =>
  menus.map((menu) => ({
    source: builders[system]?.(menu) || "",
    params: isEn ? uriMap[menu] : menu,
  }));

// ----------------- 导出 -----------------
export const sourceList = [
  ...getSysList(ai6Menus, "ai6"),
  ...getSysList(userCenterMenus, "userCenter"),
  ...getSysList(webcallOnlineMenus, "webcallOnline"),
];


const URLs = {
  "authEupms": "https://test-prd18.easyliao.net/auth-eupms",
  "authSso": "https://test-prd18.easyliao.net/auth-sso",
  "im": "https://test-prd18.easyliao.net/im-gateway/im",
  "webcall": "https://test-prd18.easyliao.net/im-gateway/webcall",
  "eachbotFlowWeb": "https://test-prd18.easyliao.net/eachbot-flow-web",
  "trust": "https://test-prd18.easyliao.net/trust",
  "ocomsWeb": "https://test-prd18.easyliao.net/ocoms-web",
  "consoleWeb": "https://test-prd18.easyliao.net/console/Service",
  "report": "https://test-prd18.easyliao.net/report",
  "payBillWeb": "https://test-prd18.easyliao.net/pay-bill-web",
  "integrationWeb": "https://test-prd18.easyliao.net/external-web",
  "appletConsole": "https://test-prd18.easyliao.net/applet-console",
  "console": "https://test-prd18.easyliao.net/console",
  "operate": "https://test-prd18.easyliao.net/operate",
  "record": "https://test-prd18.easyliao.net/record",
  "clues": "https://test-prd18.easyliao.net/clues",
  "cuour": "https://test-prd18.easyliao.net/cuour",
  "rpaConsole": "https://test-prd18.easyliao.net/rpa-console",
  "agentWeb": "https://test-prd18.easyliao.net/boss-agent",
  "eachbotKnowledgeWeb": "https://test-prd18.easyliao.net/eachbot-knowledge-web",
  "appletShop": "https://test-prd18.easyliao.net/applet-shop",
  "rpaClientApi": "https://test-prd18.easyliao.net/rpa-client-api"
}
