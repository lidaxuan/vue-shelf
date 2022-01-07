/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-02 18:40:54
 * @FilePath: /textbot-web-view/src/service/eachbotFlowAdminWeb.js
 */

import axios from 'axios';
import { eachbotFlowAdminWeb } from "./baseUrl"
import { serveApi } from "./serveApi";

// 创建axios实例
let instance = axios.create({
    baseURL: eachbotFlowAdminWeb,
    timeout: 60000 // 请求超时时间
})

export default serveApi(instance);
