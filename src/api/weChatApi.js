/*
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2020-06-28 19:03:15
 * @LastEditors: web.duanzhaozhao
 * @LastEditTime: 2020-11-18 18:41:09
 * @FilePath:
 */

//微信号码池
const weChatApi = {
    groupList: {
        //号码池管理列表
        method: 'get',
        url: '/group/list',
    },
    groupCreate: {
        //号码池管理新增
        method: 'post',
        url: '/group/create',
    },
    groupUpdate: {
        //号码池管理修改
        method: 'post',
        url: '/group/update',
    },
    groupDelete: {
        //号码池管理删除
        method: 'delete',
        url: 'group/delete',
    },
    cardPage: {
        //号码管理列表
        method: 'post',
        url: '/card/page',
    },
    cardUpdatePost: {
        //号码管理更新
        method: 'post',
        url: '/card/update',
    },
    cardUpdatePatch: {
        //号码管理更新状态
        method: 'patch',
        url: '/card/update',
    },
    cardAllocation: {
        method: 'get',
        url: '/card/allocation',
    },
    cardDelete: {
        // 删除号码
        method: 'post',
        url: '/card/delete',
    },
    cardInsert: {
        // 新增
        method: 'post',
        url: '/card/insert',
    },
    cardImportExcel: {
        // 导入
        method: 'post',
        url: '/card/importExcel',
    },
    cardDetail: {
        // 获取号码详情
        method: 'get',
        url: '/card/detail',
    },
};
export default weChatApi;
