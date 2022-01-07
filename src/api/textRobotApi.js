/*
 * @version: v1.2.0
 * @Author: 范庆龙
 * @Date: 2020-10-21 18:52:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-23 15:10:24
 * @FilePath: /textbot-web-view/src/api/textRobotApi.js
 */

const textRobotApi = {

    ai6RobotAppAiUserList: {
        // 获取机器人列表
        method: 'get',
        url: '/robot-app/aiUser/list',
    },
    ai6AiUserWelcomesAdd: {
        // 欢迎语(ai6新增)
        method: 'post',
        url: '/aiUserWelcomes/add',
    },
    ai6AiUserWelcomesDelete: {
        // 删除欢迎语
        method: 'delete',
        url: '/aiUserWelcomes/delete',
    },
    ai6AiUserWelcomesList: {
        // 欢迎语列表(不分页)
        method: 'get',
        url: '/aiUserWelcomes/list',
    },
    ai6AiUserWelcomesUpdate: {
        //修改欢迎语
        method: 'post',
        url: '/aiUserWelcomes/update',
    },
    ai6AiQuestionCategoryList: {
        //提问分类列表
        method: 'get',
        url: '/aiQuestionCategory/list',
    },

    ai6AiBaseQuestionList: {
        //提问库列表
        method: 'get',
        url: '/aiBaseQuestion/list',
    },
    ai6AiUserCount: {
        //获取机器人数量
        method: 'post',
        url: '/aiUser/aiUserCount',
    },
    ai6AiUserClearFlow: {
        // 清空机器人流程
        method: 'post',
        url: '/aiUser/clearFlow',
    },
    ai6AiUserFindActions: {
        //获取机器人下所有标签
        method: 'get',
        url: '/aiUser/findActions',
    },
    ai6AiUserFlow: {
        //流程详情, 包括模块和连线(ai6)
        method: 'get',
        url: '/aiUser/flow',
    },
    ai6AiUserFlowBounds: {
        // 机器人信息
        method: 'post',
        url: '/aiUser/flow/bounds',
    },

    ai6AiUserInfo: {
        // 机器人信息
        method: 'get',
        url: '/aiUser/info',
    },
    ai6AiUserList: {
        // 获取机器人全量列表
        method: 'get',
        url: '/aiUser/list',
    },
    ai6AiUserLock: {
        // 机器人状态切换(ai6新增)
        method: 'post',
        url: '/aiUser/lock',
    },
    ai6AiUserPage: {
        // 机器人列表(ai6更新)
        method: 'post',
        url: '/aiUser/page',
    },
    ai6AiUserRecordClear: {
        // 一键清空录音
        method: 'post',
        url: '/aiUser/record/clear',
    },
    ai6AiUserRecordDelete: {
        // 录音删除
        method: 'get',
        url: '/aiUser/record/delete',
    },
    ai6AiMaterialQuery: {
        // 话术搜索
        method: 'post',
        url: '/aiMaterial/query',
    },
    ai6AiUserRecordReplace: {
        // 录音替换
        method: 'post',
        url: '/aiUser/record/replace',
    },
    ai6AiUserRecordReplaceList: {
        // 录音替换列表
        method: 'get',
        url: '/aiUser/record/replace/list',
    },
    ai6AiUserRecordReplaceListExport: {
        //录音替换列表导出
        method: 'get',
        url: '/aiUser/record/replace/list/export',
    },

    ai6AiUserTrainDetailGet: {
        //获取训练细节详情
        method: 'get',
        url: '/aiUser/trainDetail',
    },
    ai6AiUserTrainDetailPost: {
        //提交训练细节详情
        method: 'post',
        url: '/aiUser/trainDetail',
    },
    ai6AiUserTrainDetailDelete: {
        //删除训练细节详情
        method: 'delete',
        url: '/aiUser/trainDetail',
    },
    ai6AiBaseConditionIntentions: {
        //获取所有意图
        method: 'get',
        url: '/aiBaseCondition/intentions',
    },
    ai6AiUserModuleClone: {
        //将模块拖入画布
        method: 'post',
        url: '/aiUserModule/clone',
    },
    ai6AiUserModuleDelete: {
        //删除模块
        method: 'delete',
        url: '/aiUserModule/delete/module',
    },
    ai6AiUserModuleDeleteQuestions: {
        //删除场景问题
        method: 'delete',
        url: '/aiUserModule/delete/questions',
    },
    ai6AiUserModuleInfo: {
        //获取模块信息
        method: 'get',
        url: '/aiUserModule/info',
    },
    //获取流程模板信息
    ai6AiBaseModuleInfo: {
        method: 'get',
        url: '/aiBaseModule/info',
    },
    ai6AiUserModuleList: {
        //获取机器人所有模块
        method: 'get',
        url: '/aiUserModule/list',
    },
    ai6AiUserModulePropertiesBasic: {
        //获取外呼模块基础设置详情
        method: 'get',
        url: '/aiUserModule/properties/basic',
    },
    ai6AiUserModuleOutModuleUpdate : {
        //模块联线
        method: 'post',
        url: '/aiModuleRule/outModule/update',
    },
    ai6AiUserModulePropertiesQuestions: {
        //机器人提问(ai6)
        method: 'get',
        url: '/aiUserModule/properties/questions',
    },
    ai6AiUserModulePropertiesTimeout: {
        //模块超时回复列表(ai6)
        method: 'get',
        url: '/aiUserModule/properties/timeout',
    },
    ai6AiUserQuestionAdd: {
        //模块超时回复列表(ai6)
        method: 'post',
        url: '/aiUserModule/question/add',
    },
    ai6AiUserQuestionChangeMaterial: {
        //修改问题(ai6)
        method: 'post',
        url: '/aiUserModule/question/changeMaterial',
    },
    ai6AiUserQuestionInfo: {
        //获取问题、录音详情
        method: 'get',
        url: '/aiUserModule/question/info',
    },
    ai6AiUserRuleOrder: {
        //意图排序(ai6)
        method: 'post',
        url: '/aiUserModule/rule/order',
    },
    ai6AiUserQuestionOrder: {
        //问题排序(ai6)
        method: 'post',
        url: '/aiUserModule/question/order',
    },
    ai6AiUserQuestionUpdate: {
        //机器人答复-修改场景问题
        method: 'post',
        url: '/aiUserModule/question/update',
    },
    ai6AiUserQuestionUpdateQuestionType: {
        //场景问题、机器人答复顺序修改
        method: 'post',
        url: '/aiUserModule/question/update/questionType',
    },
    ai6AiUserModuleResetStart: {
        //重置开始模块
        method: 'post',
        url: '/aiUserModule/reset/start',
    },
    ai6AiUserModuleRuleOrder: {
        //更新模块意图顺序
        method: 'post',
        url: '/aiUserModule/rule/order',
    },
    ai6AiUserModuleTimeoutAdd: {
        //更新模块意图顺序
        method: 'post',
        url: '/aiUserModule/timeout/add',
    },
    ai6AiUserModuleTimeoutDelete: {
        //更新模块意图顺序
        method: 'delete',
        url: '/aiUserModule/timeout/delete',
    },
    ai6AiUserModuleTimeoutUpdate: {
        //更新模块意图顺序
        method: 'post',
        url: '/aiUserModule/timeout/update',
    },
    ai6AiUserModuleUpdateName: {
        //更新模块名
        method: 'post',
        url: '/aiUserModule/update/name',
    },
    ai6AiUserModuleUpdateReplyAddPoolVoice: {
        //机器人答复-上传录音 录音池选择录音
        method: 'post',
        url: '/aiUserModule/update/reply/addPoolVoice',
    },

    ai6AiUserModuleUpdateReplyAddText: {
        //机器人答复-上传文本
        method: 'post',
        url: '/aiUserModule/update/reply/addText',
    },
    ai6AiUserModuleUpdateReplyAddVoice: {
        //机器人答复-上传录音  本地上传-同步添加至录音池
        method: 'post',
        url: '/aiUserModule/update/reply/addVoice',
    },
    ai6AiSceneQuestionNodeList: {
        //模块节点回复(ai6) 机器人被动推问
        method: 'get',
        url: '/aiSceneQuestionNode/list',
    },
    ai6AiSceneQuestionNodeUpdatet: {
        //修改模块节点回复
        method: 'post',
        url: '/aiSceneQuestionNode/update',
    },
    ai6AiModuleRuleClone: {
        //模块迁移规则 选择内置意图 内置意图可以在模板中获取
        method: 'post',
        url: '/aiModuleRule/clone',
    },
    ai6AiModuleCustomDelete: {
        //删除意图 模块中的意图按钮
        method: 'delete',
        url: '/aiModuleRule/custom/delete',
    },
    ai6AiModuleCustomIntentionGet: {
        //获取意图详情 用于编辑自定义意图数据回显
        method: 'get',
        url: '/aiModuleRule/custom/intention',
    },
    ai6AiModuleCustomIntentionPost: {
        //添加自定义意图 用于编辑自定义意图数据回显
        method: 'post',
        url: '/aiModuleRule/custom/intention',
    },
    ai6AiModuleCustomUpdate: {
        //更新自定义意图  用于编辑自定义意图数据回显
        method: 'post',
        url: '/aiModuleRule/custom/update',
    },
    ai6AiModuleIntentionName: {
        //获取意图名 获取意图名, 通话记录无projectId
        method: 'get',
        url: '/aiModuleRule/intention/name',
    },

    ai6AiModulePropertiesRules: {
        //模块已配置意图列表
        method: 'get',
        url: '/aiModuleRule/properties/rules',
    },

    ai6AiBaseModuleList: {
        //模板列表
        method: 'get',
        url: '/aiBaseModule/list',
    },
    ai6AiBaseModulePage: {
        //分页模板列表
        method: 'post',
        url: '/aiBaseModule/page',
    },
    ai6AiBaseNodeAddBaseNode: {
        //分页模板列表
        method: 'post',
        url: '/AiBaseNode/addBaseNode',
    },
    ai6AiBaseNodeBatchDeleteBaseNode: {
        //批量删除知识库
        method: 'post',
        url: '/AiBaseNode/batchDeleteBaseNode',
    },
    ai6AiBaseNodeDeleteReplys: {
        //删除知识库答复
        method: 'delete',
        url: '/AiBaseNode/deleteReplys',
    },
    ai6AiBaseNodeDetail: {
        //知识库详情
        method: 'get',
        url: '/AiBaseNode/detail',
    },

    ai6AiBaseNodeDownload: {
        //知识库导出清单
        method: 'get',
        url: '/AiBaseNode/download',
    },
    ai6AiBaseNodeOrder: {
        //调整知识库顺序
        method: 'post',
        url: '/AiBaseNode/order',
    },
    ai6AiBaseNodePage: {
        //知识库分页查询
        method: 'get',
        url: '/AiBaseNode/page',
    },
    ai6AiBaseNodeReplaceReplys: {
        //列表页上传录音
        method: 'post',
        url: '/AiBaseNode/replaceReplys',
    },
    ai6AiBaseNodeUpdateBaseNode: {
        //修改知识库
        method: 'post',
        url: '/AiBaseNode/updateBaseNode',
    },
    ai6AiBaseNodeUpdateReplys: {
        //修改知识库答复
        method: 'post',
        url: '/AiBaseNode/updateReplys',
    },
    ai6AiBaseNodeCategoryCreate: {
        //创建分类
        method: 'post',
        url: '/aiBaseNodeCategory/create',
    },
    ai6AiBaseNodeCategoryDelete: {
        //删除分类
        method: 'delete',
        url: '/aiBaseNodeCategory/delete',
    },
    ai6AiBaseNodeCategoryTree: {
        //树结构
        method: 'get',
        url: '/aiBaseNodeCategory/tree',
    },
    ai6AiBaseNodeCategoryUpdate: {
        //修改分类名
        method: 'put',
        url: '/aiBaseNodeCategory/update',
    },
    ai6AiBaseNodeCategoryUpdateOrder: {
        //树结构排序
        method: 'post',
        url: '/aiBaseNodeCategory/updateOrder',
    },
    // 语音合成
    ai6TtsSceneList: {
        //适用场景列表
        method: 'get',
        url: '/tts/scene/list',
    },
    ai6TtsVoiceList: {
        //发音列表
        method: 'get',
        url: '/tts/voice/list',
    },
    // 语音池
    ai6AiVoicePoolAudition: {
        //发音列表
        method: 'post',
        url: '/aiVoicePool/audition',
    },
    ai6AiVoicePoolPage: {
        //录音池列表
        method: 'get',
        url: '/aiVoicePool/page',
    },
    ai6AiVoicePoolUpdateContent: {
        //更改文本 录音池修改tts内容
        method: 'patch',
        url: '/aiVoicePool/updateContent',
    },

    ai6AiVoicePoolUpdateName: {
        //更改录音名
        method: 'patch',
        url: '/aiVoicePool/updateName',
    },
    ai6AiVoicePoolUpdateSync: {
        //录音池-上传录音文件(同步)
        method: 'patch',
        url: '/aiVoicePool/upload/sync',
    },
    ai6AiVoicePoolUpdateText: {
        //录音池-上传文本 录音池上传文本(没有合成语音)
        method: 'post',
        url: '/aiVoicePool/upload/text',
    },
    ai6AiBaseProjectList: {
        //项目列表(ai6) 需要根据行业区分
        method: 'post',
        url: '/aiBaseProject/list',
    },

    ai6AiSceneQuestionList: {
        //机器人提问, 包含场景和提问(ai6) 获取
        method: 'get',
        url: '/aiSceneQuestion/list',
    },
    ai6AiBaseProjectUpdateOrder: {
        //项目排序、置顶(ai6)
        method: 'post',
        url: '/aiBaseProject/updateOrder',
    },
    ai6AiSceneQuestionPlaceholder: {
        //占位符
        method: 'get',
        url: '/aiSceneQuestion/placeholder',
    },
    ai6AiSceneQuestionDelete: {
        //机器人提问, 包含场景和提问(ai6) 删除提问(ai6)
        method: 'post',
        url: '/aiSceneQuestion/delete',
    },
    ai6AiSceneQuestionOrder: {
        //机器人提问, 包含场景和提问(ai6) 调序提问(ai6)
        method: 'post',
        url: '/aiSceneQuestion/order',
    },
    ai6AiSceneQuestionAdd: {
        //机器人提问, 包含场景和提问(ai6) 模块添加提问(ai6)
        method: 'post',
        url: '/aiSceneQuestion/add',
    },
    ai6AiSceneQuestionUpdate: {
        //机器人提问, 包含场景和提问(ai6) 模块添加提问(ai6)
        method: 'post',
        url: '/aiSceneQuestion/updateCustom',
    },
    aiUserModuleKbsList: {
        //模块知识库列表
        method: 'post',
        url: '/aiUserModule/kbs/list',
    },
    aiUserModuleKbsBind: {
        //模块绑定知识库分类
        method: 'post',
        url: '/aiUserModule/kbs/bind',
    },
    ai6SceneQuestionCustomlnfo: {
        //模块绑定知识库分类
        method: 'get',
        url: '/aiSceneQuestion/customInfo',
    },
    ai6AiSceneQuestionAddCustom: {
        //机器人提问, 包含场景和提问(ai6) 模块添加提问(ai6)自定义
        method: 'post',
        url: '/aiSceneQuestion/addCustom',
    },
    ai6AiSceneQuestionChangeMaterial: {
        //机器人提问, 包含场景和提问(ai6) 模块修改提问(ai6)
        method: 'post',
        url: '/aiSceneQuestion/changeMaterial',
    },
    ai6AiModuleTimeoutList: {
        //模块超时回复列表(ai6)
        method: 'get',
        url: '/aiModuleTimeout/list',
    },
    ai6AiModuleTimeoutAdd: {
        //模块超时回复列表(ai6) 添加超时回复(ai6)
        method: 'post',
        url: '/aiModuleTimeout/timeout/add',
    },
    ai6AiModuleTimeoutUpdate: {
        //模块超时回复列表(ai6) 模块超时回复修改(ai6)
        method: 'post',
        url: '/aiModuleTimeout/timeout/update',
    },
    ai6AiModuleTimeoutDelete: {
        //模块超时回复列表(ai6) 模块超时回复删除(ai6)
        method: 'delete',
        url: '/aiModuleTimeout/timeout/delete',
    },
    ai6AiUserTimeoutList: {
        // 机器人超时回复列表
        method: 'get',
        url: '/aiUserTimeout/list',
    },

    ai6AiUserTimeoutAdd: {
        // 机器人超时回复新增
        method: 'post',
        url: '/aiUserTimeout/add',
    },
    ai6AiUserTimeoutBatchDelete: {
        // 机器人超时回复删除
        method: 'post',
        url: '/aiUserTimeout/delete',
    },
    ai6AiUserTimeoutBatchUpdate: {
        // 机器人超时回复更新
        method: 'post',
        url: '/aiUserTimeout/update',
    },
    ai6AiUserTransfer2CustomerGroupPost: {
        // 转人工模块客服分组详情
        method: 'post',
        url: '/aiUserModule/transfer2CustomerGroup',
    },
    ai6AiUserTransfer2CustomerGroupGet: {
        // 转人工模块客服分组配置
        method: 'get',
        url: '/aiUserModule/transfer2CustomerGroup',
    },

    ai6AiUserRuleCommonLine: {
        // 通用迁移规则 意图列表
        method: 'get',
        url: '/aiUserRuleCommon/line',
    },

// Ai6的接口  D

    // 归档接口
    ai6Archive: {
        // 归档
        method: 'post',
        url: '/archive',
    },
    ai6ArchiveList: {
        // 归档列表
        method: 'post',
        url: '/archive/list',
    },
    ai6ArchiveRecovery: {
        // 恢复
        method: 'post',
        url: '/archive/recovery',
    },
    //基础语料部分
    getUserList: {
        //  获取客服列表
        method: 'post',
        url: '/corpus/client/cs',
    },
    getYuLiaoList: {
        //  获取语料类别列表
        method: 'get',
        url: '/corpus/client/corpusNames',
    },
    getTable: {
        //  获取语料表格
        method: 'post',
        url: '/corpus/client/corpuses',
    },
    getMoreTable: {
        //  获取语料查看更多表格
        method: 'post',
        url: '/corpus/client/histories',
    },
    updateRowInfo: {
        //  修改当前语料
        method: 'post',
        url: '/corpus/client/save',
    },
    updateIsGlobal: {
      //  是否有权限修改
      method: 'get',
      url: '/corpus/client/isGlobal',
    },
    categoryModularRobotList: {
      //  机器人知识库
      method: 'post',
      url: '/category/modularRobotList',
    },
    ai6Label: {
      // 标签和名片
      method: 'get',
      url: '/label',
    },
    // ai6SimulateBegin: {
    //   // 创建模拟对话
    //   method: 'post',
    //   url: '/simulate/begin',
    // },
    // ai6SimulateChat: {
    //   // 模拟对话
    //   method: 'post',
    //   url: '/simulate/chat',
    // },
    // ai6SimulateEnd: {
    //   //关闭模拟对话
    //   method: 'post',
    //   url: '/simulate/end',
    // },
    // 模块分组
    ai6AiModuleGroupList: {

        method: 'get',
        url: '/aiModuleGroup/list',
    },
    ai6AiModuleGroupAdd: {
        // 模块新增
        method: 'post',
        url: '/aiModuleGroup/add',
    },
    ai6AiModuleGroupDelete: {
        // 模块删除
        method: 'delete',
        url: '/aiModuleGroup/delete',
    },
    ai6AiModuleGroupUpdate: {
        // 模块修改
        method: 'patch',
        url: '/aiModuleGroup/update',
    },
    //清空画布(ai6)
    ai6UserClearCanvas: {
        method: 'post',
        url: '/aiUser/clearCanvas',
    },
    ai6AiModuleCloneCustomRules: {
        // 将A模块的自定义意图复制到B模块的自定义意图
        method: 'post',
        url: '/aiModuleRule/cloneCustomRules',
    },
    ai6AiModuleMoveGroup: {
        // 模块迁移分组
        method: 'post',
        url: '/aiModuleGroup/moveGroup',
    },

    customerGroupGet: {
      //客服组
      method: 'get',
      url: '/customerGroup',
    },
    knowledgeSearch: {
      //知识库话术搜索
      method: 'post',
      url: '/knowledge/search',
    },
    corpusSearch: {
      //语料搜索
      method: 'post',
      url: '/corpus/client/search',
    },
    kbpProxyPredict: {
      //知识库模拟
      method: 'post',
      url: '/proxy/predict',
    },



    aiAccessNodeGetAccessNodes: { //全部接通设置
        method: 'get',
        url: '/aiAccessNode/getAccessNodes',
    },
    aiAccessNodeAdd: { //新增接入库
        method: 'post',
        url: '/aiAccessNode/add',
    },
    aiAccessNodeDeleteAccessNodes: { // 删除
        method: 'delete',
        url: '/aiAccessNode/deleteAccessNodes',
    },
    aiAccessNodeKeys: { // 接通条件
        method: 'get',
        url: '/aiAccessNode/keys',
    },

    aiAccessNodeAddReplys: { // 新增发送消息 动作
        method: 'post',
        url: '/aiAccessNode/addReplys',
    },
    aiAccessNodeDeleteReplys: { // 删除发送消息 动作
        method: 'delete',
        url: '/aiAccessNode/deleteReplys',
    },
    aiAccessNodeUpdateReplys: { // 修改 发送消息
        method: 'post',
        url: '/aiAccessNode/updateReplys',
    },
    aiAccessNodeAddAction: { // 新增名片 动作
        method: 'post',
        url: '/aiAccessNode/addAction',
    },
    aiAccessNodeDeleteAction: { // 删除名片 动作
        method: 'delete',
        url: '/aiAccessNode/deleteAction',
    },
    aiAccessNodeUpdateAction: { // 修改 设置名片
        method: 'post',
        url: '/aiAccessNode/updateAction',
    },


    aiAccessNodeUpdateCondition: { // 保存接通条件
        method: 'post',
        url: '/aiAccessNode/updateCondition',
    },
    aiAccessNodeGetCondition: { // 获取接通条件
        method: 'get',
        url: '/aiAccessNode/getCondition',
    },
    aiAccessNodeGetAction: { // 获取接通条件
        method: 'get',
        url: '/aiAccessNode/getAction',
    },


    aiAccessNodeUpdateOutModuleId: {
        method: 'post',
        url: '/aiAccessNode/updateOutModuleId'
    },
    aiAccessNodeDeleteOutModuleId: {
        method: 'delete',
        url: '/aiAccessNode/deleteOutModuleId'
    },
    aiAccessNodeUptate: { // 修改接入库
        method: 'post',
        url: '/aiAccessNode/update'
    },

};
export default textRobotApi;
