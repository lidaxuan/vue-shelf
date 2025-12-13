<template>
  <EDrawerSp title="学员信息" :visible.sync="drawerVisible" class="student-info-drawer" :wrapperClosable="false" :confirm-loading="submitLoading" :size="1080" @confirm="confirm" @cancel="close">
    <div class="flex">

    <VisitorInfo :visitorData="visitorData"></VisitorInfo>
    <!-- 右侧Tab页：el-tabs -->

    <el-tabs v-model="activeTab" type="card" class="student-tabs">
      <el-tab-pane v-for="(tabConfig, tabKey) in pageConfigJson" :key="tabKey" :label="getTabLabel(tabKey)" :name="tabKey">
        <!-- 遍历Tab下的sections渲染区块 -->
        <div class="tab-section" v-for="(section, secIndex) in tabConfig.sections" :key="secIndex">
          <!-- 区块标题 -->
          <div class="section-title">
            <span class="title-text">{{ section.label }}</span>
            <el-button v-if="section.editable" type="text" size="mini" class="edit-btn">
              编辑
            </el-button>
          </div>

          <!-- 根据section.type渲染不同区块 -->
          <!--          <component :is="getSectionComponent(section.type)" :section="section" :data="tabData[tabKey][section.key]"/>-->
        </div>
      </el-tab-pane>
    </el-tabs>
    </div>

  </EDrawerSp>
</template>


<script>
import EDrawerSp from "../drawer.vue"
import VisitorInfo from "./VisitorInfo.vue"

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
      }
    };
  },
  watch: {  },
  methods: {
    confirm(){},
    close(){},
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
    // TabKey转中文标签（如tab_customer_info → 客户资料）
    getTabLabel(tabKey) {
      const labelMap = {
        tab_customer_info: "客户资料",
        tab_period_leads: "期次线索",
        tab_customer_behavior_trace: "行为轨迹"
      };
      return labelMap[tabKey] || tabKey;
    },
    // section.type映射到组件名
    getSectionComponent(type) {
      const componentMap = {
        table: "SectionTable",
        desc_panel: "SectionDescPanel",
        tags: "SectionTags",
        sop_table: "SectionSopTable"
        // 可扩展其他类型（如timeline）
      };
      return componentMap[type] || "SectionDefault";
    }
  },
  components: {
    EDrawerSp,
    VisitorInfo,
    // 1. table类型区块（一行多列）
    SectionTable: {
      props: ["section", "data"],
      template: `
        <el-form inline class="section-table">
        <el-form-item
                v-for="(item, idx) in section.items"
                :key="idx"
                :label="item.label"
                class="table-item"
        >
          <span class="item-value">{{ data[item.key] }}</span>
          <!-- 操作按钮（如copy/call） -->
          <div class="item-actions" v-if="item.props?.actions">
            <el-button
                    v-for="action in item.props.actions"
                    :key="action"
                    type="text"
                    icon="el-icon-{{action === 'copy' ? 'copy-document' : 'phone'}}"
                    size="mini"
            />
          </div>
        </el-form-item>
        </el-form>
      `
    },
    // 2. desc_panel类型区块（一行两列）
    SectionDescPanel: {
      props: ["section", "data"],
      template: `
        <el-descriptions class="section-desc" :column="2">
        <el-descriptions-item
                v-for="(item, idx) in section.items"
                :key="idx"
                :label="item.label"
        >
          {{ data[item.key] }}
        </el-descriptions-item>
        </el-descriptions>
      `
    },
    // 3. tags类型区块（标签组）
    SectionTags: {
      props: ["section", "data"],
      template: `
        <div class="section-tags">
        <el-tag
                v-for="(tag, idx) in data[section.items[0].key]"
                :key="idx"
                size="mini"
        >
          {{ tag }}
        </el-tag>
        </div>
      `
    },
    // 4. sop_table类型区块（SOP流程）
    SectionSopTable: {
      props: ["section", "data"],
      template: `
        <div class="section-sop">
        <div class="sop-item" v-for="(sop, idx) in data[section.items.key]">
          <div class="sop-icon">
            <<i :class="sop.icon"></</i>
            <span class="badge top" v-if="sop.topBadge.value" :style="{background: sop.topBadge.color}">
                {{ sop.topBadge.value }}
              </span>
            <span class="badge bottom" v-if="sop.bottomBadge.value" :style="{background: sop.bottomBadge.color}">
                {{ sop.bottomBadge.value }}
              </span>
          </div>
          <div class="sop-text">
            <div>{{ sop.sopText.value }}</div>
            <div class="sop-bottom-text">{{ sop.bottomText.value }}</div>
          </div>
          <el-button
                  v-if="sop.actionBtn"
                  :type="sop.actionBtn.type === 'edit' ? 'primary' : 'default'"
                  size="mini"
          >
            {{ sop.actionBtn.value }}
          </el-button>
        </div>
        </div>
      `
    },
    // 默认兜底组件
    SectionDefault: {
      props: ["section"],
      template: `
        <div>未实现的区块类型：{{ section.type }}</div>`
    }
  }
};
</script>
<style lang="scss" scoped>
.student-info-drawer {
  ::v-deep .el-drawer__body  .e-drawer-sp-content {

    background: linear-gradient( 180deg, #FFFAF8 0%, #F9FDFF 100%);
    background: linear-gradient( 180deg, #cec4bf 0%, #b4c3cb 100%);
    padding: 0;
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
