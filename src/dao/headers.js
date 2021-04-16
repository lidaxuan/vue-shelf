/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 18:14:02
 * @FilePath: /vue-project1/src/dao/headers.js
 */
import cookie from 'js-cookie';
import process from '@/env/index';

export function headers(key = process.env.VUE_APP_Token_Name) {
  // const key = process.env.VUE_APP_Token_Name;
  const value = cookie.get(key);
  return {
    token: value,
  };
}