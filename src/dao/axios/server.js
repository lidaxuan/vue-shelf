/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 18:14:02
 * @FilePath: /vue-project1/src/dao/axios/server.js
 */
import axios from 'axios';
import process from '@/env/index';

const timeout = 5000 * 100;

// console.log(process.env);
const server = axios.create({
  timeout,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  withCredentials: false, // 不发送 cookie
  baseURL: process.env.VUE_APP_API_Domain, // 默认域名
});

export default server;