/*
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2020-06-28 19:03:15
 * @LastEditors: web.duanzhaozhao
 * @LastEditTime: 2020-11-18 18:41:09
 * @FilePath: \kcall-web-view\src\api\knowledgeApi.js
 */

// ai和人工问答库
const knowledgeApi = {
    robotKnowledgeBaseListPage: {
        //问答库列表
        method: 'post',
        url: '/bot-knowledge-base/getBotKnowledgeBaseListPage',
    },
    getClassificationType: {
        //分类列表
        method: 'post',
        url: '/bot-classification/getBotClassificationListByClassificationType',
    },
    getClassificationId: {
        //分类删除
        method: 'get',
        url: '/bot-classification/delete',
    },
    getClassificationUpdate: {
        //分类修改
        method: 'post',
        url: '/bot-classification/update',
    },
    getClassificationInsert: {
        //分类修改
        method: 'post',
        url: '/bot-classification/insert',
    },
    getKnowledgeInsert: {
        //问答添加
        method: 'post',
        url: '/bot-knowledge-base/insert',
    },
    getKnowledgeUpdate: {
        //问答更新
        method: 'post',
        url: '/bot-knowledge-base/update',
    },
    getKnowledgeDelete: {
        //问答刪除
        method: 'post',
        url: '/bot-knowledge-base/delete',
    },
    getKnowledgeEnable: {
        //问答启用
        method: 'post',
        url: '/bot-knowledge-base/enable',
    },
    getKnowledgeDisable: {
        //问答禁用
        method: 'post',
        url: '/bot-knowledge-base/disable',
    },
    getKnowledgeMove: {
        //问答转移
        method: 'post',
        url: '/bot-knowledge-base/move',
    },


    //知识库分类-列表
    postInsertCategory: {
        //新增
        method: 'post',
        url: '/category/insert',
    },
    postCategorys: {
        //列表
        method: 'post',
        url: '/category/selectList',
    },
    postUpdateCategory: {
        //编辑
        method: 'post',
        url: '/category/updateById',
    },
    postDelCategory: {
        //删除
        method: 'post',
        url: '/category/deleteBatchIds',
    },
    //知识库分类-表格
    postSelectPage: {
        //列表
        method: 'post',
        url: '/knowledge/selectPage',
    },
    postUpdate: {
        //编辑
        method: 'post',
        url: '/knowledge/updateById',
    },
    postDel: {
        //删除
        method: 'post',
        url: '/knowledge/deleteBatchIds',
    },
    postInsert: {
        //新增
        method: 'post',
        url: '/knowledge/insert',
    },
    postUpload: {
        //导入
        method: 'post',
        url: '/knowledge/upload',
    },
    postAutoStydy: {
        //自主学习
        method: 'post',
        url: '/category/autodidacticism',
    },
    postBinding: {
        //自主学习
        method: 'post',
        url: '/category/binding',
    },
    trainList: {
        //自主学习
        method: 'post',
        url: '/train',
    },
    // 复制绑定
    knowledgeClone: {
        //自主学习
        method: 'post',
        url: '/knowledge/clone',
    },


};
export default knowledgeApi;
