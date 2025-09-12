/* jshint esversion: 6 */
/*
 * @Description:
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 18:20:35
 * @FilePath: /vue-project1/src/env/index.vue
 */
import URL from 'url';

const env = {
  NODE_ENV: 'production', // 默认为线上环境
  BASE_URL: '/',  // 路由根地址
  VUE_APP_Token_Name: 'token', // token 名称
  VUE_APP_API_Domain: '//devyiliapi.myrtb.net',
  // VUE_APP_API_Domain2: '//devyilidmpapi.myrtb.net',
  // VUE_APP_API_Domain3: '//devyilidmp.behe.com',
  VUE_APP_API_Domain4: '//devyilisandbox.behe.com'
};
const option = {
  env: Object.assign({}, env, process.env)
};
if (/^\/\//i.test(option.env.BASE_URL)) {
  const baseUrl = `${window.location.protocol}${option.env.BASE_URL}`;
  const url = URL.parse(baseUrl);
  option.env.BASE_URL = url.pathname;
}


if (/^\/\//i.test(option.env.VUE_APP_API_Domain)) {
  option.env.VUE_APP_API_Domain = `${window.location.protocol}${option.env.VUE_APP_API_Domain}`;
}
export default option;
