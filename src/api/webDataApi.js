/*
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2020-06-28 19:03:15
 * @LastEditors: web.duanzhaozhao
 * @LastEditTime: 2020-11-18 18:41:09
 * @FilePath:
 */

//素材 标签
const webDataApi = {
    webLabel: {
        //流程获取标签
        method: 'get',
        url: '/label',
    },
    webDataListFiles: {
        //获取素材列表
        method: 'get',
        url: '/material/listFiles',
    },
    webDataVisitorCol: {
        //获取标签列表
        method: 'get',
        url: '/visitorCol/query',
    },
    webDataMaterialUpload: {
        //上传图片
        method: 'post',
        url: '/material/upload',
    },
    webDataChatInfoList: {
        //总标签列表
        method: 'post',
        url: '/chatInfo/list',
    },
    webDataChatInfoAdd: {
        //总标签新增
        method: 'post',
        url: '/chatInfo/add',
    },
    webDataChatInfoDelete: {
        //总标签删除
        method: 'post',
        url: '/chatInfo/delete',
    },
    webDataChatInfoUpdate: {
        //总标签更新
        method: 'post',
        url: '/chatInfo/update',
    },

};
export default webDataApi;
