/* jshint esversion: 6 */
/*
 * @Description:
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 18:14:02
 * @FilePath: /vue-project1/src/dao/axios/index.vue
 */
import _ from 'lodash';
import server from './server';
import { headers } from '../headers';
import { Success } from '../response';
import sefaSet from '@lijixuan/safe-set';
import Qs from 'qs';

// 发送前触发
server.interceptors.request.use(function (config) {
  const method = _.toLower(config.method);
  if (_.includes(method, "post") ) {
    config.data = Qs.stringify(config.data);
    sefaSet(config, 'headers.Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }
  _.each(headers(), (value, key) => {
    sefaSet(config, `headers.${key}`, value);
  });
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应前触发
server.interceptors.response.use( response => {
  if (response.status === 200 || response.statusText === 'ok') {
    return Success(response.data ? response.data : response);
  }
  return response;
},  error => {
  return Promise.reject(error);
});

export default server;
