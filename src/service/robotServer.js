/*
 * @Author: web.duanzhaozhao
 * @Date: 2020-11-17 16:36:48
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-11-24 16:27:46
 * @Description: file content
 */

import axios from 'axios';
import { robotURL } from "./baseUrl"
import { serveApi } from "./serveApi";

// 创建axios实例
let instance = axios.create({
    baseURL: "http://test-prd18.easyliao.net",
    timeout: 60000 // 请求超时时间
})

export default serveApi(instance);
