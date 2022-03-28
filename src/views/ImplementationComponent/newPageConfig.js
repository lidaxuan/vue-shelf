/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-22 10:39:05
 * @FilePath: /vue-shelf/src/views/ImplementationComponent/newPageConfig.js
 */
export default {
  // struct: {
  // id: 6,
  companyId: 0,
  name: "工单配置6",
  desp: null,
  parentId: 0,
  showDetailTab: 1,
  mappingClass: "com.easyliao.struct.client.demo.resource.StructDto",
  migrationStrategy: 0,
  assignTableName: null,
  deleteFlag: 0,
  viewTemplate: JSON.stringify({
    rules: [],
    required: [],
    labelWidth: "200px",
    itemWidth: "100px",
    tableTopHandleBox: [
      // { text: "批量删除", showType: "confirm", multipleSelection: true, multipleSelectionKey: "id", message: "确认批量 删除?", title: "删除", url: "/del/id" },
      // { text: "批量复制", showType: "confirm", multipleSelection: true, multipleSelectionKey: "", message: "确认批量 复制?", title: "复制", url: "/del/id" },
      // { text: "批量应用", showType: "confirm", multipleSelection: true, multipleSelectionKey: "all", message: "确认批量 应用?", title: "应用", url: "/del/id" },
      // { text: "新增 ||  添加", showType: "el-drawer", sceneKey: "create", url: "/a/b/creat", method: "post" }
      { text: "创建团队标签", showType: "el-drawer", sceneKey: "create", url: "/a/b/creat", method: "post" }
    ],
    handleBox: {
      type: 1 // 1:默认且追加  2:覆盖
    },
    // 搜索场景
    pageSize: 10,
    pageNum: 1,
    isPage: true,
    search: {
      sort: [
        { mappingClassField: "id", placeholder: "id", "required": false },
        { mappingClassField: "userSize", placeholder: "团队成员", width: "220px", "required": false, label: "团队成员" },
        { mappingClassField: "name", placeholder: "团队标签名称", width: "250px", "required": false, label: "团队标签名称" },
        'name'
      ],
      rules: [],
      labelWidth: "",
      defaultValue: {
        id: '',
        name: "",
        userSize: ""
      }
    },
    create: {
      sort: [
        { mappingClassField: "id", width: "200px" },
        { mappingClassField: "name", placeholder: "请输入团队标签名称", label: "团队标签名称" },
        { mappingClassField: "principal", placeholder: "请输入负责人", width: "220px", label: "负责人" },
        { mappingClassField: "userSize", placeholder: "请输入团队成员", width: "220px", label: "团队成员" },
        { mappingClassField: "status", placeholder: "请输入状态", width: "220px", label: "状态" },
        { mappingClassField: "creator", placeholder: "请输入创建人", width: "220px", label: "创建人" },
      ],
      rules: [],
      labelWidth: "",
      defaultValue: {
        name: null,
        principal: null,
        userSize: null,
        status: '',
        creator: '',
      }
    },
    edit: {
      sort: [
        { mappingClassField: "name", placeholder: "请输入团队标签名称", label: "团队标签名称" },
        { mappingClassField: "principal", placeholder: "请输入负责人", width: "220px", label: "负责人" },
        { mappingClassField: "userSize", placeholder: "请输入团队成员", width: "220px", label: "团队成员" },
        { mappingClassField: "status", placeholder: "请输入状态", width: "220px", label: "状态" },
        { mappingClassField: "creator", placeholder: "请输入创建人", width: "220px", label: "创建人" },
      ],
      rules: [],
      labelWidth: "",
      disabled: []
    },
    tableConfigSlot: {
      handle: [
        // { text: "启用", showType: "confirm", message: "", title: "", url: "/asd/asd" },
        // { text: "停用", showType: "confirm", message: "", title: "", url: "/asd/asd" },
        {
          text: "编辑",
          showType: "el-dialog",
          title: "修改",
          width: "40%",
          sceneKey: "edit",
          url: "/a/b/upd",
          method: "post"
        },
        { text: "删除", showType: "confirm", message: "", title: "", url: "/asd/asd" }
      ]
    },
    migrationStrategy: 0,
    assignTableName: ""
  }),
  // },
  attributes: [
    /* {
      id: 11,
      mappingClassField: '',
      columnLabel: '多选',
      columnUiPlugin: JSON.stringify({
        tableColumnConfig: { type: 'selection', width: '150px', align: 'center', }, // slotName: 'name'
      }),
      validatedPlugin: '',
      columnUiCss: '',
      sortIndex: 1,
      showInList: 1,
      showInQuery: 0,
      desp: '',
      deleteFlag: 0
    },*/
    /*  {
      id: 12,
      mappingClassField: 'index',
      columnLabel: '序号',
      columnUiPlugin: JSON.stringify({
        width: '50px',
        tableColumnConfig: { type: 'index',  align: 'center', }, // slotName: 'name'
      }),
      validatedPlugin: '',
      columnUiCss: '',
      sortIndex: 1,
      showInList: 1,
      showInQuery: 0,
      desp: '',
      deleteFlag: 0
    }, */
    {
      mappingClassField: "id",
      columnLabel: "团队标签ID",
      columnUiPlugin: JSON.stringify({
        "compName": "input",
        "clearable": true,
        "width": "200px",
        "placeholder": "请输入团队标签ID",
        "model": "id",
        "label": "",
        "labelWidth": "100px",
        // "requiredMessage": "id不能为空",
        tableColumnConfig: { width: "150px", align: "center", "label": "团队标签ID" }, // slotName: 'name'
      }),
      validatedPlugin: "",
      columnUiCss: "",
      sortIndex: 1,
      showInList: 1,
      showInQuery: 1,
      desp: "",
      deleteFlag: 0
    },
    {
      mappingClassField: "name",
      columnLabel: "团队标签名称",
      columnUiPlugin: JSON.stringify({
        "compName": "input",
        "clearable": true,
        "width": "220px",
        "placeholder": "请输入团队标签名称",
        "model": "name",
        "label": "",
        "labelWidth": "100px",
        // "requiredMessage": "姓名不能为空",
        tableColumnConfig: { width: "150px", align: "center", "label": "团队标签名称" } // slotName: 'name'
      }),
      columnUiCss: "",
      validatedPlugin: "input",
      sortIndex: 2,
      showInList: 1,
      showInQuery: 1,
      desp: "",
      deleteFlag: 0
    },
    {
      mappingClassField: "principal",
      columnLabel: "负责人",
      columnUiPlugin: JSON.stringify({
        "compName": "input",
        "clearable": true,
        "model": "principal",
        "label": "",
        searchwidth: '200px',
        createwidth:'300px', 
        // options: [{ name: "男", id: 1 }, { name: "女", id: 2 }],
        tableColumnConfig: { width: "150px", align: "center", "label": "负责人" }
      }),
      columnUiCss: "",
      validatedPlugin: "",
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: "",
      deleteFlag: 0
    },
    {
      mappingClassField: "asdasd",
      columnLabel: "负责人",
      columnUiPlugin: JSON.stringify({
        "compName": "input",
        "clearable": true,
        "model": "asdasd",
        "label": "",
        searchwidth: '200px',
        createwidth:'300px', 
        // options: [{ name: "男", id: 1 }, { name: "女", id: 2 }],
        tableColumnConfig: { width: "150px", align: "center", "label": "负责人" }
      }),
      columnUiCss: "",
      validatedPlugin: "",
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: "",
      deleteFlag: 0
    },
    {
      mappingClassField: "userSize",
      columnLabel: "团队成员",
      columnUiPlugin: JSON.stringify({
        "compName": "input",
        "clearable": true,
        "model": "userSize",
        "label": "",
        tableWidth: "50px",
        // options: [{ name: "男", id: 1 }, { name: "女", id: 2 }],
        // optionsLabel: "name",
        // optionsValue: "id",
        tableColumnConfig: { width: "150px", align: "center", "label": "团队成员" }
      }),
      columnUiCss: "",
      validatedPlugin: "",
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: "",
      deleteFlag: 0
    },
    {
      mappingClassField: "status",
      columnLabel: "状态",
      columnUiPlugin: JSON.stringify({
        "compName": "select",
        "clearable": true,
        "model": "status",
        "label": "",
        options: [{ name: "启用", id: 1 }, { name: "禁用", id: 2 }],
        optionsLabel: "name",
        optionsValue: "id",
        // url: {
        //   url: "/a/b/c",
        //   method: "get"
        // },
        tableColumnConfig: { width: "150px", align: "center", "label": "状态" }
      }),
      columnUiCss: "",
      validatedPlugin: "",
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: "",
      deleteFlag: 0
    },
    {
      mappingClassField: "creator",
      columnLabel: "创建人",
      columnUiPlugin: JSON.stringify({
        "compName": "input",
        "clearable": true,
        "model": "creator",
        "label": "",
        // options: [],
        // url: {
        //   url: "/a/b/c",
        //   method: "get"
        // },
        tableColumnConfig: { width: "160px", align: "center", "label": "创建人" }
      }),
      columnUiCss: "",
      validatedPlugin: "",
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: "",
      deleteFlag: 0
    },
    {
      mappingClassField: "createTime",
      columnLabel: "创建时间",
      columnUiPlugin: JSON.stringify({
        "compName": "date-picker",
        "clearable": true,
        "model": "",
        "label": "",
        type: "datetimerange",
        options: [],
        url: {
          url: "/a/b/c",
          method: "get"
        },
        tableColumnConfig: { width: "150px", align: "center", "label": "创建时间" }
      }),
      columnUiCss: "",
      validatedPlugin: "",
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: "",
      deleteFlag: 0
    },
    {
      mappingClassField: "handle",
      columnLabel: "操作",
      columnUiPlugin: JSON.stringify({
        tableColumnConfig: {
          slotName: "handle"
        }
      }),
      columnUiCss: "",
      validatedPlugin: "",
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: "",
      deleteFlag: 0
    }
  ]
};