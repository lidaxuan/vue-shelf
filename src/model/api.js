/* jshint esversion: 6 */

import { method } from "lodash"

/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-22 09:59:13
 * @FilePath: /vue-shelf/src/model/api.js
 */
export default {
  structGet: {
    url: '/struct/get',
    method: 'get'
  },
  structUpdate: {
    url: '/struct/update',
    method: 'post'
  },
  structCreate: {
    url: '/struct/create',
    method: 'post'
  },
  structDelete: {
    url: '/struct/delete',
    method: 'delete'
  },


  dataInsert: {
    url: '/data/insert',
    method: 'post'
  },
  dataUpdate: {
    url: '/data/update',
    method: 'post'
  },
  dataQuery: {
    url: '/data/query',
    method: 'get'
  },
  dataPageQuery: {
    url: '/data/pageQuery',
    method: 'get'
  },
  dataDelete: { // 
    url: '/data/delete',
    method: 'delete'
  },

  structGetPage: {
    method: 'get',
    url: '/struct/get-page'
  }
}

// this.$structDemoClient.