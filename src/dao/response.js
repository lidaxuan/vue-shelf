/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 18:14:02
 * @FilePath: /vue-project1/src/dao/response.js
 */
// import {
//   Message,
// } from 'element-ui';
import {gologin} from '@/goLogin';
const Code = {
  success: 10000
};

export function Success(response) {
  if (response.code === Code.success) {
    return response.data;
  }
  if (response.code === 10013) {
    gologin();
    // Message.error('登录失效,请重新登录!');
    // console.log();
  } else if (response.code !== Code.success) {
    // Message.error(response.msg);
    // alert(2);
  }
  return response;
}

