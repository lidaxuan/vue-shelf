/* jshint esversion: 6 */
/*
 * @Description:
 * @version:
 * @Author: 李继玄（lijixuan@quclouds.com）
 * @Date: 2020-08-04 14:20:53
 * @LastEditors: 李继玄（lijixuan@quclouds.com）
 * @LastEditTime: 2020-08-04 14:20:58
 * @FilePath: \decision-web\src\model\share\index.vue
 */

import { axios } from '../../dao/index';

export function reportExchange(params) {
  return axios.get('/report/exchange',{params});
}

export function reportExcGetResource(params) {
  return axios.get('/report/excGetResource',{params});
}

export function kpiList(params) {
  return axios.get('/report/share/kpi/list',{params});
}

export function excShareResourceList(params) {
  return axios.get('/report/excShareResource',{params});
}

export function addSchedule(params) {
  return axios.post('/wave/add',params);
}



export function downloadExchangeExport(params) {
  return axios.get('/report/exchangeExport',{params});
}

export function downloadExcGetResourceExport(params) {
  return axios.get('/report/excGetResourceExport',{params});
}

export function downloadExcShareResourceExport(params) {
  return axios.get('/report/excShareResourceExport',{params});
}
