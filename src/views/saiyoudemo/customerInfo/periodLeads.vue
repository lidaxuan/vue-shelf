<!--
 * @Description:
 * @Author: lidaxuan
 * @Date: 2025-12-13 17:55:52
 * @FilePath: src/views/saiyoudemo/customerInfo/periodLeads.vue
 * @LastEditors: lijixuan
 * @LastEditTime: 2025-12-13 17:55:52
-->
<template>
  <div class="">
    <!-- 期次选择 -->
    <div class="period-selector mb-20">
      <span class="label">期次：</span>
      <el-radio-group v-model="activePeriod">
        <el-radio label="250908">250908</el-radio>
        <el-radio label="250901">250901</el-radio>
      </el-radio-group>
    </div>

    <div class="period-leads-container  mb-20">

      <!-- 期次线索个人信息 -->
      <div class="section-card">
        <div class="section-header">
          <div>
            <span class="section-title">期次线索个人信息</span>
            <span class="clue-id">线索ID：{{ leadsData.clueId }}</span>
          </div>
          <el-button type="text" icon="el-icon-edit" class="edit-btn">编辑</el-button>
        </div>
        <!-- 个人信息表格 -->
        <TableSp :data="[leadsData.personalInfo]" tableStyle="border" size="mini" :show-header="true" class="personal-info-table" :tableColumnData="personalInfoColumns">
          <!-- 手机号列插槽 -->
          <template #phone="{ row }">
            <div class="phone-cell">
              {{ row.phone }}
              <el-button type="text" icon="el-icon-phone" class="phone-btn"/>
            </div>
          </template>
        </TableSp>
      </div>

      <!-- 活跃行为 -->
      <div class="section-card">
        <div class="section-header">
          <span class="section-title">活跃行为</span>
        </div>
        <div class="behavior-tags">
          <el-tag v-for="(tag, idx) in leadsData.activeBehaviors" :key="idx" size="mini" :type="tag.type">
            <i :class="tag.icon" class="tag-icon"></i>
            {{ tag.label }}
            <span v-if="tag.count" class="tag-count">x{{ tag.count }}</span>
          </el-tag>
        </div>
      </div>

      <!-- SOP流程 -->
      <div class="section-card">
        <div class="sop-container">
          <div class="sop-item" v-for="(item, idx) in leadsData.sopList" :key="idx">
            <!-- 图标+角标 -->
            <div class="sop-icon-wrapper">
              <div class="sop-icon" :class="item.status">
                <i :class="item.icon" class="icon-inner"></i>
                <span v-if="item.badge" class="sop-badge" :style="{background: item.badge.color}">
                      {{ item.badge.value }}
                    </span>
              </div>
              <!-- 连接线（除最后一个） -->
              <div class="sop-line" v-if="idx < leadsData.sopList.length - 1"></div>
            </div>
            <!-- 文本+操作 -->
            <div class="sop-content">
              <div class="sop-title">{{ item.title }}</div>
              <div class="sop-status">{{ item.statusText }}</div>
              <el-button v-if="item.action" type="text" size="mini" class="sop-action-btn">{{ item.action }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="premium-order-container mb-20">
      <div class="section-header">
        <span class="section-title">正价课订单</span>
        <el-button type="text" icon="el-icon-arrow-down" class="collapse-btn" />
      </div>

      <TableSp :data="orderData" tableStyle="border" size="mini" class="order-table" :tableColumnData="orderColumns">
        <!-- 期次列 -->
        <template #period="{ row }">
          <span>{{ row.period }}</span>
        </template>

        <!-- 商品名称列 -->
        <template #goodsName="{ row }">
          <div class="goods-name">
            <div class="goods-placeholder"></div>
            <div class="goods-text">{{ row.goodsName }}</div>
          </div>
        </template>

        <!-- 订单状态/订单号/考期确认列 -->
        <template #orderInfo="{ row }">
          <div class="order-info-group">
            <el-tag :type="row.orderStatusTagType" size="mini">{{ row.orderStatus }}</el-tag>
            <el-button v-if="row.refundBtn" type="text" size="mini" class="refund-btn">{{ row.refundBtn }}</el-button>
            <div class="order-id">ID：{{ row.orderId }}<el-button type="text" icon="el-icon-copy-document" size="mini" class="copy-btn" /></div>
            <div class="exam-status">
              {{ row.examStatus }}
              <el-button type="text" size="mini" class="exam-btn">{{ row.examBtn }}</el-button>
            </div>
          </div>
        </template>

        <!-- 金额列 -->
        <template #amount="{ row }">
          <div class="amount-group">
            <div>原价：{{ row.originalPrice }}</div>
            <div>抵扣：{{ row.discount }}</div>
            <div>实付：{{ row.paidPrice }}<span v-if="row.payBtn" class="pay-btn">{{ row.payBtn }}</span></div>
          </div>
        </template>

        <!-- 类型/购买渠道列 -->
        <template #channel="{ row }">
          <div class="channel-group">
            <div>{{ row.type }}<el-button type="text" size="mini" class="channel-btn">{{ row.typeBtn }}</el-button></div>
            <div>{{ row.channel }}</div>
          </div>
        </template>
      </TableSp>
    </div>
  </div>
</template>

<script>
import TableSp from "../components/table/main.vue";
export default {
  name:'', // Pascal命名
  mixins: [],
  components: {TableSp},
  props: {
    leadsData: {
      type: Object,
      default: () => ({})
    },
    orderData: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      activePeriod: "250908", // 默认选中期次
      orderColumns: [
        { label: "期次", prop: "period", slotName: "period", width: 80 },
        { label: "商品名称", prop: "goodsName", slotName: "goodsName", minWidth: 200 },
        { label: "订单状态/订单号/考期确认", prop: "orderInfo", slotName: "orderInfo", minWidth: 220 },
        { label: "金额", prop: "amount", slotName: "amount", minWidth: 120 },
        { label: "类型/购买渠道", prop: "channel", slotName: "channel", minWidth: 150 }
      ]
    };
  },
  computed: {},
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
  beforeCreate() {},
  created() {

  },
  beforeMount() {},
  mounted() {},
  methods: {

  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {}
};
</script>
<style lang='scss' scoped>
.mb-20 {
  margin-bottom: 20px;
}
// 期次选择
.period-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  padding: 16px;
  border-radius: 8px;

  .label {
    font-size: 14px;
    color: #666;
  }
}

.period-leads-container {
  width: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 16px;


  // 区块卡片
  .section-card {
    border: 1px solid #E8E8E8;
    border-radius: 4px;
    overflow: hidden;

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: #F8F9FA;

      .section-title {
        font-size: 14px;
        font-weight: 500;
        color: #1A2B3E;
      }

      .clue-id {
        font-size: 12px;
        color: #666;
      }

      .edit-btn {
        color: #1890FF;
        padding: 0;
      }
    }
  }

  // 个人信息表格
  .personal-info-table {
    ::v-deep .el-table__header-wrapper th {
      background: #F8F9FA;
    }

    .phone-cell {
      display: flex;
      align-items: center;
      gap: 8px;

      .phone-btn {
        color: #FF7D00;
        padding: 0;
      }
    }
  }

  // 活跃行为标签
  .behavior-tags {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    ::v-deep .el-tag {
      display: flex;
      align-items: center;
      gap: 4px;

      .tag-icon {
        font-size: 12px;
      }

      .tag-count {
        font-size: 12px;
        margin-left: 2px;
      }
    }
  }

  // SOP流程
  .sop-container {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    .sop-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 32px;
      margin-bottom: 24px;

      .sop-icon-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;

        .sop-icon {
          width: 40px;
          height: 40px;
          border-radius: 4px;
          background: #F8F9FA;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          .icon-inner {
            font-size: 20px;
            color: #999;
          }

          &.done {
            background: #E6F7FF;

            .icon-inner {
              color: #1890FF;
            }
          }
        }

        .sop-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          font-size: 12px;
          color: #fff;
          padding: 0 4px;
          border-radius: 2px;
          line-height: 16px;
        }

        .sop-line {
          width: 1px;
          height: 20px;
          background: #E8E8E8;
          margin-top: 4px;
        }
      }

      .sop-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 8px;

        .sop-title {
          font-size: 12px;
          color: #1A2B3E;
          margin-bottom: 4px;
        }

        .sop-status {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }

        .sop-action-btn {
          color: #1890FF;
          padding: 0;
          font-size: 12px;
        }
      }
    }
  }
}

.premium-order-container {
  width: 100%;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  overflow: hidden;

  // 区块头部
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #F8F9FA;
    .section-title {
      font-size: 14px;
      font-weight: 500;
      color: #1A2B3E;
    }
    .collapse-btn {
      padding: 0;
      color: #999;
    }
  }

  // 订单表格
  .order-table {
    ::v-deep .el-table__header-wrapper th {
      background: #F8F9FA;
    }

    // 商品名称列
    .goods-name {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      .goods-placeholder {
        width: 40px;
        height: 40px;
        background: #E8E8E8;
        border-radius: 4px;
      }
      .goods-text {
        font-size: 12px;
        color: #1A2B3E;
        line-height: 1.4;
      }
    }

    // 订单信息列
    .order-info-group {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      .refund-btn {
        color: #FF4D4F;
        padding: 0;
        margin-left: 8px;
      }
      .order-id {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;
        .copy-btn {
          padding: 0;
          color: #999;
        }
      }
      .exam-status {
        color: #666;
        .exam-btn {
          color: #1890FF;
          padding: 0;
          margin-left: 4px;
        }
      }
    }

    // 金额列
    .amount-group {
      font-size: 12px;
      color: #666;
      display: flex;
      flex-direction: column;
      gap: 2px;
      .pay-btn {
        color: #1890FF;
        font-size: 12px;
        margin-left: 4px;
      }
    }

    // 渠道列
    .channel-group {
      font-size: 12px;
      color: #666;
      display: flex;
      flex-direction: column;
      gap: 2px;
      .channel-btn {
        color: #1890FF;
        padding: 0;
        margin-left: 4px;
      }
    }
  }
}
</style>
