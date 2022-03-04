/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-02 15:46:42
 * @FilePath: /vue-shelf/src/views/ImplementationComponent/config.js
 */

import uuid from 'uuid';
let arr = []
for (let i = 0; i < 3; i++) {
  arr.push({
    id: uuid(),
    name: `李大玄${i}`
  })
}
export default {
  version: '1.1.1',
  // 顶部搜索部分数据结构
  queryform: {
    search: {
      name: '11',
      time: []
    },
    form: [
      {
        compName: 'input',
        placeholder: '这是输入框',
        model: 'name',
        clearable: true || false,
        require: true || false,
      },
      {
        compName: 'select',
        placeholder: '这是下拉框',
        model: 'name',
        clearable: true || false,
        options: [],
        optionsLabel: 'name',
        optionsValue: 'id',
      },
      {
        compName: 'date-picker',
        placeholder: '这是日期时间选择',
        model: 'time',
        clearable: true || false,
        type: "datetimerange", // 日期时间
        'range-separator': "至",
        "start-placeholder": "开始日期",
        'end-placeholder': "结束日期",
      },
    ],
    rules: {
      name: []
    }
  },
  // 默认已存在: 查询与重置按钮, (query查询条件length>=1)
  handleBox: {
    type: '追加按钮' || '覆盖默认按钮',
    arr: [
      {
        type: 'button-primary',
        text: '新增'
      }
    ]
  },
  // 表格展现 数据结构
  tableConfig: {
    loading: false,
    tableColumnData: [
      /**
       * @description: 
       * @param {type} 遵循elementui
       * @param {slotName} 表格插槽实现 
       */
      { width: "80px", label: "排序号", prop: "", type: "index" /** || selection */ },
      { label: "id", prop: "id",  },
      { label: "姓名", prop: "name", slotName:'name' },
      { label: "姓名", prop: "name", afterConcat: " afterConcat", beforeConcat: 'beforeConcat ', defaultVal: '-', showOverflowTooltip: true },
      { label: "操作", prop: "", slotName: "handleSlot" }
    ],
    /** 
     * 表格插槽
     * tableColumnData 存在的 slotName 按 slotArr 中定义的实现,slotArr中不存在的,外部自己实现
     */
    slotArr: {
      handleSlot: [
        /**
         * @description: 
         * @param {*} showType 展示类型 弹窗 抽屉 盖板 
         * @param {*} key 对应展示弹层表单数据结构
         * @param {*} visible 是否展示
         * @param {*} funName 按钮方法 实现逻辑在外部使用者中实现
         * @param {*} authcode: 权限编码
         */
        //                         弹窗      抽屉     盖板 
        { name: '修改', showType: 'drawer', type: 'text', key: "editForm", funName: 'edit', authcode: 'xxxx' },
        { name: '删除', showType: 'dialog', key:'del' },
      ],
    },
    tableData: arr,  // 表格list
    total: 100,
    page: 1,
    size: 10,
    isPage: true || false, // 是否展示分页
  },
  // * @param {*} key 对应展示弹层表单数据结构
  del: {
    visible: false,
    // footer: false || true,
    // footerSlot: 'footer',
    title:'删除',
    msg:'此操作将永久删除该文件, 是否继续?',
    'close-on-click-modal': true,
    'close-on-press-escape': true,
  },
  editForm: {
    modal: true,
    visible: false,
    title: '修改',
    // footer: false || true,
    // footerSlot: 'footer',
    // 
    form: {
      name: '李大玄'
    },
    formOptions: [
      {
        compName: 'input',
        placeholder: '这是输入框',
        model: 'name',
        clearable: true || false,
        require: true || false,
      },
      {
        compName: 'select',
        placeholder: '这是下拉框',
        model: 'name',
        clearable: true || false,
        options: [],
        optionsLabel: 'name',
        optionsValue: 'id',
      },
      {
        compName: 'date-picker',
        placeholder: '这是日期时间选择',
        model: 'time',
        clearable: true || false,
        type: "datetimerange", // 日期时间
        'range-separator': "至",
        "start-placeholder": "开始日期",
        'end-placeholder': "结束日期",
      },
    ]
  },
  
}