/* jshint esversion: 6 */

import { method } from "lodash";

/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-02 18:42:28
 * @FilePath: /迁移/src/api/eachbotFlowAdminWeb.js
 */
const eachbotFlowAdminWebApi = {
    aiUserTimeoutList: { // 列表
        method: 'get',
        url: '/aiUserTimeout/list',
    },
    aiUserTimeoutAdd: { // 新增
        method: 'post',
        url: '/aiUserTimeout/add',
    },
    aiUserTimeoutDelete: { // 删除
        method: 'delete',
        url: '/aiUserTimeout/delete/',
    },
    aiUserTimeoutBatchDelete: { // 批量删除
        method: 'post',
        url: '/aiUserTimeout/batchDelete',
    },
    aiUserTimeoutInfo: { // 详情
        method: 'get',
        url: '/aiUserTimeout/info/',
    },
    aiUserTimeoutModify: { // 修改
        method: 'post',
        url: '/aiUserTimeout/modify',
    },
    conditionFindSecondLevelConditions: {// 修改 
        method: 'get',
        url: '/condition/findSecondLevelConditions',
    },
    conditionAddSecondLevelCondition: {// 新增二级条件
        method: 'post',
        url: '/condition/addSecondLevelCondition'
    },
    conditionModifySecondLevelCondition: {// 修改二级条件
        method: 'post',
        url: '/condition/modifySecondLevelCondition'
    },
    conditionDeleteSecondLevelCondition: {// 新增二级条件
        method: 'delete',
        url: '/condition/deleteSecondLevelCondition'
    },
    conditionAddThirdLevelCondition: { // 新增三级
        method: 'post',
        url: '/condition/addThirdLevelCondition'
    },
    conditionModifyThirdLevelCondition: { // 修改三级
        method: 'post',
        url: '/condition/modifyThirdLevelCondition'
    },
    conditionFindKeyTexts: { // 数据key
        method: 'get',
        url: '/condition/findKeyTexts'
    },
    conditionFindSourceTexts: { //匹配来源
        method: 'get',
        url: '/condition/findSourceTexts'
    },
    conditionFindTypeTexts: { //算法
        method: 'get',
        url: '/condition/findTypeTexts'
    },
    conditionFindThirdLevelConditions: { // 三级列表
        method: 'get',
        url: '/condition/findThirdLevelConditions'
    },
    conditionDeleteThirdLevelCondition: { // 删除三级
        method: 'delete',
        url: '/condition/deleteThirdLevelCondition'
    },
    // 模块点击-默认提问
    questionList: { // 提问列表
        method: 'get',
        url: '/question/list' // /{moduleId}/{passive}
    },
    baseQuestionList: { // 基础问题
        method: 'get',
        url: '/baseQuestion/list' // /baseQuestion/list/{categoryId}/{passive}
    },
    questionCategoryList: { // 分类列表
        method: 'get',
        url: '/questionCategory/list', ///questionCategory/list/{sceneId}
    },
    questionAddBaseQuestion: { // 添加选择提问
        method: 'post',
        url: '/question/addBaseQuestion'
    },
    questionAddCustomQuestion: { // 新增自定义提问
        method: 'post',
        url: '/question/addCustomQuestion'
    },
    questionModifyQuestion: { // 修改提问
        method: 'put',
        url: '/question/modifyQuestion'
    },
    questionNodeList: { // 节点回复列表
        method: 'get',
        url: 'questionNode/list'
    },
    questionNodeAdd: { // 新增节点回复
        method: 'post',
        url: '/questionNode/add'
    },
    questionNodeModify: { // 编辑节点回复
        method: 'post',
        url: '/questionNode/modify'
    },
    questionNodeDelete: { // 删除节点回复
        method: 'delete',
        url: '/questionNode/delete'
    },
    questionNodeReplys: { // 节点回复消息列表
        method: 'get',
        url: '/questionNode/replys'
    },
    questionNodeAddReplys: { // 新增回复消息
        method: 'post',
        url: '/questionNode/addReplys'
    },
    questionNodeModifyReplys: { // 修改回复消息
        method: 'post',
        url: '/questionNode/modifyReplys'
    },
    questionNodeDeleteReplys: { // 删除节点回复消息
        method: 'delete',
        url: '/questionNode/deleteReplys'
    },
    actionFindActionTypeTexts: { // 动作类型
        method: 'get',
        url: '/action/findActionTypeTexts'
    },
    questionNodeAddAction: { // 新增动作
        method: 'post',
        url: '/questionNode/addAction'
    },
    questionNodeActions: { // 节点回复动作列表
        method: 'get',
        url: '/questionNode/actions'
    },
    questionNodeModifyAction: { // 修改节点回复动作
        method: 'post',
        url: '/questionNode/modifyAction'
    },
    questionNodeDeleteAction: { // 删除节点回复动作
        method: 'delete',
        url: '/questionNode/deleteAction'
    },
    questionActions: { // 提问动作列表
        method: 'get',
        url: '/question/actions'
    },
    questionAddAction: { // 新增动作
        method: 'post',
        url: '/question/addAction'
    },
    questionModifyAction: { // 修改动作
        method: 'post',
        url: '/question/modifyAction'
    },
    questionDeleteAction: { // 删除提问动作
        method: 'delete',
        url: '/question/deleteAction'
    },
    aiModuleTimeoutAdd: { // 模块 新增超时回复
        method: 'post',
        url: '/aiModuleTimeout/add'
    },
    aiModuleTimeoutList: { // 超时回复列表
        method: 'get',
        url: '/aiModuleTimeout/list'
    },
    aiModuleTimeoutDelete: { // 删除超时回复
        method: 'delete',
        url: '/aiModuleTimeout/delete'
    },
    aiModuleTimeoutModify: { // 修改超时回复
        method: 'put',
        url: '/aiModuleTimeout/modify'
    },
    aiSceneList: { // 场景列表
        method: 'get',
        url: '/aiScene/list'
    },
    aiSceneSetting: { // 场景设置详情
        method: 'get',
        url: '/aiScene/setting'
    },
    aiSceneSettingSave: { // 保存模块设置
        method: 'put',
        url: '/aiScene/setting'
    },
    accessNodeList: { // 接入库列表
        method: 'get',
        url: '/accessNode/list'
    },
    accessCategoryList: { // 分类列表
        method: 'get',
        url: '/accessCategory/list'
    },
    accessNodeAddAccessNode: { // 新增接入库
        method: 'post',
        url: '/accessNode/addAccessNode'
    },
    accessNodeModifyAccessNode: { // 修改接入库
        method: 'put',
        url: '/accessNode/modifyAccessNode'
    },
    accessNodeDelete: { // 删除接入库
        method: 'delete',
        url: 'accessNode/delete'
    },
    accessNodeActions: { // 提问动作列表
        method: 'get',
        url: '/accessNode/actions'
    },
    accessNodeAddAction: { // 新增动作
        method: 'post',
        url: '/accessNode/addAction'
    },
    accessNodeDeleteAction: { // 删除提问动作
        method: 'delete',
        url: '/accessNode/deleteAction'
    },
    accessNodeModifyAction: { // 修改动作
        method: 'post',
        url: '/accessNode/modifyAction'
    },
    accessNodeDeleteReplys: { // 删除发送消息
        method: 'delete',
        url: '/accessNode/deleteReplys'
    },
    accessNodeAddReplys: { // 新增回复消息
        method: 'post',
        url: '/accessNode/addReplys'
    },
    accessNodeModifyReplys: { // 修改回复消息
        method: 'put',
        url: '/accessNode/modifyReplys'
    },
    deleteQuestion: { // 删除提问
        method: 'delete',
        url: 'question'
    },
    getQuestionInfo: { // 提问详情
        method: 'get',
        url: '/question'
    },
    questionModifyQuestion: { // 修改提问
        method: 'put',
        url: '/question/modifyQuestion'
    },
    accessNodeReplys: { // 回复消息列表
        method: 'get',
        url: '/accessNode/replys',
    },
    accessNodeDeleteReplys: { // 删除发送消息
        method: 'delete',
        url: '/accessNode/deleteReplys'
    },
    accessNodeUpdateOutModuleId: { // 保存会话迁移
        method: 'post',
        url: '/accessNode/updateOutModuleId'
    },
    accessNodeGetOutModule: { //跳转到指定模块回显 
        method: 'get',
        url: '/accessNode/getOutModule'
    },
    moduleRuleInfo: { // 已有意图详情
        method: 'get',
        url: '/module-rule/info'
    },
    getModuleList: { // 模块列表
        method: 'get',
        url: '/module/list'
    },
    moduleRuleSysRules: { // 已有意图列表
        method: 'get',
        url: '/module-rule/sys-rules'
    },
    moduleRuleAddSys: { // 保存已有意图
        method: 'post',
        url: '/module-rule/add/sys'
    },
    moduleRuleAddCustom: { // 保存自定义意图
        method: 'post',
        url: '/module-rule/add/custom'
    },
    moduleRuleInfo: { // 已有意图详情
        method: 'get',
        url: '/module-rule/info'
    },
    moduleRuleActions: { // 动作列表
        method: 'get',
        url: '/module-rule/actions'
    },
    moduleRuleAddAction: { // 新增动作
        method: 'post',
        url: '/module-rule/addAction'
    },
    moduleRuleDeleteAction: { // 删除 意图 -> 动作
        method: 'delete',
        url: '/module-rule/deleteAction', // /eachbot-flow-admin-web/module-rule/deleteAction/{ruleId}/{actionId}
    },
    moduleRuleModifyAction: { // 修改动作
        method: 'post',
        url: '/module-rule/modifyAction'
    },
    moduleRuleModifySys: { // 更新已有意图
        method: 'put',
        url: '/module-rule/modify/sys'
    },
    moduleRuleModifyCustom: { // 更新自定义意图
        method: 'put',
        url: '/module-rule/modify/custom'
    },
    industryList: { // 行业列表
        method: 'get',
        url: '/industry/list'
    },
    templateList: { // 行业模板列表
        method: 'post',
        url: '/template/list'
    },
    templateFlowInfo: { //流程详情
        method: 'post',
        url: '/template/flow/info'
    },
    templateFlowQuestions: { // 模块提问列表
        method: 'post',
        url: '/template/flow/questions'
    },
    templateAdd: { // 新增末班
        method: 'post',
        url: '/template/add'
    },
    templateModify: { // 修改模板基础信息
        method: 'post',
        url: '/template/modify'
    },
    templateUpdate: { // 更新模板
        method: 'post',
        url: '/template/update'
    },
    templateDelete: { // 删除模板
        method: 'delete',
        url: '/template/delete'
    },
    companyPage: { // 公司分页
        method: 'post',
        url: '/company/page'
    },
    companyAdd: { // 新增公司
        method: 'post',
        url: '/company/add'
    },
    companyModify: { // 修改公司信息
        method: 'put',
        url: '/company/modify'
    },
    companyInfo: { // 公司详情
        method: 'get',
        url: '/company/info'
    },
    projectList: { // 公司项目列表  机器人初始化 普通 通用
        method: 'get',
        url: '/project/list'
    },
    getAiUserBindProjects: { // 获取普通项目绑定关系
        method: 'get',
        url: '/aiUser/bind/projects'
    },
    postAiUserBindProjects: { // 绑定普通项目
        method: 'post',
        url: '/aiUser/bind/projects'
    },
    bindProjectsDetails: { // 查询普通项目绑定关系
        method: 'post',
        url: '/aiUser/bind/projects/details'
    },
    aiUserCloneInitFromOtherUser: { // 机器人初始化复制其他账号
        method: 'post',
        url: '/aiUser/cloneInitFromOtherUser'
    },
    deleteAiUser: { // 机器人初始化取消复制
        method: 'delete',
        url: '/aiUser'
    },
    aiUserBindCommonProjects: {// 获取通用项目绑定关系
        method: 'get',
        url: '/aiUser/bind/commonProjects'
    },
    aiUserBindCommonProjectsPost: { // 绑定通用项目
        method: 'post',
        url: '/aiUser/bind/commonProjects'
    },
    aiUserPage: { // 机器人分页查询
        method: 'post',
        url: '/aiUser/page'
    },
    proKnowledgeCategoryList: { // 专业库分类列表
        method: 'get',
        url: '/proKnowledgeCategory/list'
    },
    proKnowledgeIndustryList: {    // 专业库行业列表
        method: 'get',
        url: '/proKnowledgeIndustry/list'
    },
    aiUserBindProKnowledgeCategoryIdsGet: { // 获取绑定专业库分类
        method: 'get',
        url: '/aiUser/bind/proKnowledgeCategoryIds'
    },
    aiUserBindProKnowledgeIndustryIdsGet: { // 获取绑定专业库行业
        method: 'get',
        url: '/aiUser/bind/proKnowledgeIndustryIds'
    },
    aiUserBindProKnowledgeCategoryIdsPost: { // 绑定专业库分类
        method: 'post',
        url: '/aiUser/bind/proKnowledgeCategoryIds'
    },
    aiUserBindProKnowledgeIndustryIdsPost: { // 绑定专业库行业
        method: 'post',
        url: '/aiUser/bind/proKnowledgeIndustryIds'
    },
    flowModuleTimeouts: { // 模块超时回复列表
        method: 'post',
        url: '/template/flow/moduleTimeouts'
    },
    flowModuleRules: {// 模块意图列表
        method: 'post',
        url: '/template/flow/moduleRules'
    },
    aiUserValidate: { // 校验机器人是否存在
        method: 'get',
        url: '/aiUser/validate'
    },
    aiUserBindProjectsDetails: { // 获取机器人绑定项目详细信息
        method: 'post',
        url: '/aiUser/bind/projects/details'
    },
    getFlow: { // 当前画布流程
        method: 'get',
        url: '/flow'
    },
    questionNodeCommons: { // 通用节点回复列表
        method: 'get',
        url: '/questionNode/commons'
    },
    questionNodeCommonAdd: { // 新增通用节点回复
        method: 'post',
        url: '/questionNode/common/add'
    },
    flowClone: { // 模板复制 节点拖拽
        method: 'post',
        url: '/flow/clone'
    },
    flowBound: { // 保存定位
        method: 'post',
        url: '/flow/bound'
    },
    deleteModuleRule: { // 删除意图
        method: 'delete',
        url: '/module-rule'
    },
    moduleRuleSortIndex: { // 修改意图优先级
        method: 'put',
        url: '/module-rule/sort-index'
    },
    deleteModule: { // 删除模块
        method: 'delete',
        url: '/module' // /eachbot-flow-admin-web/module/{moduleId}
    },
    projectTop: { // 项目置顶
        method: 'patch',
        url: '/project/top'
    },
    flowClearCanvas: { // 清空画布
        method: 'delete',
        url: '/flow/clear-canvas'
    },
    flowClearFlow: { // 清空流程
        method: 'delete',
        url: '/flow/clear-flow'
    },
    eachbotFlowAdminWebArchive: { // 归档
        method: 'post',
        url: '/archive'
    },
    archiveList: { // 归档列表
        method: 'post',
        url: '/archive/list'
    },
    signalDimensionList: { // signalDimensionList
        method: 'get',
        url: '/signal-dimension/list'
    },
    templateApply: { // 应用模板
        method: 'post',
        url: '/template/apply'
    },
    flowLineConnect: { // 意图和模块连线
        method: 'put',
        url: '/flow/line-connect' // /eachbot-flow-admin-web/flow/line-connect
    },
    questionSort: { // 提问 上移下移
        method: 'patch',
        url: '/question/sort' // /eachbot-flow-admin-web/question/sort/{questionId}
    },
    
    // 2021/11/30 新增接口
    templateFlowQuestionNode: { // 节点回复列表
        method: 'get',
        url: '/template/flow/question-node'
    },
    templateFlowCommonQuestionNode: { // 通用节点回复列表
        method: 'get',
        url: '/template/flow/common-question-node'
    },
    templateFlowScenes: { // 场景列表
        method: 'get',
        url: '/template/flow/scenes'
    },
    templateFlowSetting: { // 场景设置详情
        method: 'get',
        url: '/template/flow/setting'
    }
    


};
// this.$HttpFlowAdmin.
export default eachbotFlowAdminWebApi; // HttpFlowAdmin
