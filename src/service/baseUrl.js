/*
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2020-06-25 12:09:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-10 18:45:04
 *
 * 这里是服务
 */

// // 知识库
// export const robotURL = process.env.NODE_ENV === 'production' ? "/ai6" : "/robot/ai6";//本地
// // 知识库
// export const knowledgeURL = process.env.NODE_ENV === 'production' ? "/kbs" : "/robot/kbs";//本地
// export const kbpURL = process.env.NODE_ENV === 'production' ? "/kbp" : "/robot/kbp";//知识库测试机器人
// export const trainURL = process.env.NODE_ENV === 'production' ? "/" : "/robot";//自主学习
// // 语料
// export const corpusURL = process.env.NODE_ENV === 'production' ? '/eachbot' : '/robot/eachbot';//本地
// 知识库
export const robotURL = process.env.NODE_ENV === 'production' ? "/eachbot-flow-service" : "/robot/eachbot-flow-service"; //本地
// 知识库
export const knowledgeURL = process.env.NODE_ENV === 'production' ? "/eachbot-kbs" : "/robot/eachbot-kbs"; //本地
export const kbpURL = process.env.NODE_ENV === 'production' ? "/eachbot-nlp-kb-proxy" : "/robot/eachbot-nlp-kb-proxy"; //知识库测试机器人
export const trainURL = process.env.NODE_ENV === 'production' ? "/" : "/robot"; //自主学习
export const webDataURL = process.env.NODE_ENV === 'production' ? "/webData" : "/robot/webData"; //标签接口服务
// 语料
export const corpusURL = process.env.NODE_ENV === 'production' ? '/eachbot-corpus' : '/robot/eachbot-corpus'; //本地
export const weChatURL = process.env.NODE_ENV === 'production' ? '/eachbot-business-card-allocation' : '/robot/eachbot-business-card-allocation'; //本地
export const eachbotFlowAdminWeb = process.env.NODE_ENV === 'production' ? '/eachbot-flow-admin-web' : '/robot/eachbot-flow-admin-web'; //本地
export const viewBase = process.env.NODE_ENV === 'production' ? '' : '/api'; //本地

// 统一认证服务 和通话记录
let unifiedCertificationUrl;
if (window.location.origin.indexOf("localhost") != -1 || process.env.VUE_APP_CURRENTMODE == 'local') {
    // unifiedCertificationUrl = "http://dev-app.easyliao.com";
    unifiedCertificationUrl = `${document.location.protocol}//test.easyliao.com`;
} else if (window.location.origin.indexOf("http://prd19.easyliao.com") != -1) {
    // unifiedCertificationUrl = "http://test.easyliao.com";
    // unifiedCertificationUrl = "http://dev-app.easyliao.com";
    unifiedCertificationUrl = `${document.location.protocol}//auth.easyliao.com`
        // unifiedCertificationUrl = "http://dev-app.easyliao.com";
} else if (window.location.origin.indexOf("http://dev-prd19.easyliao.com") != -1) {
    unifiedCertificationUrl = `${document.location.protocol}//dev-app.easyliao.com`;
    // unifiedCertificationUrl = "http://auth.easyliao.com";
    // unifiedCertificationUrl = "http://dev-app.easyliao.com";
} else if (window.location.origin.indexOf("http://app.easyliao.com") != -1) {
    unifiedCertificationUrl = `${document.location.protocol}//test.easyliao.com`;
    // unifiedCertificationUrl = "http://auth.easyliao.com";
    // unifiedCertificationUrl = "http://dev-app.easyliao.com";
}
// export const originUrl=window.location.origin +"/textbot/view";
export const originUrl = window.location.origin + '/eachbot-flow-admin-web/frontend/view';
// export const unified = unifiedCertificationUrl + "/auth-sso/oauth/web/login/view?redirectUri=" + originUrl;
export const unified = `${unifiedCertificationUrl}/auth-sso/oauth/web/login/view?redirectUri=${originUrl}&appId=91201`;