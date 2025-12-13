<template>
  <div class="page-box">
    <div class="left-class-list" :style="`width: ${classListFoldFlag ? '230px' : '120px'}`">
      <div v-if="classListFoldFlag" class="search-box">
        <el-input placeholder="请输入期次名称" v-model="searchStr" suffix-icon="el-icon-search"></el-input>
      </div>

      <div class="class-list" v-if="classListFoldFlag">

        <div v-for="(item, index) in classList" :key="index" class="item" @click="selectClass(item)" :class="{active:selectClassInfo.id == item.id}">
          <div class="title-box">
            <div class="tag" :class="{light: item.type == 1, gray: item.type == 3,default: item.type==2}">{{ item.aaaaaaa }}</div>
            <div class="title">{{ item.bbbbbbb }}</div>
          </div>
          <div class="teacher">{{ item.ccccccc }}</div>
          <div class="info-desc">
            <div class="label">开课时间</div>
            <div class="val">{{ item.ddddddd }}</div>
          </div>
          <div class="info-desc">
            <div class="label">统计结束</div>
            <div class="val">{{ item.eeeeeee }}</div>
          </div>
          <div class="info-desc">
            <div class="label">课程数量</div>
            <div class="val">{{ item.fffffff }}</div>
          </div>

          <div class="bottom-btns">
            <div class="btn">查看直播</div>
            <div class="btn">查看教程</div>
          </div>
        </div>
      </div>

      <div v-else class="selectItemFold">
        <div class="top">
          <div class="tag" :class="{light: selectClassInfo.type == 1, gray: selectClassInfo.type == 3,default: selectClassInfo.type==2}">{{ selectClassInfo.aaaaaaa }}</div>
          <div class="title">20250845</div>
        </div>
        <div class="bottom-btns">
          <div class="btn">查看直播</div>
          <div class="btn">查看教程</div>
        </div>
      </div>
      <i class="el-icon-s-fold fold" :class="{'is-reverse': !classListFoldFlag}" @click="classListFoldFlag = !classListFoldFlag"></i>
    </div>

    <div class="right-box">
      <Collapse class="search-area" :height="clientHeightForSearch" :cheight="'60px'">
        <template #top>
          <div class="quick-filters">
            <div v-for="(item, index) in pageConfigJson.quickFilters" :key="index">
              <QuickFilter @setValue="quickFilterSetValue" :config="item" :key="index"></QuickFilter>
            </div>
          </div>
        </template>
        <template #bottom>
          <div class="search-form">
            <el-form :inline="true" :model="pageForm" class="">
              <template v-for="(item, index1) in pageConfigJson.formFilters">
                <el-form-item :label="item.label" :key="index1">
                  <el-select v-if="item.type == 'select'" :multiple="item.porps?.multiple" v-model="pageForm[item.key]" placeholder="活动区域" size="mini">
                    <el-option v-for="(optionItem, index2) in item.props?.options" :label="optionItem.label" :value="optionItem.value" :key="index2"></el-option>
                  </el-select>
                  <el-select v-if="item.type == 'modal'" :multiple="item.porps?.multiple" v-model="pageForm[item.key]" placeholder="活动区域" size="mini">
                    <el-option v-for="(optionItem, index2) in item.props?.options" :label="optionItem.label" :value="optionItem.value" :key="index2"></el-option>
                  </el-select>
                  <el-date-picker v-if="item.type == 'date'" v-model="pageForm[item.key]" type="daterange" align="right" unlink-panels size="mini"
                                  :start-placeholder="item.props?.placeholder[0]" range-separator="至" :end-placeholder="item.props?.placeholder[1]"
                                  value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"
                                  :picker-options="getPickerOptions(item.props?.shortcuts)">
                  </el-date-picker>
                  <el-input v-if="item.type == 'input'" v-model="pageForm[item.key]" :placeholder="item.props?.placeholder" size="mini"></el-input>
                </el-form-item>
              </template>
              <div>
                <el-button>重置</el-button>
                <el-button>查询</el-button>
              </div>
            </el-form>
          </div>
        </template>
      </Collapse>
      <!--      <pre class="prebox">{{ pageConfigJson.statsRegion.groups }}</pre>-->

      <Collapse class="region-top-box" :height="clientHeightForRegion" :cheight="'60px'">
        <template #top>
          <div class="region-top-config">
            <el-checkbox-group v-model="showRegionList">
              <el-checkbox v-for="item in pageConfigJson.statsRegion?.groups" :label="item.key">{{ item.title }}</el-checkbox>
            </el-checkbox-group>
            <div class="label">统计范围:</div>
            <el-radio-group v-model="searchRang">
              <el-radio :label="1">全部数据</el-radio>
              <el-radio :label="2">跟随筛选</el-radio>
            </el-radio-group>
          </div>
        </template>
        <template #bottom>
          <div class="stats-region">
            <div v-for="groupItem in pageConfigJson.statsRegion?.groups" class="group-item" v-if="showRegionList.includes(groupItem.key)">
              <div v-for="item in groupItem.items" class="item" :class="{highlight: item.stateMap.includes('highlight')}">
                <div class="val">1111
                  <!--                  {{ item.key }}-->
                </div>
                <div class="label">
                  {{ item.label }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </Collapse>

      <div class="handle-box">
        <el-button type="primary" v-for="(item, index) in pageConfigJson.actionBtn" :key="index">{{ item.label }}</el-button>
      </div>

<!--      <el-button @click="$refs.batchWechatRemark.open()">test</el-button>-->
<!--      <el-button @click="$refs.liveRoom.open()">test</el-button>-->
<!--      <el-button @click="$refs.clueFollowRemark.open()">test</el-button>-->


      <div class="table-box">
        <TableSp height="300px" tableStyle="border" style="width: 100%" :data="tableData" header-cell-style="background:#F4F5F8;"
                 v-loading="pageLoading" :tableColumnData="tableColumnData">
          <!-- 1. 学员_线索插槽：头像+姓名@微信+编辑按钮 -->
          <template #student="{ row }">
            <div class="student-slot">
              <img :src="row.avatar" class="student-avatar" alt="头像" @click="userInfo(row)"/>
              <span class="student-name">{{ row.studentName }}<span class="wechat-tag">@微信</span></span>
              <el-button type="text" icon="el-icon-edit" size="mini" class="edit-btn"/>
            </div>
          </template>

          <!-- 2. 微信备注插槽：多行文本+编辑按钮 -->
          <template #wechatRemark="{ row }">
            <div class="remark-slot">
              <div class="remark-text">{{ row.wechatRemark }}</div>
            </div>
          </template>

          <!-- 3. 手机号插槽：带电话图标 -->
          <template #phone="{ row }">
            <div class="phone-slot">
              <span>{{ row.phone }}</span>
              <el-button type="text" icon="el-icon-phone-outline" size="mini" class="phone-icon"/>
            </div>
          </template>

          <!-- 4. 用户标签插槽：多标签 -->
          <template #userTags="{ row }">
            <div class="tags-slot">
              <el-tag size="mini" v-for="tag in row.userTags" :key="tag">{{ tag }}</el-tag>
            </div>
          </template>

          <!-- 5. 活跃行为_线索插槽：多标签+计数 -->
          <template #activeBehavior="{ row }">
            <div class="behavior-slot">
              <el-tag size="mini" type="primary" v-for="(item, idx) in row.activeBehavior" :key="idx">
                {{ item.label }}<span class="count" v-if="item.count">x{{ item.count }}</span>
              </el-tag>
            </div>
          </template>

          <!-- 6. 开通课程插槽：多标签 -->
          <template #courses="{ row }">
            <div class="courses-slot">
              <el-tag size="mini" v-for="course in row.courses" :key="course">{{ course }}</el-tag>
            </div>
          </template>

          <!-- 7. 直播到课情况插槽：多状态图标 -->
          <template #liveAttendStatus="{ row }">
            <div class="live-status-slot">
              11
            </div>
          </template>

          <!-- 8. 最近电话沟通插槽：带“查看”按钮 -->
          <template #latestCall="{ row }">
            <div class="call-slot">
              <span>{{ row.latestCall }}</span>
              <el-button type="text" size="mini" class="view-btn">查看</el-button>
            </div>
          </template>

          <!-- 9. 最近线索跟进人加微信插槽：带“查看”按钮 -->
          <template #latestWechatAdd="{ row }">
            <div class="wechat-add-slot">
              <span>{{ row.latestWechatAdd }}</span>
              <el-button type="text" size="mini" class="view-btn">查看</el-button>
            </div>
          </template>

          <!-- 10. 跟进备注_线索插槽：多行文本+编辑按钮 -->
          <template #followRemark="{ row }">
            <div class="follow-remark-slot">
              <div class="remark-text">{{ row.followRemark }}</div>
              <el-button type="text" icon="el-icon-edit" size="mini" class="edit-btn"/>
            </div>
          </template>
        </TableSp>

        <Pagination layout="total,sizes,prev, pager, next,jumper" :page="page"
                    @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </Pagination>
      </div>
    </div>

    <CustomerInfo ref="customerInfo"></CustomerInfo>
    <BatchWechatRemark ref="batchWechatRemark"></BatchWechatRemark>
    <LiveRoom ref="liveRoom"></LiveRoom>
    <ClueFollowRemark ref="clueFollowRemark"></ClueFollowRemark>
  </div>
</template>

<script>
import Pagination from "./pagination.vue";
import Profile from "./profile.vue";
import TableSp from "./components/table/main.vue";
import QuickFilter from "./quickFilter.vue";
import CustomerInfo from "./customerInfo/index.vue";
import Collapse from "./components/Collapse.vue";
import BatchWechatRemark from "./BatchWechatRemark.vue";
import LiveRoom from "./LiveRoom.vue";
import ClueFollowRemark from "./ClueFollowRemark.vue";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date, time) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d} ${time}`;
}

const tableColumnData = [
  {type: "selection", width: 50},
  {label: "学员_线索", prop: "student", slotName: "student"},
  {label: "微信备注", prop: "wechatRemark", slotName: "wechatRemark"},
  {label: "手机号", prop: "phone", slotName: "phone"},
  {label: "用户标签", prop: "userTags", slotName: "userTags"},
  {label: "活跃行为_线索", prop: "activeBehavior", slotName: "activeBehavior"},
  {label: "最近活跃时间", prop: "latestActiveTime", sortable: true},
  {label: "客户意向分(采深)", prop: "intentionScore", sortable: true},
  {label: "跟进备注_线索", prop: "followRemark", slotName: "followRemark"},
  {label: "微信昵称", prop: "wechatNickname"},
  {label: "年龄_线索", prop: "age"},
  {label: "省市_线索", prop: "provinceCity"},
  {label: "学历_线索", prop: "education"},
  {label: "开通课程", prop: "courses", slotName: "courses"},
  {label: "邮寄情况", prop: "mailStatus"},
  {label: "聊完情况", prop: "chatStatus"},
  {label: "进群情况(顾问)", prop: "groupStatus"},
  {label: "考期确认", prop: "examStatus"},
  {label: "直播到课情况", prop: "liveAttendStatus", slotName: "liveAttendStatus"},
  {label: "直播类直播观看时长", prop: "liveWatchDuration", sortable: true},
  {label: "直播类观看时长", prop: "liveTotalDuration", sortable: true},
  {label: "进量数量", prop: "leadCount"},
  {label: "复购校验", prop: "repurchaseCheck"},
  {label: "进线来源", prop: "leadSource"},
  {label: "分配时间", prop: "assignTime"},
  {label: "线索类型", prop: "leadType"},
  {label: "线索跟进人", prop: "follower"},
  {label: "线索跟进人部门", prop: "followerDept"},
  {label: "线索跟进人加微", prop: "isWechatAdded"},
  {label: "线索加微时间", prop: "wechatAddTime"},
  {label: "当前跟进人", prop: "currentFollower"},
  {label: "最近电话沟通", prop: "latestCall", slotName: "latestCall"},
  {label: "最近线索跟进人加微信", prop: "latestWechatAdd", slotName: "latestWechatAdd"}
]

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    Collapse,
    TableSp,
    Pagination,
    Profile,
    QuickFilter,
    CustomerInfo,
    LiveRoom,
    BatchWechatRemark,
    ClueFollowRemark,
  },
  computed: {
    capitalizeFirstLetter: () => capitalizeFirstLetter,
    tableColumnData: () => tableColumnData,
  },
  props: {},
  data() {
    return {
      searchStr: '',
      classListFoldFlag: true,
      selectClassInfo: {},
      clientHeightForSearch: '',
      clientHeightForRegion: '',
      searchRang: 1,
      showRegionList: [],
      classList: [
        {
          aaaaaaa: "当期",
          bbbbbbb: "251208期家庭教育指导三天入门训练营",
          ccccccc: "家庭指导师",
          ddddddd: "2025-09-30 19:00",
          eeeeeee: "2025-09-30 19:00",
          fffffff: "2",
          type: 1,
          id: 1,
        },
        {
          aaaaaaa: "当期",
          bbbbbbb: "251208期家庭教育指导三天入门训练营",
          ccccccc: "家庭指导师",
          ddddddd: "2025-09-30 19:00",
          eeeeeee: "2025-09-30 19:00",
          fffffff: "2",
          type: 2,
          id: 2,
        },
        {
          aaaaaaa: "当期",
          bbbbbbb: "251208期家庭教育指导三天入门训练营",
          ccccccc: "家庭指导师",
          ddddddd: "2025-09-30 19:00",
          eeeeeee: "2025-09-30 19:00",
          fffffff: "2",
          type: 3,
          id: 3,
        }
      ],
      pageLoading: false,
      pageForm: {},
      pageConfigJson: {},
      tableData: [],
      page: {
        total: 0,
        pageSize: 10,
        page: 1,
      },
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
    this.tableData = [  {
      checked: false,
      avatar: "https://kcall-test-oss.oss-cn-beijing.aliyuncs.com/material/1/2025/8/20/ba0610ec505a489c9074e5e7001c9dc2.jpg", // 头像占位图
      studentName: "王二麻子",
      student: "王二麻子@微信", // 对应prop: "student"
      wechatRemark: "该学员意向较高，计划报名家庭教育指导师课程，需重点跟进",
      phone: "13800138000",
      userTags: ["高意向", "家庭教育", "新客"],
      activeBehavior: [
        { label: "浏览课程详情", count: 5 },
        { label: "咨询课程价格", count: 2 },
        { label: "观看直播回放", count: 3 }
      ],
      latestActiveTime: "2025-12-12 19:30:00",
      intentionScore: 95,
      followRemark: "12.12跟进：学员表示本周内会确定报名，需提醒优惠活动截止时间",
      wechatNickname: "王麻子-家庭教育",
      age: 35,
      provinceCity: "北京市朝阳区",
      education: "本科",
      courses: ["家庭教育三天入门训练营", "亲子沟通技巧课"],
      mailStatus: "未邮寄",
      chatStatus: "未聊完",
      groupStatus: "已进群",
      examStatus: "未确认",
      liveAttendStatus: [
        { type: "success", icon: "✓" }, // 已到课
        { type: "fail", icon: "✗" }, // 未到课
        { type: "success", icon: "✓" } // 已到课
      ],
      liveWatchDuration: "120分钟",
      liveTotalDuration: "360分钟",
      leadCount: 3,
      repurchaseCheck: "非复购",
      leadSource: "抖音广告",
      assignTime: "2025-12-01 10:00:00",
      leadType: "付费线索",
      follower: "张三",
      followerDept: "销售一部",
      isWechatAdded: "已加微",
      wechatAddTime: "2025-12-01 14:30:00",
      currentFollower: "李四",
      latestCall: "2025-12-11 15:20:00",
      latestWechatAdd: "2025-12-01 14:30:00"
    }];
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
                {"label": "学员名", "key": "nickName", "type": "text"},
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
    // const info = {
    //   [Symbol("a")]:"b"
    // }
    // console.log(info)
    // console.log(Object.keys(info))
    setTimeout(() => {
      this.clientHeightForSearch = document.getElementsByClassName("search-area")[0].clientHeight + 'px';
      this.clientHeightForRegion = document.getElementsByClassName("region-top-box")[0].clientHeight + 'px';
    }, 1000)
  },
  methods: {
    userInfo(row){
      this.$refs.customerInfo.open();
    },

    selectClass(item) {
      this.selectClassInfo = structuredClone(item);
    },
    formatData(res) {
      const table = [].concat(res.data.table || []).map(item => {
        item.prop = item.key;
        if (item.type) {
          item.slotName = item.type;
        }
        delete item.type;
        return item
      })
      table.unshift({type: "selection", width: 50})
      this.pageConfigJson = res.data;
      this.pageConfigJson.table = table; // 二次格式化
      this.showRegionList = [].concat(res.data.statsRegion?.groups || []).map(item => item.key)
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
        shortcuts: shortcuts || []
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
  display: flex;
  align-items: start;
  background: linear-gradient(180deg, #FFFAF8 0%, #F9FDFF 100%);
  background: linear-gradient(180deg, #f8dcd5 0%, #ccdde8 100%);
  padding: 20px;

  .search-box {
    padding: 20px 20px 20px 0;
  }

  .left-class-list {
    height: 100%;
    background: #FFF;
    box-shadow: 0px 6px 11px 0px rgba(230, 230, 230, 0.01);
    border-radius: 8px;
    padding-left: 20px;
    margin-right: 20px;
    position: relative;
    transition: all 0.3s;

    .class-list {
      height: calc(100% - 72px);
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }

      .item {
        margin-bottom: 20px;
        padding: 10px;
        width: 190px;
        //height: 143px;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #EFEFEF;

        &.active {
          background: rgba(200, 190, 255, 0.1);
          border: 1px solid #6236FF;
        }

        .title-box {
          display: flex;
          align-items: start;
          margin-bottom: 12px;


          .title {
            width: 132px;
            height: 32px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 12px;
            color: #1A2B3E;
            line-height: 16px;
            text-align: left;
            font-style: normal;
          }
        }

        .teacher {
          font-weight: 400;
          font-size: 12px;
          color: #492AFF;
          margin-bottom: 10px;
        }

        .info-desc {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .label {
            font-weight: 400;
            font-size: 12px;
            color: #A7B1BC;
            margin-right: 6px;
          }

          .val {
            font-weight: 500;
            font-size: 12px;
            color: #1A2B3E;
          }
        }

        .bottom-btns {
          display: flex;
          align-items: center;
          justify-content: space-around;

          .btn {
            font-weight: 400;
            font-size: 14px;
            color: #FF8A3D;
          }
        }
      }
    }

    .selectItemFold {
      margin-top: 20px;

      .top {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .title {
          font-weight: 500;
          font-size: 12px;
          color: #1A2B3E;
        }
      }

      .bottom-btns {
        .btn {
          font-weight: 400;
          font-size: 14px;
          color: #FF8A3D;
        }
      }
    }

    .tag {
      width: 32px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      border-radius: 4px;
      font-weight: 500;
      font-size: 10px;
      margin-right: 6px;

      &.default {
        background: #F2F2F2;
      }

      &.light {
        color: #6236FF;
        background: rgba(73, 42, 255, 0.14);
      }

      &.gray {
        color: #A7B1BC;
        background: #F2F2F2;
      }
    }

    .fold {
      position: absolute;
      bottom: 10px;
      right: 50%;
      cursor: pointer;
      transition: all 0.3s;

      &.is-reverse {
        transform: rotate(180deg);
      }
    }
  }

  .right-box {
    flex: 1 0;
    width: 0;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .search-area {
      //height: 257px;
      background: #FFF;
      box-shadow: 0px 6px 11px 0px rgba(230, 230, 230, 0.01);
      border-radius: 8px;
      margin-bottom: 20px;

      ::v-deep .top {
        border-bottom: 1px solid #F0F1F2;
      }

      .quick-filters {
        display: flex;
        align-items: center;
        padding: 20px;
        height: 60px;
      }

      ::v-deep .bottom {
        flex: 1 0;
      }

      .search-form {
        //background: pink;
        padding: 20px;

        .el-form {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .el-form-item {
          width: 24%;
          display: flex;
          margin-bottom: 10px;

          ::v-deep .el-form-item__label {
            width: 60px;
            font-weight: 400;
            font-size: 12px;
            color: #737780;
          }

          .el-form-item__content {
            width: 100%;

            & > div {
              width: calc(100% - 120px);
              width: 100%;
              width: 160px;
            }
          }
        }
      }
    }

    .region-top-box {
      background: #FFF;
      box-shadow: 0px 6px 11px 0px rgba(230, 230, 230, 0.01);
      border-radius: 8px;
      margin-bottom: 20px;

      ::v-deep .top {
        background: #F4F5F8;

        .region-top-config {
          display: flex;
          align-items: center;
          padding: 20px;
          border-radius: 4px 4px 0px 0px;

          .label {
            font-weight: 400;
            font-size: 14px;
            color: #737780;
            margin: 0 20px;
          }
        }
      }

      .stats-region {
        .group-item {
          display: flex;
          margin-bottom: 10px;

          .item {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80px;

            &.highlight {
              &:after {
                content: " ";
                display: flex;
                width: 1px;
                height: 80%;
                background: #F0F1F2;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              }
            }

            .label {
              font-weight: 400;
              font-size: 14px;
              color: #737780;
            }
          }
        }
      }
    }

    .handle-box {
      margin-bottom: 20px;
    }

    .table-box {
      width: 100%;
      background: #fff;
      border-radius: 8px;

      // 学员插槽样式
      .student-slot {
        display: flex;
        align-items: center;
        gap: 8px;
        .student-checkbox {
          width: 16px;
          height: 16px;
        }
        .student-avatar {
          width: 32px;
          height: 32px;
          border-radius: 4px;
        }
        .student-name {
          white-space: nowrap;
          .wechat-tag {
            color: #00C800;
            margin-left: 4px;
          }
        }
        .edit-btn {
          padding: 0;
          color: #666;
        }
      }

      // 备注类插槽样式
      .remark-slot, .follow-remark-slot {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        .remark-text {
          flex: 1;
          white-space: normal;
          word-break: break-all;
        }
        .edit-btn {
          padding: 0;
          color: #666;
        }
      }

      // 手机号插槽样式
      .phone-slot {
        display: flex;
        align-items: center;
        gap: 4px;
        .phone-icon {
          padding: 0;
          color: #FF7D00;
        }
      }

      // 标签类插槽样式
      .tags-slot, .behavior-slot, .courses-slot {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        .el-tag {
          margin-bottom: 4px;
        }
        .count {
          margin-left: 2px;
        }
      }

      // 直播状态插槽样式
      .live-status-slot {
        display: flex;
        gap: 4px;
        .status-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 2px;
          // 可根据type定义不同样式（示例）
          &.success {
            background: #00C800;
            color: #fff;
          }
          &.fail {
            background: #FF4D4F;
            color: #fff;
          }
        }
      }

      // 查看按钮类插槽样式
      .call-slot, .wechat-add-slot {
        display: flex;
        align-items: center;
        gap: 8px;
        .view-btn {
          padding: 0;
          color: #1890FF;
        }
      }
    }
  }
}
</style>
