<template>
  <div class="page-box">
    <div class="quick-filters">
      <div v-for="(item, index1) in pageConfigJson.quickFilters" :key="index1">
        <QuickFilter @setValue="quickFilterSetValue" :config="item" :key="index1"></QuickFilter>
      </div>
    </div>

    <el-form :inline="true" :model="pageForm" class="">
      <template v-for="(item, index1) in pageConfigJson.formFilters">
        <el-form-item :label="item.label" :key="index1">
          <el-select v-if="item.type == 'select'" :multiple="item.porps?.multiple" v-model="pageForm[item.key]" placeholder="活动区域">
            <el-option v-for="(optionItem, index2) in item.props?.options" :label="optionItem.label" :value="optionItem.value" :key="index2"></el-option>
          </el-select>
          <el-date-picker v-if="item.type == 'date'" v-model="pageForm[item.key]" type="daterange" align="right" unlink-panels
                          :start-placeholder="item.props?.placeholder[0]" range-separator="至" :end-placeholder="item.props?.placeholder[1]"
                          value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"
                          :picker-options="getPickerOptions(item.props?.shortcuts)">
          </el-date-picker>
          <el-input v-if="item.type == 'input'" v-model="pageForm[item.key]" :placeholder="item.props?.placeholder"></el-input>
        </el-form-item>
      </template>
    </el-form>


    <div class="stats-region">
      <div v-for="groupItem in pageConfigJson.statsRegion?.groups" class="group-item">
        <div>{{ groupItem.title }}</div>
        <div v-for="item in groupItem.items" class="item">
          {{ item.label }}: {{ item.key }}
        </div>
      </div>
    </div>

    <div>
      <el-button type="primary" v-for="(item, index) in pageConfigJson.actionBtn" :key="index">{{ item.label }}</el-button>
    </div>
    <TableSp height="100%" :data="tableData" v-loading="pageLoading" :tableColumnData="pageConfigJson.table">
      <template #profile="{ $index, row, column }">
        <Profile :info="row[column.property]"></Profile>
      </template>
    </TableSp>

    <Pagination layout="total,sizes,prev, pager, next,jumper" :page="page"
                @current-change="handleCurrentChange" @size-change="handleSizeChange">
    </Pagination>

    <CustomerInfo ref="customerInfo"></CustomerInfo>
<!--    <pre class="prebox">{{ pageForm }}</pre>-->
  </div>
</template>

<script>
import Pagination from "./pagination.vue";
import Profile from "./profile.vue";
import TableSp from "./table/main.vue";
import QuickFilter from "./quickFilter.vue";
import CustomerInfo from "./customerInfo.vue";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date, time) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d} ${time}`;
}

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    TableSp,
    Pagination,
    Profile,
    QuickFilter,
    CustomerInfo
  },
  computed: {
    capitalizeFirstLetter: () => capitalizeFirstLetter
  },
  props: {},
  data() {
    return {
      pageLoading: false,
      pageForm: {},
      pageConfigJson: {},
      tableData: [],
      page: {
        total: 0,
        pageSize: 10,
        page: 1,
      },
      tableColumnData: [
        {label: "卡片ID", prop: "sfId"},
        {label: "卡片标题", prop: "cardTitle"},
        {label: "卡片描述", prop: "describe"},
        {label: "上次修改时间", prop: "updateTime"},
        {width: 150, label: '操作', slotName: 'oper', fixed: 'right'}
      ],
    };
  },

  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    // temStr(val) {
    // },
  },
  beforeCreate() {
  },
  created() {
    const res1 = {
      "code": 200,
      "data": {
        "pageId": "period_customer_list",
        "title": "顾问期次客户",
        "quickFilters": [{
          "label": "跟进⼈加微",
          "key": "addWechatStatus", // ← 重要：⽤于构建查询参数
          "type": "select",
          "props": {
            "options": [
              {"label": "已加微", "value": 1},
              {"label": "未加微", "value": 0}
            ]
          }
        }], // 快速筛选器配置
        "formFilters": [], // 表单筛选器配置
        "statsRegion": {}, // 统计区域配置
        "actionBtn": [], // 操作按钮配置
        "table": [
          {
            "label": "客户", // 列头显示⽂本
            "key": "customerProfile", // ← 重要：对应数据字段的 key
            "type": "profile", // 组件类型
            "sorter": true // 是否⽀持排序
          }, {
            "label": "微信备注", // 列头显示⽂本
            "key": "wechatRemark", // ← 重要：对应数据字段的 key
            // "type": "wechatRemark", // ← 重要：对应数据字段的 key
            "sorter": true // 是否⽀持排序
          },
        ] // 表格列配置
      }
    };


    const res2 = {
      "code": 200,
      "data": {
        "list": [
          {
            "customerProfile": { // ← 对应 table[0].key
              "avatar": "https://...",
              "name": "张三",
              "id": 12345
            },
            "wechatRemark": "重点客户", // ← 对应 table[1].key
            "mobile": "13800138000", // ← 对应 table[2].key
            "wechatTags": ["A类", "意向⾼"], // ← 对应 table[3].key
            "lastActiveTime": "2025-12-05 10:30", // ← 对应 table[5].key
            "intentionScore": 85, // ← 对应 table[6].key
          }
        ],
        "total": 150,
        "page": 1,
        "pageSize": 20
      }
    }
    this.tableData = res2.data.list;
    this.page.total = res2.data.total;
    this.page.pageSize = res2.data.pageSize;
    this.page.page = res2.data.page;

    const res3 = {
      "code": 200,
      "data": {
        "pageId": "period_customer_list",
        "title": "顾问期次客户",
        "actionBtn": [ // type:batchUpdateRemrk、batchSend 基于约定类型，实现不同的按钮功能，基于结构返回控制是否展示
          {"label": "批量改备注", "key": "", "type": "batchUpdateRemrk"},
          {"label": "发送内容", "key": "", "type": "batchSend"}
        ],
        "quickFilters": [
          {
            "label": "跟进⼈加微",
            "key": "addWechatStatus",
            "type": "select",
            "props": {
              "multiple": false,
              "options": [
                {"label": "已加微", "value": 1},
                {"label": "未加微", "value": 0},
                {"label": "已删除", "value": 2}
              ]
            }
          },
          {
            "label": "进群情况",
            "key": "groupStatus",
            "type": "select",
            "props": {
              "multiple": false,
              "options": [
                {"label": "已进群", "value": 1},
                {"label": "未进群", "value": 0},
                {"label": "不进群", "value": 2}
              ]
            }
          },
          {
            "label": "邮寄情况",
            "key": "mailStatus",
            "type": "select",
            "props": {
              "multiple": false,
              "options": [
                {"label": "已邮寄", "value": 1},
                {"label": "未邮寄", "value": 0},
                {"label": "⽆需邮寄", "value": 2},
                {"label": "取消邮寄", "value": 3}
              ]
            }
          },
          {
            "label": "聊完情况",
            "key": "chatFinishStatus",
            "type": "select",
            "props": {
              "multiple": false,
              "options": [
                {"label": "已聊完", "value": 1},
                {"label": "未聊完", "value": 0}
              ]
            }
          },
          {
            "label": "课程开通",
            "key": "courseOpenStatus",
            "type": "select",
            "props": {
              "multiple": false,
              "options": [
                {"label": "未开通", "value": 0},
                {"label": "家庭教育指导师...", "value": 1001},
                {"label": "⼼理咨询三级...", "value": 1002}
              ]
            }
          },
          {
            "label": "考期确认",
            "key": "examConfirmStatus",
            "type": "select",
            "props": {
              "multiple": false,
              "options": [
                {"label": "已确认", "value": 1},
                {"label": "未确认", "value": 0}
              ]
            }
          }
        ],
        "formFilters": [
          {
            "label": "活跃⾏为",
            "key": "activeBehavior",
            "type": "modal",
            "defaultView": true,
            "props": {
              "placeholder": "请选择⾏为"
            }
          },
          {
            "label": "活跃时间",
            "key": "activeTime",
            "type": "date",
            "defaultView": true,
            "props": {
              "placeholder": ["开始⽇期", "结束⽇期"],
              "shortcuts": [
                {"label": "今天", "type": "day", "value": 0, "mode": "range"},
                {"label": "昨天", "type": "day", "value": 1, "mode": "range"},
                {"label": "最近2天", "type": "day", "value": 2, "mode": "range"},
                {"label": "最近3天", "type": "day", "value": 3, "mode": "range"},
                {"label": "最近4天", "type": "day", "value": 4, "mode": "range"},
                {"label": "最近5天", "type": "day", "value": 5, "mode": "range"}
              ]
            }
          },
          {
            "label": "开通课程",
            "key": "courseId",
            "type": "select",
            "defaultView": true,
            "props": {
              "placeholder": "请选择课程",
              "searchable": true,
              "options": [
                {"label": "20251201家庭教育指导师课程1", "value": 1001},
                {"label": "20251201家庭教育指导师课程2.", "value": 1002}
              ]
            }
          },
          {
            "label": "课节选择",
            "key": "lessonIds",
            "type": "modal",
            "defaultView": true,
            "props": {
              "placeholder": "请选择课节",
              "multiSelection": true
            }
          },
          {
            "label": "到课完课",
            "key": "attendanceStatus",
            "type": "select",
            "defaultView": true,
            "props": {
              "options": [
                {"label": "未到课", "value": 0},
                {"label": "到课", "value": 1},
                {"label": "完课", "value": 2}
              ]
            }
          },
          {
            "label": "直播听课",
            "key": "liveDuration",
            "type": "range",
            "defaultView": true,
            "props": {
              "placeholders": ["最⼩时⻓", "最⼤时⻓"],
              "suffix": "分钟",
              "allowInteger": true
            }
          },
          {
            "label": "⼿机号",
            "key": "mobile",
            "type": "input",
            "defaultView": false,
            "props": {
              "placeholder": "精准搜索",
              "inputType": "number"
            }
          },
          {
            "label": "客户",
            "key": "leadsName",
            "type": "input",
            "defaultView": false,
            "props": {
              "placeholder": "客户昵称"
            }
          },
          {
            "label": "标签",
            "key": "wechatTags",
            "type": "modal",
            "defaultView": false,
            "props": {
              "placeholder": "选择企微标签"
            }
          },
          {
            "label": "微信昵称",
            "key": "wechatNick",
            "type": "input",
            "defaultView": false,
            "props": {
              "placeholder": "模糊搜索"
            }
          },
          {
            "label": "微信备注",
            "key": "wechatRemark",
            "type": "input",
            "defaultView": false,
            "props": {
              "placeholder": "模糊搜索"
            }
          },
          {
            "label": "年龄",
            "key": "ageRange",
            "type": "range",
            "defaultView": false,
            "props": {
              "placeholders": ["最⼩", "最⼤"],
              "suffix": "岁"
            }
          },
          {
            "label": "省市",
            "key": "region",
            "type": "input",
            "defaultView": false,
            "props": {
              "placeholder": "请输⼊省市"
            }
          },
          {
            "label": "学历",
            "key": "education",
            "type": "select",
            "defaultView": false,
            "props": {
              "options": [
                {"label": "⾼中及以下", "value": 1},
                {"label": "⼤专", "value": 2},
                {"label": "本科", "value": 3},
                {"label": "研究⽣", "value": 4},
                {"label": "博⼠", "value": 5}
              ]
            }
          },
          {
            "label": "跟进⼈",
            "key": "followerIds",
            "type": "select_multiple",
            "defaultView": false,
            "props": {
              "options": [
                {"label": "张三", "value": 1},
                {"label": "李四", "value": 2},
                {"label": "王五", "value": 3}
              ]
            }
          },
          {
            "label": "课堂登录",
            "key": "loginStatus",
            "type": "select",
            "defaultView": false,
            "props": {
              "options": [
                {"label": "已登录", "value": 1},
                {"label": "未登录", "value": 0}
              ]
            }
          }
        ],
        "statsRegion": {
          "type": "stat_dashboard",
          "groups": [
            {
              "title": "缴费统计",
              "key": "paymentStats",
              "items": [
                {"label": "线索", "key": "leads", "stateMap": ["default"]},
                {"label": "预报名", "key": "preSign", "splitRule": "|", "stateMap": ["default", "highlight"]},
                {"label": "代⾦券", "key": "coupon", "splitRule": "|", "stateMap": ["default", "highlight", "sub_grey"]},
                {"label": "尾款", "key": "balance", "splitRule": "|", "stateMap": ["default", "highlight", "sub_grey"]},
                {"label": "全款", "key": "fullPay", "splitRule": "|", "stateMap": ["default", "highlight", "sub_grey"]},
                {"label": "报名", "key": "signUp", "splitRule": "|", "stateMap": ["default", "sub_grey"]},
                {"label": "业绩⾦额", "key": "revenue", "stateMap": ["highlight_large"]},
                {"label": "线产⾦额", "key": "production", "stateMap": ["default"]},
                {"label": "考期确认", "key": "examConfirm", "splitRule": "|", "stateMap": ["default", "highlight"]}
              ]
            },
            {
              "title": "SOP统计",
              "key": "sopStats",
              "items": [
                {"label": "线索", "key": "leads", "stateMap": ["default"]},
                {"label": "预报名", "key": "preSign", "splitRule": "|", "stateMap": ["default", "highlight"]},
                {"label": "加微", "key": "addWechat", "splitRule": "|", "stateMap": ["default", "highlight", "sub_grey"]},
                {"label": "聊完", "key": "chat", "splitRule": "|", "stateMap": ["default", "highlight", "sub_grey"]},
                {"label": "邮寄", "key": "mail", "splitRule": "|", "stateMap": ["default", "highlight", "sub_grey"]},
                {"label": "进群", "key": "group", "splitRule": "|", "stateMap": ["default", "highlight", "sub_grey"]},
                {"label": "课程开通", "key": "courseOpen", "splitRule": "|", "stateMap": ["default", "highlight"]},
                {"label": "课堂登录", "key": "liveLogin", "splitRule": "|", "stateMap": ["default", "highlight"]},
                {"label": "直播出勤", "key": "liveAttend", "splitRule": "-", "stateMap": ["default", "default", "default"]},
                {"label": "直播完课", "key": "liveComplete", "splitRule": "-", "stateMap": ["default", "default", "default"]}
              ]
            }
          ]
        },
        "table": [
          {"label": "客户", "key": "customerProfile", "type": "profile"},
          {"label": "微信备注(当前跟进)", "key": "wechatRemark", "type": "text"},
          {
            "label": "⼿机号", "key": "mobile", "type": "action_text",
            "props": {"action": ["copy", "call"]}
          },
          {"label": "标签", "key": "wechatTags", "type": "tags"},
          {"label": "活跃⾏为", "key": "activeBehaviors", "type": "tags"},
          {"label": "最近活跃时间", "key": "lastActiveTime", "type": "text", "sorter": true},
          {
            "label": "客户意向分(深维)", "key": "intentionScore", "type": "highlight_text", "sorter": true,
            "props": {"color": "green", "suffix": "分"}
          },
          {"label": "备注", "key": "remark", "type": "text", "editable": true},
          {"label": "微信昵称", "key": "wechatNick", "type": "text"},
          {"label": "年龄", "key": "age", "type": "text"},
          {"label": "省市", "key": "region", "type": "text"},
          {"label": "学历", "key": "education", "type": "text"},
          {"label": "开通课程名称", "key": "openedCourseName", "type": "text"},
          {"label": "邮寄情况", "key": "mailStatus", "type": "text", "editable": true},
          {"label": "聊完情况", "key": "chatFinishStatus", "type": "text", "editable": true},
          {"label": "进群情况(顾问)", "key": "groupStatus", "type": "text", "editable": true},
          {"label": "考期确认", "key": "examConfirmStatus", "type": "text", "editable": true},
          {
            "label": "直播到课情况", "key": "liveAttendIcons", "type": "status_icons", "props": {
              "mapping": {
                "0": {"icon": "close", "color": "red"},
                "1": {"icon": "check", "color": "green"},
                "2": {"icon": "circle", "color": "grey"}
              }
            }
          },
          {"label": "直播观看时⻓", "key": "liveDuration", "type": "text", "sorter": true},
          {"label": "总观看时⻓(含回放)", "key": "totalDuration", "type": "text", "sorter": true},
          {"label": "进量数量", "key": "leadsCount", "type": "text"},
          {"label": "客户类型", "key": "customerType", "type": "text"},
          {"label": "进量来源", "key": "leadsSource", "type": "text"},
          {"label": "分配时间", "key": "assignTime", "type": "text"},
          {"label": "线索跟进⼈加微", "key": "leadsAddWechat", "type": "text"},
          {"label": "当前跟进⼈", "key": "currentFollower", "type": "text"}
        ]
      }
    }

    const res4 = {
      "code": 200,
      "data": {
        "pageId": "all_customer_list",
        "title": "",
        "actionBtn": [ // type:batchUpdateRemrk、batchUpdateTags、batchSend、updateFollower 基于约定类型，实现不同的按钮功能，基于结构返回控制是否展示(权限)
          {"label": "批量改备注", "key": "", "type": "batchUpdateRemrk"},
          {"label": "批量改标签", "key": "", "type": "batchUpdateTags"},
          {"label": "发送内容", "key": "", "type": "batchSend"},
          {"label": "变更跟进⼈", "key": "", "type": "updateFollower"}
        ],
        "quickFilters": [
          {
            "label": "学段",
            "key": "phase",
            "type": "select",
            "props": {
              "multiple": false,
              "options": [
                {"label": "⼩学", "value": 1},
                {"label": "初中", "value": 2},
                {"label": "⾼中", "value": 3}
              ]
            }
          },
          {
            "label": "跟进⼈加微",
            "key": "addWechatStatus",
            "type": "select",
            "props": {
              "multiple": false,
              "options": [
                {"label": "已加微", "value": 1},
                {"label": "未加微", "value": 0},
                {"label": "已删除", "value": 2}
              ]
            }
          },
          {
            "label": "考期确认",
            "key": "examConfirmStatus",
            "type": "select",
            "props": {
              "multiple": false,
              "options": [
                {"label": "已确认", "value": 1},
                {"label": "未确认", "value": 0}
              ]
            }
          }
        ],
        "formFilters": [
          {"label": "活跃⾏为", "key": "activeBehavior", "type": "modal", "defaultView": true, "props": {"placeholder": "请选择⾏为"}},
          {"label": "活跃时间", "key": "activeTime", "type": "date", "defaultView": true, "props": {"placeholder": ["开始⽇期", "结束⽇期"]}},
          {"label": "直播听课", "key": "liveDuration", "type": "range", "defaultView": true, "props": {"suffix": "分钟"}},
          {"label": "⼿机号", "key": "mobile", "type": "input", "defaultView": false},
          {"label": "客户", "key": "keyword", "type": "input", "defaultView": false, "props": {"placeholder": "姓名/微信昵称"}},
          {"label": "客户创建时间", "key": "createTime", "type": "date", "defaultView": false},
          {"label": "当前跟进⼈", "key": "currentFollower", "type": "input", "defaultView": false, "props": {"placeholder": "模糊搜索"}},
          {"label": "线索期次", "key": "leadsPeriod", "type": "select", "defaultView": false, "props": {"searchable": true, "placeholder": "请输⼊期次"}},
          {"label": "客户获取⽅式", "key": "acquireType", "type": "select_multiple", "defaultView": false},
          {"label": "最近联系⽇期", "key": "lastContactDate", "type": "date", "defaultView": false},
          {"label": "客户咨询项⽬", "key": "consultProject", "type": "select", "defaultView": false}
        ],
        "statsRegion": {
          "type": "stat_dashboard",
          "groups": [
            {
              "title": "缴费统计",
              "key": "paymentStats",
              "items": [
                {"label": "客户", "key": "totalCustomers", "stateMap": ["default"]},
                {"label": "新增", "key": "newCustomers", "stateMap": ["default"]},
                {"label": "代⾦券", "key": "couponPay", "splitRule": "|", "stateMap": ["default", "sub_grey"]},
                {"label": "尾款", "key": "balancePay", "splitRule": "|", "stateMap": ["default", "highlight", "sub_grey"]},
                {"label": "全款", "key": "fullPay", "splitRule": "|", "stateMap": ["default", "sub_grey"]},
                {"label": "考期确认", "key": "examConfirm", "splitRule": "|", "stateMap": ["default", "highlight"]}
              ]
            }
          ]
        },
        "table": [
          {"label": "客户", "key": "customerProfile", "type": "profile"},
          {"label": "客户咨询项⽬", "key": "consultProject", "type": "text"},
          {"label": "微信备注", "key": "wechatRemark", "type": "text"},
          {
            "label": "⼿机号", "key": "mobile", "type": "action_text", "props": {
              "actions":
                      ["copy", "call"]
            }
          },
          {"label": "标签", "key": "wechatTags", "type": "tags"},
          {
            "label": "考期确认", "key": "examConfirmStatus", "type": "text", "props": {
              "frozen": true, "emptyDisplay": true
            }
          },
          {"label": "活跃⾏为", "key": "activeBehaviors", "type": "tags"},
          {"label": "最近活跃时间", "key": "lastActiveTime", "type": "text", "sorter": true},
          {
            "label": "客户意向分(深维)", "key": "intentionScore", "type": "highlight_text",
            "sorter": true, "props": {"color": "green", "suffix": "分"}
          },
          {"label": "备注", "key": "remark", "type": "text", "editable": true},
          {
            "label": "直播到课情况", "key": "liveAttendIcons", "type": "status_icons", "width":
                    140
          },
          {"label": "直播听课时⻓", "key": "liveDuration", "type": "text", "sorter": true},
          {
            "label": "直播总时⻓(含回放)", "key": "totalLiveDuration", "type": "text", "sorter":
                    true
          },
          {"label": "进线进量次数", "key": "leadsCount", "type": "text"},
          {"label": "最新期次", "key": "latestPeriod", "type": "text"},
          {"label": "最新进量来源", "key": "latestSource", "type": "text"},
          {"label": "最新跟进⼈", "key": "latestFollower", "type": "text"},
          {"label": "最新线索跟进⼈部⻔", "key": "latestFollowerDept", "type": "text"},
          {"label": "跟进⼈", "key": "currentFollower", "type": "text"},
          {"label": "客户获取⽅式", "key": "acquireType", "type": "text"},
          {"label": "客户获取⽇期", "key": "acquireDate", "type": "text"},
          {"label": "客户创建⽇期", "key": "createDate", "type": "text"},
          {"label": "最近联系⽇期", "key": "lastContactDate", "type": "text"},
          {"label": "未联系天数", "key": "noContactDays", "type": "text"},
          {"label": "最近电话沟通", "key": "lastCallStatus", "type": "text"}
        ]
      }
    }

    const res5 = {
      "code": 200,
      "data": {
        "pageId": "period_data_list",
        "title": "期次数据",
        "formFilters": [
          {
            "type": "sales_data",
            "title": "期次销售数据",
            "filters": [
              {"label": "咨询项⽬", "key": "consultProject", "type": "select", "props": {"defaultSelectIndex": 0}},
              {"label": "期次名称", "key": "periodName", "type": "select", "props": {"searchable": true}},
              {"label": "跟进⼈", "key": "follower", "type": "select", "props": {"searchable": true}}
            ],
            "table": [
              {"label": "跟进⼈", "key": "followerName", "type": "text"},
              {"label": "跟进⼈部⻔", "key": "deptName", "type": "text"},
              {"label": "线索", "key": "leadsCount", "type": "text", "sorter": true},
              {"label": "预报名", "key": "preSignCount", "type": "text", "sorter": true},
              {"label": "未预报名", "key": "notPreSignCount", "type": "text", "sorter": true, "style": {"color": "red"}},
              {"label": "代⾦券", "key": "couponCount", "type": "text", "sorter": true},
              {"label": "尾款", "key": "balanceCount", "type": "text", "sorter": true},
              {"label": "代⾦券未交尾款", "key": "couponUnpaidCount", "type": "text", "sorter": true, "style": {"color": "red"}},
              {"label": "全款", "key": "fullPayCount", "type": "text", "sorter": true},
              {"label": "报名", "key": "signUpCount", "type": "text", "sorter": true},
              {"label": "业绩总⾦额", "key": "totalRevenue", "type": "text", "sorter": true},
              {"label": "线产⾦额", "key": "productionAmount", "type": "text", "sorter": true},
              {"label": "加微", "key": "addWechatCount", "type": "text", "sorter": true},
              {"label": "未加微", "key": "notAddWechatCount", "type": "text", "sorter": true, "style": {"color": "red"}},
              {"label": "沟通", "key": "communicatedCount", "type": "text", "sorter": true},
              {"label": "未沟通", "key": "notCommunicatedCount", "type": "text", "sorter": true, "style": {"color": "red"}},
              {"label": "邮寄", "key": "mailedCount", "type": "text", "sorter": true},
              {"label": "未邮寄", "key": "notMailedCount", "type": "text", "sorter": true, "style": {"color": "red"}},
              {"label": "进群", "key": "groupCount", "type": "text", "sorter": true},
              {"label": "未进群", "key": "notGroupCount", "type": "text", "sorter": true, "style": {"color": "red"}},
              {"label": "课程开通", "key": "courseOpenCount", "type": "text", "sorter": true},
              {"label": "未课程开通", "key": "notCourseOpenCount", "type": "text", "sorter": true, "style": {"color": "red"}},
              {"label": "开通内容", "key": "openContent", "type": "popover", "props": {"trigger": "click"}},
              {"label": "课堂登录", "key": "classLoginCount", "type": "text", "sorter": true},
              {"label": "未课堂登录", "key": "notClassLoginCount", "type": "text", "sorter": true, "style": {"color": "red"}},
              {"label": "直播出勤", "key": "liveAttendCount", "type": "link", "sorter": true, "props": {"modal": "lesson_detail"}},
              {"label": "直播完课", "key": "liveCompleteCount", "type": "link", "sorter": true, "props": {"modal": "lesson_detail", "filter": ">60min"}},
              {"label": "考期确认", "key": "examConfirmCount", "type": "text", "sorter": true},
              {"label": "考期未确认", "key": "examNotConfirmCount", "type": "text", "sorter": true, "style": {"color": "red"}}
            ]
          },
          {
            "type": "class_data",
            "title": "期次课堂数据",
            "filters": [
              {"label": "咨询项⽬", "key": "consultProject", "type": "select", "props": {}},
              {"label": "期次名称", "key": "periodName", "type": "select", "props": {}},
              {"label": "课节名称", "key": "lessonName", "type": "select", "props": {}},
              {"label": "上课时间", "key": "classTimePoint", "type": "select", "props": {}},
              {"label": "跟进⼈", "key": "follower", "type": "select", "props": {}}
            ],
            "table": [
              {"label": "跟进⼈", "key": "followerName", "type": "text"},
              {"label": "跟进⼈部⻔", "key": "deptName", "type": "text"},
              {"label": "线索", "key": "leadsCount", "type": "text"},
              {"label": "总出勤⽬标", "key": "totalAttendGoal", "type": "text", "sorter": true},
              {"label": "在线⽬标", "key": "onlineGoal", "type": "text", "sorter": true},
              {"label": "总出勤数", "key": "totalAttendCount", "type": "text", "sorter": true},
              {"label": "总出勤率", "key": "totalAttendRate", "type": "text", "sorter": true},
              {
                "label": "总出勤差", "key": "totalGap", "type": "colored_text", "sorter": true,
                "props": {
                  "rules": [{"condition": ">=0", "color": "green"}, {"condition": "<0", "color": "red"}]
                }
              },
              {"label": "实时出勤⼈数", "key": "realTimeCount", "type": "text", "sorter": true},
              {"label": "实时出勤率", "key": "realTimeRate", "type": "text", "sorter": true},
              {
                "label": "实时差", "key": "realTimeGap", "type": "colored_text", "sorter": true, "props": {
                  "rules": [{"condition": ">=0", "color": "green"}, {"condition": "<0", "color": "red"}]
                }
              }
            ]
          }
        ]
      }
    }

    const res6 = {
      "sidebar": {
        "infoList": [
          {"label": "微信备注名", "key": "wechatRemark", "type": "text", "layout": 1},
          {
            "label": "⼿机号", "key": "mobile", "type": "action_text", "layout": 1,
            "props": {
              "actions": ["copy", "call"]
            }
          },
          {"label": "基础信息", "key": "basicInfoStr", "type": "text", "layout": 1},
          {"label": "当前跟进⼈", "key": "follower", "type": "text", "layout": 1},
          {
            "type": "grid_group",
            "cols": 2,
            "items": [
              {
                "label": "已加企微",
                "key": "addWechatStats",
                "type": "text_field_modal_view",
                "props": {
                  "modalConfig": {
                    "title": "已加企微详情",
                    "api": "/api/customer/wechat_relations",
                    "table": [
                      {"type": "text", "label": "CC企微名", "key": "ccWorkChatCName"},
                      {"type": "text", "label": "企微主体", "key": "workChat"},
                      {"type": "text", "label": "添加状态", "key": "workChatStatus"},
                      {"type": "text", "label": "员⼯+组织架构", "key": "ccNameAndDept"}
                    ]
                  }
                }
              },
              {
                "label": "所在群聊",
                "key": "joinedGroupStats",
                "type": "text_field_modal_view",
                "props": {
                  "modalConfig": {
                    "title": "所在群聊详情",
                    "api": "/api/customer/group_relations",
                    "table": [
                      {"type": "text", "label": "群名称", "key": "groupName"},
                      {"type": "text", "label": "企微主体", "key": "corpName"},
                      {"type": "tag", "label": "状态", "key": "status"},
                      {"type": "text", "label": "群主", "key": "ownerName"}
                    ]
                  }
                }
              }
            ]
          },
          {
            "type": "grid_group",
            "layout": 2,
            "items": [
              {"label": "客户来源", "key": "source", "type": "text"},
              {"label": "客户等级", "key": "level", "type": "text"}
            ]
          }
        ]
      }
    }

    const res7 = {
      "tabs": {
        // Tab 1: 客户资料 (Customer Info)
        "tab_customer_info": {
          "sections": [
            // 基础信息 (固定⼀⾏两列)
            {
              "label": "基础信息",
              "key": "basicInfo",
              "type": "table",
              "editable": true,
              "items": [
                {
                  "label": "客户名",
                  "key": "nickName",
                  "type": "text"
                },
                {
                  "label": "⼿机号",
                  "key": "mobile",
                  "type": "text",
                  "props": {
                    "actions": [
                      "copy",
                      "call"
                    ]
                  }
                },
                {"label": "年龄", "key": "age", "type": "text"},
                {"label": "学历", "key": "edu", "type": "text"},
                {"label": "省市", "key": "city", "type": "text"}
              ]
            },
            // 系统信息 (⼀⾏两列)
            {
              "label": "系统信息",
              "key": "sysInfo",
              "type": "desc_panel",
              "editable": false,
              "items": [
                {"label": "当前跟进⼈", "key": "follower", "type": "text"},
                {"label": "当前分配时间", "key": "assignTime", "type": "text"},
                {"label": "客户ID", "key": "customerId", "type": "text"},
                {"label": "微信UnionID", "key": "wechatUionId", "type": "text"}
              ]
            }
          ]
        },
        // --------------------------------------------------
        // Tab 2: 期次线索 (Period leads)
        // 到 统计结束 ⽇期后，所有的编辑功能前端不需要处理，通过后端接⼝判断，过期不可编辑；
        "tab_period_leads": {
          "sections": [
            // Block: 期次个⼈信息 (⼀⾏5列，铺满)
            {
              "label": "期次线索个⼈信息",
              "key": "periodLeadsInfo",
              "type": "table",
              "editable": true,
              "items": [
                {"label": "客户名", "key": "nickName", "type": "text"},
                {"label": "⼿机号", "key": "mobile", "type": "text"},
                {"label": "年龄", "key": "age", "type": "text"},
                {"label": "学历", "key": "edu", "type": "text"},
                {"label": "省市", "key": "city", "type": "text"}
              ]
            },
            {
              "label": "活跃⾏为",
              "key": "activeBehaviors",
              "type": "tags",
              "editable": false,
              "items": [
                {"label": "", "key": "behaviorTag", "type": "text"}
              ]
            },
            // SOP 区域
            {
              "label": "线索SOP",
              "key": "sopList",
              "type": "sop_table",
              "items": {
                "label": "sopItem",
                "key": "sopList.$item$",
                "type": "sop_item",
                "template": [
                  {"key": "id"},
                  {"key": "icon"}, //el-icon-box element ui icon
                  {"key": "topBadge", "label": "$topBadge.value", "color": "$topBadge.color"}, //eg. topBadge.color = #F5C296 ；如果 topBadge.value = "",上⻆标则不展示
                  {"key": "bottomBadge", "label": "$bottomBadge.value", "color": "$bottomBadge.color"}, // topBadge.color = #db6459; 如果 bottomBadge.value = "",下⻆标则不展示
                  {"key": "sopText", "label": "sopText.value"},
                  {"key": "bottomText", "label": "bottomText.value"},
                  // type 分为两类modal(展示)、edit(编辑) ;action： 发送（商品列表）、发送（课节列表）、基本SOP编辑（开课、进群状态）、
                  {"key": "actionBtn", "label": "actionBtn.value", "type": "actionBtn.type", "action": "actionBtn.action"}
                ]
              }
            },
            // 正价课订单 multi_text 此类符合字段不做配置结构化，后续可追加单⾏字段（text）即可
            {
              "label": "正价课订单",
              "key": "standardOrderList",
              "type": "table",
              "items": [
                {"label": "商品名称", "key": "skuInfo", "type": "multi_text"}, // 符合字段 key为接⼝的 objcet，具体实现看接⼝⽂档
                {"label": "期次", "key": "period", "type": "text"},
                {"label": "订单状态/订单号", "key": "orderInfo", "type": "multi_text"},
                {"label": "⾦额", "key": "amountInfo", "type": "multi_text"},
// 这版本不做完全体 先⽤约定，后续可以追加通⽤结构的单列展示即可
//{ "label": "订单状态/订单号", "key": "orderInfo",
// "type": "multi_line",
// "lines": [
// { "key": "payStatus", "label": "","type": "text" }, // 已⽀付/未⽀付 已⽀付有去退费
// { "key": "orderId", "label": "ID","type": "text","props": { "actions":["copy"]} },
// { "key": "examTimeStatus", "label": "","type": "text"} // 考期未确认｜考期已确认
// ]
// },
                {"label": "类型/购买渠道", "key": "orderTypeAndSource", "type": "multi_text"},
                {"label": "时间", "key": "orderTimeInfo", "type": "multi_text"}
              ]
            },
            // 期次课不做活
            // 营销订单
            {
              "label": "营销订单",
              "key": "marketingOrderList",
              "type": "table",
              "items": [
                {"label": "商品名称", "key": "skuInfo", "type": "multi_text"}, // 符合字段 key为接⼝的 objcet，具体实现看接⼝⽂档
                {"label": "期次", "key": "period", "type": "text"},
                {"label": "订单状态/订单号", "key": "orderInfo", "type": "multi_text"},
                //status、
                {"label": "⾦额", "key": "amountInfo", "type": "multi_text"},
                // 这版本不做完全体 先⽤约定，后续可以追加通⽤结构的单列展示即可
                /* {
                   "label": "订单状态/订单号", "key": "orderInfo",
                   "type": "multi_line",
                   "lines": [
                     {"key": "payStatus", "label": "", "type": "text"}, // 已⽀付/未⽀付 已⽀付有去退费
                     {"key": "orderId", "label": "ID", "type": "text", "props": {"actions": ["copy"]}},
                     {"key": "examTimeStatus", "label": "", "type": "text"} // 考期未确认｜考期已确认
                   ]
                 },*/
                {"label": "邮寄状态/购买渠道", "key": "deliveryAndSource", "type": "multi_text"},
                {"label": "时间", "key": "orderTimeInfo", "type": "multi_text"}
              ]
            }
          ]
        },
        // Tab 3: ⾏为轨迹 (Behavior Trace)
        "tab_customer_behavior_trace": {
          "formFilters": [
            // 第⼀⾏：咨询项⽬ (单选)，默认线索当前咨询项⽬)
            {
              "label": "咨询项⽬",
              "key": "consultProject",
              "type": "select",
              "props": {
                "options": [
                  {"label": "全部", "value": -1},
                  {"label": "育⾏家-家庭教育指导师证书", "value": 1},
                  {"label": "育⾏家-⼼理咨询师", "value": 2}
                ]
              }
            },
            // 操作⼈ (单选)
            {
              "label": "操作⼈",
              "key": "operatorType",
              "type": "select",
              "props": {
                "defaultValue": 1,
                "options": [
                  {"label": "全部", "value": -1},
                  {"label": "客户", "value": 1},
                  {"label": "员⼯", "value": 2},
                  {"label": "系统", "value": 3}
                ]
              }
            },
            // 复选
            {
              "label": "期次",
              "key": "periodIds",
              "type": "select_multiple",
              "props": {
                "options": [
                  {"label": "全部", "value": -1},
                  {"label": "250908期", "value": 1},
                  {"label": "250909期", "value": 2}
                ]
              }
            },
            {
              "label": "⾏为",
              "key": "behaviorComplex",
              "type": "composite_row",
              "children": [
                {
                  "key": "behaviorType",
                  "type": "select",
                  "props": {
                    "placeholder": "选择⾏为",
                    "searchable": true
                  }
                },
                {
                  "key": "relatedCourse",
                  "type": "select",
                  "props": {
                    "placeholder": "选择课程",
                    "options": [
                      {"label": "全部", "value": -1},
                      {"label": "课程1", "value": 1},
                      {"label": "课程2", "value": 2}
                    ]
                  }
                },
                {
                  "key": "dateRange",
                  "type": "date_range",
                  "props": {
                    "placeholder": ["开始⽇期", "结束⽇期"]
                  }
                }
              ]
            }
          ],
          // 时间轴列表配置
          "timeline": {
            "label": "⾏为时间轴",
            "key": "eventTimeline",
            "type": "timeline",
            "template": {
              "eventItem": {
                "fields": [
                  {"key": "eventId", "type": "hidden"},
                  {"key": "title", "type": "text", "style": "title"},
                  {"key": "timestamp", "type": "datetime", "format": "YYYY-MM-DD HH:mm"},
                  {"key": "trackId", "type": "text", "copyable": true},
                  {
                    "key": "tagMeta",
                    "type": "tag_group",
                    "fields": [
                      {"key": "period", "label": "期次", "type": "tag", "color": "blue"},
                      {"key": "actor", "label": "操作⼈", "type": "tag", "color": "green"},
                      {"key": "source", "label": "来源", "type": "tag", "color": "orange"}
                    ]
                  },
                  {
                    "key": "fields",
                    "type": "field_list",
                    "layout": "vertical",
                    "itemTemplate": {
                      "label": "$item.label",
                      "value": "$item.value",
                      "type": "text"
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
    // 事件时间轴列表动态读取⽅案
    // 时间轴列表动态读取⽅案 ⻅下⾯
    //课程tab和订单tab 暂不涉及动态scheme
    const res8 = {
      "events": [
        {
          "eventId": "evt_xxx",
          "title": "直播课到课",
          "timestamp": "2025-10-21 18:20",
          "trackId": "672367823478234897",
          "tagMeta": {
            "period": "250908期",
            "actor": "员⼯",
            "source": "课堂"
          },
          "fields": [
            {"label": "字段", "value": "内容内容内容内容内容"},
            {"label": "字段字段", "value": "内容内容内容内容内容"},
            {"label": "期次名称", "value": "内容内容内容"},
            {"label": "期次名称", "value": "内容内容"}
          ]
        }
      ]
    }
    this.formatData(res3)
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    formatData(res) {
      const table = [].concat(res.data.table || []).map(item => {
        item.prop = item.key;
        if (item.type) {
          item.slotName = item.type;
        }
        delete item.type;
        return item
      })
      this.pageConfigJson = res.data;
      this.pageConfigJson.table = table; // 二次格式化
    },
    getPickerOptions(list) {
      const shortcuts = list?.map(item => {
        const start = new Date();
        const end = new Date();
        if (item.value === 1) {
          end.setTime(start.getTime() - 3600 * 1000 * 24 * item.value);
        }
        return {
          text: item.label,
          onClick(picker) {
            start.setTime(start.getTime() - 3600 * 1000 * 24 * item.value);
            const startStr = formatDate(start, "00:00:00");
            const endStr = formatDate(end, "23:59:59");
            picker.$emit("pick", [startStr, endStr]);
            // picker.$emit('pick', [start, end]);
          }
        }
      });
      const pickerOptions = {
        shortcuts:shortcuts || []
      };
      return pickerOptions;
    },
    quickFilterSetValue(key, val) {
      this.pageForm = Object.assign({}, this.pageForm, {[key]: val});
    },
    handleCurrentChange(val) {
      this.$emit("pageChange", val);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit("pageChangeSize", val);
    }
  }
};
</script>
<style lang='scss' scoped>
.page-box {
  width: 100%;
  height: 100%;

  .quick-filters {
    display: flex;
  }

  .stats-region {
    .group-item {
      display: flex;
      margin-bottom: 10px;

      .item {
        display: flex;
      }
    }
  }
}
</style>
