/*
 * @Author: web.duanzhaozhao
 * @Date: 2020-11-17 16:36:48
 * @LastEditors: web.duanzhaozhao
 * @LastEditTime: 2020-11-19 11:36:25
 * @Description: file content
 */

import axios from 'axios';
import {viewBase} from "./baseUrl"

import {serveApi} from "./serveApi";

// 创建axios实例
let instance = axios.create({
    baseURL:viewBase,
    timeout: 60000 // 请求超时时间
})

export default serveApi(instance);