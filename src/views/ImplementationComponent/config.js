export default {
  struct: {
    id: 6,
    companyId: 0,
    name: '工单配置6',
    desp: null,
    parentId: 0,
    showDetailTab: 1,
    mappingClass: 'com.easyliao.struct.client.demo.resource.StructDto',
    migrationStrategy: 0,
    assignTableName: null,
    deleteFlag: 0,
    viewTemplate: JSON.stringify({
      pageUrl: {
        list: {
          url: '/a/b/list',
          method: 'get',
          params: {}
        },
        create: {
          url: '/a/b/creat',
          method: 'post'
        },
        delete: {
          url: '/a/b/delete',
          method: 'delete'
        },
        upd: {
          url: '/a/b/upd',
          method: 'post'
        },
      },
      rules: [],
      required: ['name'],
      searchsort: [],
      labelWidth: '200px',
      itemWidth: '100px',
      defaultSearchData: { id: '', name: '' },
      pageSize: 10,
      pageNum: 1,
      isPage: true,
      tableHandleBtns: [{ text: '删除', showtype: 'conrm', msg: '是否删除', uri: '' }, { text: '修改' }],
      tableTopHandleBox: [{ text: '批量删除' }, { text: '新增', showType: 'drawer' }],
      handleBox: {
        type: 1, // 1:默认且追加  2:覆盖
      },
      // showInAdd: ['name', 'age', 'sex', '省', '市', '区'],
      // showInEdit: [{ key: 'name' }, { key: 'sex' }],
      // 搜索场景
      search: {
        pageSize: 10,
        pageNum: 1,
        isPage: true,
        sort: [
          { mappingClassField: 'sex', placeholder: 'xxxx' },
          'name', 'age', 'address'
        ],
        rules: [],
        labelWidth: '',
        defaultValue: {
          sex: 1,
          name: '李大玄',
          age: ''
        }
      },
      tableConfigSlot: {
        handle: [
          { text: '删除', showType: 'confirm', message: '', title: '' },
          { text: '修改', showType: 'el-dialog', title: '修改', width: '40%' }
        ]
      },
      create: {
        sort: [
          { mappingClassField: 'sex', placeholder: 'xxxx', "required": true, },
          { mappingClassField: 'name', placeholder: 'xxxx', width: '200px', "required": false, },
          'age', 'address'
        ],
        rules: [],
        labelWidth: '',
        defaultValue: {
          sex: 2,
          name: '李小玄',
          age: ''
        }
      },
      edit: {
        sort: [
          { mappingClassField: 'sex', placeholder: 'xxxx' },
          'name', 'age', 'address'
        ],
        rules: [],
        labelWidth: '',
        disabled: []
      },
      migrationStrategy: 0,
      assignTableName: ''
    }),
  },
  attributes: [{
      id: 1,
      structId: 1,
      mappingClassField: 'id',
      columnLabel: '标识',
      columnUiPlugin: '',
      validatedPlugin: '',
      columnUiCss: '',
      sortIndex: 1,
      showInList: 1,
      showInQuery: 1,
      desp: '',
      deleteFlag: 0
    },
    {
      id: 2,
      structId: 1,
      mappingClassField: 'name',
      columnLabel: '姓名',
      columnUiPlugin: JSON.stringify({
        "compName": "input",
        "clearable": true,
        "required": true,
        "itemWidth": "200px",
        "placeholder": "请输入姓名",
        "model": "name",
        "label": "姓名",
        "labelWidth": "100px",
        "requiredMessage": "姓名不能为空",
        tableColumnConfig: { width: '150px', align: 'center', }, // slotName: 'name' 
      }),
      columnUiCss: '',
      validatedPlugin: 'input',
      sortIndex: 2,
      showInList: 1,
      showInQuery: 1,
      desp: '',
      deleteFlag: 0
    },
    {
      id: 3,
      structId: 1,
      mappingClassField: 'sex',
      columnLabel: '性别',
      columnUiPlugin: JSON.stringify({ "compName": "select", "clearable": true, "model": "sex", "label": "性别", options: [{ name: "男", id: 1 }, { name: "女", id: 2 }] }),
      columnUiCss: '',
      validatedPlugin: '',
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: '',
      deleteFlag: 0
    },
    {
      id: 4,
      structId: 1,
      mappingClassField: 'age',
      columnLabel: '年龄',
      columnUiPlugin: JSON.stringify({
        "compName": "input",
        "clearable": true,
        "model": "age",
        "label": "年龄",
        tableWidth: '50px'
      }),
      columnUiCss: '',
      validatedPlugin: '',
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: '',
      deleteFlag: 0
    },
    {
      id: 5,
      structId: 1,
      mappingClassField: 'address',
      columnLabel: '地址',
      columnUiPlugin: JSON.stringify({
        "compName": "select",
        "clearable": true,
        "model": "address",
        "label": "地址",
        options: [],
        url: {
          url: '/a/b/c',
          method: 'get'
        },
        tableColumnConfig: { width: '50px', type: 'index', align: 'center' },
      }),
      columnUiCss: '',
      validatedPlugin: '',
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: '',
      deleteFlag: 0
    },
    {
      id: 6,
      structId: 1,
      mappingClassField: 'handle',
      columnLabel: '操作',
      columnUiPlugin: JSON.stringify({
        tableColumnConfig: {
          slotName: 'handle'
        }
      }),
      columnUiCss: '',
      validatedPlugin: '',
      sortIndex: 3,
      showInList: 1,
      showInQuery: 1,
      desp: '',
      deleteFlag: 0
    },
  ]
}