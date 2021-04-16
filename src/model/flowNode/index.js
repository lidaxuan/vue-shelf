/* jshint esversion: 6 */
/*
 * @Description: 1
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 18:22:20
 * @FilePath: /vue-project1/src/model/flowNode/index.js
 */
// import _ from 'lodash';
import { axios } from "@/dao/index";

/** 媒体列表 */
export async function getMediaList(params) {
  try {
    return await axios.get("/flow/list", { params });
  } catch (e) {
    return [];
  }
}
export function mediaProgressExport(params) {
  return axios.get("/report/mediaProgressExport", { params });
}

/** 获取节点列表 */
// export async function getFlowList() {
//   let data = await getMediaList();
//   for (let i = 0; i < data.length; i++) {
//     data[i] = _.assign({}, data[i], {...nodeBase});
//     data[i].backImage = _.cloneDeep(data[i].filePath);
//     data[i].pid = '-1';
//     data[i].form = {};
//     data[i].form.mediaId = _.cloneDeep(data[i].id);
//     delete data[i].filePath;
//   }
//   return data;
// }
