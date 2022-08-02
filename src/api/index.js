/*
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2020-05-22 11:12:07
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-07-26 14:06:38
 * @FilePath: /vue-shelf/src/api/index.js
 */

import knowledgeApi from './knowledgeApi';
import textRobotApi from './textRobotApi';
import weChatApi from './weChatApi';
import webDataApi from './webDataApi';
import eachbotFlowAdminWeb from './eachbotFlowAdminWeb';


const API = {
  userApi: {
    // 获取用户信息
    method: 'get',
    url: '/user',
  },
  ...knowledgeApi,
  ...textRobotApi,
  ...weChatApi,
  ...webDataApi,
  ...eachbotFlowAdminWeb,
};
export default API

