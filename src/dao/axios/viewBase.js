/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-07-26 14:09:51
 * @FilePath: /vue-shelf/src/dao/axios/viewBase.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-07-26 14:10:08
 */
/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-22 09:53:16
 * @FilePath: /vue-shelf/src/dao/axios/structDemoClient.js
 */

import axios from 'axios';
import { serveApi } from './serveApi'



const server = axios.create({
  timeout: 5000 * 100,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  withCredentials: false, // 不发送 cookie
  baseURL: '/data-config', // 默认域名
});

export default serveApi(server);