/* jshint esversion: 6 */
/*
 * @Description: 1
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 18:15:47
 * @FilePath: /vue-project1/src/goLogin/index.js
 */
// import process from '@/env/index';
export function gologin() {
  clearAllCookie();
  // const href = `//${process.env.VUE_APP_Token_yilihost}/user/login`;
  // window.location.href = href;
  return false;
}

//清除所有cookie函数
function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?==)/g);
  if(keys) {
    for(var i = keys.length; i--;){
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
    }
  }
}