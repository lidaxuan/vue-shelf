/*
 * @Author: web.duanzhaozhao
 * @Date: 2020-11-16 11:26:43
 * @LastEditors: web.duanzhaozhao
 * @LastEditTime: 2020-11-16 11:26:44
 * @Description: file content
 */

import axios from 'axios';
import {weChatURL} from "./baseUrl"

import {serveApi} from "./serveApi";

// 创建axios实例
let instance = axios.create({
    baseURL:weChatURL,
    timeout: 60000 // 请求超时时间
})

export default serveApi(instance);
