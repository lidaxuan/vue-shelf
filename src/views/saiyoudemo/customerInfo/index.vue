<template>
  <EDrawerSp title="学员信息" :visible.sync="drawerVisible" class="student-info-drawer" :wrapperClosable="false" :confirm-loading="submitLoading" :size="1080" @confirm="confirm" @cancel="close">
    <div class="flex" style="align-items: start">

      <VisitorInfo :visitorData="visitorData"></VisitorInfo>
      <!-- 右侧Tab页：el-tabs -->
      <div class="left">
        <Tabs class="mb-20"></Tabs>


        <PeriodLeads :orderData="orderData" :leadsData="leadsData"></PeriodLeads>
      </div>
      <!--    <el-tabs v-model="activeTab" type="card" class="student-tabs">
            <el-tab-pane v-for="(tabConfig, tabKey) in pageConfigJson" :key="tabKey" :label="getTabLabel(tabKey)" :name="tabKey">
              <div class="tab-section" v-for="(section, secIndex) in tabConfig.sections" :key="secIndex">
                <div class="section-title">
                  <span class="title-text">{{ section.label }}</span>
                  <el-button v-if="section.editable" type="text" size="mini" class="edit-btn">
                    编辑
                  </el-button>
                </div>

                          <component :is="getSectionComponent(section.type)" :section="section" :data="tabData[tabKey][section.key]"/>
              </div>
            </el-tab-pane>
          </el-tabs>-->
    </div>

  </EDrawerSp>
</template>


<script>
import EDrawerSp from "../components/Drawer.vue"
import VisitorInfo from "./VisitorInfo.vue"
import Tabs from "../Tabs.vue";
import TableSp from "../components/table/main.vue";
import PeriodLeads from "./periodLeads.vue";
export default {
  name: "StudentInfoDrawer",
  props: {
    tabData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      personalInfoColumns: [
        {label: "学员名", prop: "studentName"},
        {label: "手机号", prop: "phone", slotName: "phone", align: "center", width: 140},
        {label: "年龄", prop: "age", align: "center"},
        {label: "学历", prop: "edu", align: "center"},
        {label: "省市", prop: "city", align: "center"}
      ],
      orderData: [
        {
          period: "250908",
          goodsName: "商品名称商品名称商品商品名称商品商品商品名称商品商品商",
          orderStatus: "已支付",
          orderStatusTagType: "success",
          refundBtn: "去退费",
          orderId: "672367823478234897",
          examStatus: "考期未确认",
          examBtn: "去填写",
          originalPrice: "199.0",
          discount: "199.0",
          paidPrice: "199.0",
          payBtn: "(去支付)",
          type: "代金券",
          typeBtn: "使用信息",
          channel: "企微发送"
        },
        {
          period: "250908",
          goodsName: "商品名称商品名称商品商品名称商品商品商品名称商品商品商",
          orderStatus: "未支付",
          orderStatusTagType: "danger",
          refundBtn: "",
          orderId: "672367823478234897",
          examStatus: "考期已确认",
          examBtn: "查看填写",
          originalPrice: "199.0",
          discount: "199.0",
          paidPrice: "-",
          payBtn: "",
          type: "代金券",
          typeBtn: "可用商品",
          channel: "企微发送"
        }
      ],
      pageConfigJson: {},
      activeTab: '',
      drawerVisible: false,
      submitLoading: false,
      visitorData: {
        avatar: "https://kcall-test-oss.oss-cn-beijing.aliyuncs.com/material/1/2025/8/20/ba0610ec505a489c9074e5e7001c9dc2.jpg", // 头像
        name: "王二麻子王二麻子王二麻子",
        status: "超过30日未活跃",
        tags: ["邯郸", "初中", "未提及顾虑", "孩子妈妈"],
        consultProject: "项目名称项目名称项目",
        customerId: "672367823478234897",
        phone: "13366054407",
        basicInfo: ["19岁", "高中及以下", "新疆-克孜勒苏河"],
        wechatNickname: "杨一一情一情一情杨一一情一情一情",
        wechatRemark: "杨一一情",
        follower: "宋世杰",
        wechatStatus: "2/8 观",
        groupStatus: "2/8 观"
      },
      leadsData: {
        clueId: "672367823478234897",
        personalInfo: {
          studentName: "解秀轩",
          phone: "13366054407",
          age: 26,
          edu: "本科",
          city: "河北省邯郸市"
        },
        activeBehaviors: [
          {icon: "el-icon-s-tools", label: "视频小店退订单", type: "info"},
          {icon: "el-icon-s-order", label: "抖店订单", type: "primary"},
          {icon: "el-icon-user", label: "添加企微", type: "default"},
          {icon: "el-icon-document", label: "表单提交", type: "warning", count: 2},
          {icon: "el-icon-s-order", label: "抖店订单", type: "primary"},
          {icon: "el-icon-user", label: "添加企微", type: "default"}
        ],
        sopList: [
          {icon: "el-icon-s-shop", title: "客留订单", statusText: "已付款", action: "查看", status: "done", badge: {value: "2", color: "#FF7D00"}},
          {icon: "el-icon-user", title: "陈浩", statusText: "未加微", action: "", badge: {value: "1", color: "#FF4D4F"}},
          {icon: "el-icon-s-tools", title: "未邮寄", statusText: "", action: "编辑"},
          {icon: "el-icon-s-tools", title: "未进群", statusText: "", action: "编辑"},
          {icon: "el-icon-s-tools", title: "未聊完", statusText: "", action: "编辑"},
          {icon: "el-icon-s-tools", title: "课程开通", statusText: "未开通", action: "编辑"},
          {icon: "el-icon-s-tools", title: "课验验证", statusText: "未登录", action: ""},
          {icon: "el-icon-s-tools", title: "预报名", statusText: "", action: "查看"},
          {icon: "el-icon-s-tools", title: "代金券", statusText: "", action: ""},
          {icon: "el-icon-s-tools", title: "正价课", statusText: "", action: ""},
          {icon: "el-icon-s-tools", title: "Day1", statusText: "未开课", action: "发送"},
          {icon: "el-icon-s-tools", title: "Day2", statusText: "未到课", action: "发送"},
          {icon: "el-icon-s-tools", title: "Day3", statusText: "78m", action: "查看", badge: {value: "2", color: "#1890FF"}}
        ]
      }
    };
  },
  watch: {},
  methods: {
    confirm() {
    },
    close() {
    },
    open() {
      this.drawerVisible = true;
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
      this.pageConfigJson = res7.tabs;
      this.activeTab = res7.tabs['tab_customer_info']
    },

  },
  components: {
    TableSp,
    PeriodLeads,
    EDrawerSp,
    VisitorInfo, Tabs,

  }
};
</script>
<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}

.student-info-drawer {
  ::v-deep .el-drawer__body .e-drawer-sp-content {
    background: linear-gradient(180deg, #FFFAF8 0%, #F9FDFF 100%);
    background: linear-gradient(180deg, #cec4bf 0%, #b4c3cb 100%);
    padding: 0;
  }

  .left {
    width: 0;
    flex: 1;
    padding: 16px 16px 16px 0;
  }

  .student-tabs {
    ::v-deep .el-tabs__content {
      padding-top: 16px;
    }
  }

  // 区块通用样式
  .tab-section {
    margin-bottom: 24px;
    border: 1px solid #F4F5F8;
    border-radius: 4px;
    overflow: hidden;

    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #F4F5F8;
      font-weight: 500;

      .edit-btn {
        color: #1890FF;
        padding: 0;
      }
    }
  }

  // Table类型区块
  .section-table {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px 24px;

    .table-item {
      margin-bottom: 0;

      .el-form-item__label {
        min-width: 80px;
        color: #666;
      }

      .item-value {
        margin-right: 8px;
      }

      .item-actions {
        display: inline-block;
      }
    }
  }

  // DescPanel类型区块
  .section-desc {
    padding: 16px;

    ::v-deep .el-descriptions__label {
      color: #666;
    }
  }

  // Tags类型区块
  .section-tags {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  // SOP类型区块
  .section-sop {
    padding: 16px;

    .sop-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;

      .sop-icon {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        background: #F4F5F8;
        display: flex;
        align-items: center;
        justify-content: center;

        .badge {
          position: absolute;
          font-size: 12px;
          color: #fff;
          padding: 0 4px;
          border-radius: 2px;
          line-height: 16px;
          top: -4px;
          right: -4px;

          &.bottom {
            top: auto;
            bottom: -4px;
          }
        }
      }
    }
  }
}
</style>
