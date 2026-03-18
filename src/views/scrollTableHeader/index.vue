<!--
 * @Description:
 * @Author: lidaxuan
 * @Date: 2026-03-18 16:04:22
 * @FilePath: src/views/scrollTableHeader/index.vue
 * @LastEditors: lijixuan
 * @LastEditTime: 2026-03-18 16:04:22
-->
<template>
  <div class="">
    <div style="width: 100%;height: 200px; background: pink">
      顶部
    </div>
    <TableSp tableStyle="border" :data="tableData"
             :showSelection="true" ref="tableRef" height="500px"
             :tableColumnData="tableColumnData"></TableSp>

    <div style="width: 100%;height: 200px; background: pink">
      分页
    </div>
  </div>
</template>

<script>
import TableSp from "./Table/main.vue"
import "./stickyFn.js"
import {createStickyThead} from "./mixins.js";

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {TableSp},
  props: {},
  data() {
    return {
      tableData: [],
      tableColumnData: []
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      let list = [
        {
          "key": "customerProfile",
          "label": "学员_客户",
          "sortOrder": 0,
          "props": {
            "closable": true,
            "movable": true
          },
          "children": [],
          "fixed": "left",
          "slotName": "Profile",
          "sortable": false,
          "prop": "customerProfile",
          "min-width": "180px",
          "display": true,
          "minWidth": 122,
          "show-overflow-tooltip": true
        },
        {
          "key": "age",
          "label": "年龄_客户",
          "sortOrder": 1,
          "props": {},
          "children": [],
          "slotName": "Age",
          "sortable": false,
          "prop": "age",
          "min-width": "180px",
          "display": true,
          "minWidth": 122,
          "show-overflow-tooltip": true
        },
        {
          "key": "provinceCity",
          "label": "省市_客户",
          "sortOrder": 1,
          "props": {},
          "children": [],
          "slotName": "ProvinceCity",
          "sortable": false,
          "prop": "provinceCity",
          "min-width": "180px",
          "display": true,
          "minWidth": 122,
          "show-overflow-tooltip": true
        },
        {
          "key": "education",
          "label": "学历_客户",
          "sortOrder": 1,
          "props": {},
          "children": [],
          "slotName": "Education",
          "sortable": false,
          "prop": "education",
          "min-width": "180px",
          "display": true,
          "minWidth": 122,
          "show-overflow-tooltip": true
        },
        {
          "key": "wechatNickname",
          "label": "微信昵称",
          "sortOrder": 2,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "wechatNickname",
          "min-width": "180px",
          "display": true,
          "minWidth": 114,
          "show-overflow-tooltip": true
        },
        {
          "key": "wechatRemark",
          "label": "微信备注",
          "sortOrder": 2,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "wechatRemark",
          "min-width": "180px",
          "display": true,
          "minWidth": 114,
          "show-overflow-tooltip": true
        },
        {
          "key": "mobile",
          "label": "手机号",
          "sortOrder": 3,
          "props": {
            "actions": [
              "copy",
              "call"
            ],
            "closable": true
          },
          "children": [],
          "slotName": "ActionText",
          "sortable": false,
          "prop": "mobile",
          "min-width": "180px",
          "display": true,
          "minWidth": 98,
          "show-overflow-tooltip": true
        },
        {
          "key": "wechatTags",
          "label": "标签",
          "sortOrder": 4,
          "props": {},
          "children": [],
          "slotName": "Tags",
          "sortable": false,
          "prop": "wechatTags",
          "min-width": "180px",
          "display": true,
          "minWidth": 82,
          "show-overflow-tooltip": true
        },
        {
          "key": "projectName",
          "label": "客户咨询项目",
          "sortOrder": 5,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "projectName",
          "min-width": "180px",
          "display": true,
          "minWidth": 146,
          "show-overflow-tooltip": true
        },
        {
          "key": "examConfirmStatus",
          "label": "考期确认",
          "sortOrder": 5,
          "props": {
            "frozen": true,
            "emptyDisplay": true,
            "closable": true
          },
          "children": [],
          "slotName": "ExamConfirmStatus",
          "sortable": false,
          "prop": "examConfirmStatus",
          "min-width": "180px",
          "display": true,
          "minWidth": 114,
          "show-overflow-tooltip": true
        },
        {
          "key": "activeBehaviors",
          "label": "活跃行为",
          "sortOrder": 6,
          "props": {},
          "children": [],
          "slotName": "Tags",
          "sortable": false,
          "prop": "activeBehaviors",
          "min-width": "180px",
          "display": true,
          "minWidth": 114,
          "show-overflow-tooltip": true
        },
        {
          "key": "lastActiveTime",
          "label": "最近活跃时间",
          "sortOrder": 7,
          "props": {
            "sorter": true
          },
          "children": [],
          "sortable": true,
          "prop": "lastActiveTime",
          "min-width": "180px",
          "display": true,
          "minWidth": 170,
          "show-overflow-tooltip": true
        },
        {
          "key": "lastRemark",
          "label": "跟进备注_客户",
          "sortOrder": 9,
          "props": {
            "editable": true
          },
          "children": [],
          "slotName": "LastRemark",
          "sortable": false,
          "prop": "lastRemark",
          "min-width": "180px",
          "display": true,
          "minWidth": 154,
          "show-overflow-tooltip": true
        },
        {
          "key": "liveWatchDuration",
          "label": "直播类直播听课时长",
          "sortOrder": 11,
          "props": {
            "sorter": true
          },
          "children": [],
          "sortable": true,
          "prop": "liveWatchDuration",
          "min-width": "180px",
          "display": true,
          "minWidth": 218,
          "show-overflow-tooltip": true
        },
        {
          "key": "totalWatchDuration",
          "label": "直播类听课时长",
          "sortOrder": 12,
          "props": {
            "sorter": true
          },
          "children": [],
          "sortable": true,
          "prop": "totalWatchDuration",
          "min-width": "180px",
          "display": true,
          "minWidth": 186,
          "show-overflow-tooltip": true
        },
        {
          "key": "intakeCount",
          "label": "进量次数",
          "sortOrder": 13,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "intakeCount",
          "min-width": "180px",
          "display": true,
          "minWidth": 114,
          "show-overflow-tooltip": true
        },
        {
          "key": "latestPeriodAlias",
          "label": "最新线索期次",
          "sortOrder": 13,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "latestPeriodAlias",
          "min-width": "180px",
          "display": true,
          "minWidth": 146,
          "show-overflow-tooltip": true
        },
        {
          "key": "latestLeadsSource",
          "label": "最新线索进量来源",
          "sortOrder": 13,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "latestLeadsSource",
          "min-width": "180px",
          "display": true,
          "minWidth": 178,
          "show-overflow-tooltip": true
        },
        {
          "key": "latestCustomerType",
          "label": "最新线索复购校验",
          "sortOrder": 14,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "latestCustomerType",
          "min-width": "180px",
          "display": true,
          "minWidth": 178,
          "show-overflow-tooltip": true
        },
        {
          "key": "latestFollowerName",
          "label": "最新线索跟进人",
          "sortOrder": 16,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "latestFollowerName",
          "min-width": "180px",
          "display": true,
          "minWidth": 162,
          "show-overflow-tooltip": true
        },
        {
          "key": "latestFollowerDept",
          "label": "最新线索跟进人部门",
          "sortOrder": 17,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "latestFollowerDept",
          "min-width": "180px",
          "display": true,
          "minWidth": 194,
          "show-overflow-tooltip": true
        },
        {
          "key": "currentFollowerName",
          "label": "当前跟进人",
          "sortOrder": 18,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "currentFollowerName",
          "min-width": "180px",
          "display": true,
          "minWidth": 130,
          "show-overflow-tooltip": true
        },
        {
          "key": "customerAcquireMethod",
          "label": "客户获取方式",
          "sortOrder": 19,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "customerAcquireMethod",
          "min-width": "180px",
          "display": true,
          "minWidth": 146,
          "show-overflow-tooltip": true
        },
        {
          "key": "customerAcquireDate",
          "label": "客户获取日期",
          "sortOrder": 20,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "customerAcquireDate",
          "min-width": "180px",
          "display": true,
          "minWidth": 146,
          "show-overflow-tooltip": true
        },
        {
          "key": "customerCreateDate",
          "label": "客户创建日期",
          "sortOrder": 21,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "customerCreateDate",
          "min-width": "180px",
          "display": true,
          "minWidth": 146,
          "show-overflow-tooltip": true
        },
        {
          "key": "lastContactDate",
          "label": "最近联系日期",
          "sortOrder": 22,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "lastContactDate",
          "min-width": "180px",
          "display": true,
          "minWidth": 146,
          "show-overflow-tooltip": true
        },
        {
          "key": "noContactDays",
          "label": "未联系天数",
          "sortOrder": 23,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "noContactDays",
          "min-width": "180px",
          "display": true,
          "minWidth": 130,
          "show-overflow-tooltip": true
        },
        {
          "key": "lastCallRecord",
          "label": "最近电话沟通",
          "sortOrder": 24,
          "props": {},
          "children": [],
          "sortable": false,
          "prop": "lastCallRecord",
          "min-width": "180px",
          "display": true,
          "minWidth": 146,
          "show-overflow-tooltip": true
        }
      ]

      const res = await new Promise(resolve => {
        setTimeout(() => {
          console.log(111)
          this.tableColumnData = list;
          resolve()
        }, 2000)
      })
      this.tableData = Array.from({length: 50}).map(item => {
        item = {};
        item.customerProfile = item;
        return item;
      })
      console.log(222)
      this.stickyManager = createStickyThead(
              this.$refs.tableRef.$refs.table.$el,          // 表格容器元素
              0,                             // 顶部距离（或选择器字符串 '.header'）
              this                             // 当前组件实例，用于查找表格组件
      );
      /*this.$nextTick(() => {
        const tableEl = this.$refs.tableRef.$refs.table.$el;
        this.stickyInstance = window.initTableSticky(tableEl, {
          top: '0px',
          zIndex: 999,
        });
      });*/
    }
  },
};
</script>
<style lang='scss' scoped>

</style>
