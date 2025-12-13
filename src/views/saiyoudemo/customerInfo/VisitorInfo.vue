<template>
  <div class="visitor-info-container">
    <div class="top-info">
      <div class="top-section">
        <img :src="visitorData.avatar" class="avatar" alt="访客头像"/>
        <div class="name-group">
          <div class="name">{{ visitorData.name }}</div>
          <div class="status-tag">{{ visitorData.status }}</div>
        </div>
      </div>

      <div class="tags-group">
        <el-tag size="mini" v-for="tag in visitorData.tags" :key="tag">{{ tag }}</el-tag>
        <el-button type="text" icon="el-icon-edit" size="mini" class="tags-edit-btn"/>
      </div>
    </div>

    <!-- 信息列表 -->
    <div class="info-list">
      <!-- 客户咨询项目 -->
      <div class="info-item">
        <span class="label">客户咨询项目</span>
        <div class="value-group">
          <span class="value">{{ visitorData.consultProject }}</span>
          <el-button type="text" icon="el-icon-setting" size="mini" class="item-edit-btn"/>
        </div>
      </div>

      <!-- 客户ID -->
      <div class="info-item">
        <span class="label">客户ID</span>
        <div class="value-group">
          <span class="value">{{ visitorData.customerId }}</span>
          <el-button type="text" icon="el-icon-copy-document" size="mini" class="item-action-btn"/>
        </div>
      </div>

      <!-- 手机号 -->
      <div class="info-item">
        <span class="label">手机号</span>
        <div class="value-group">
          <span class="value">{{ visitorData.phone }}</span>
          <el-button type="text" icon="el-icon-copy-document" size="mini" class="item-action-btn"/>
          <el-button type="text" icon="el-icon-phone" size="mini" class="item-action-btn"/>
        </div>
      </div>

      <!-- 基础信息 -->
      <div class="info-item">
        <span class="label">基础信息</span>
        <span class="value">{{ visitorData.basicInfo.join(' ') }}</span>
      </div>

      <!-- 微信昵称 -->
      <div class="info-item">
        <span class="label">微信昵称</span>
        <span class="value">{{ visitorData.wechatNickname }}</span>
      </div>

      <!-- 微信备注名 -->
      <div class="info-item">
        <span class="label">微信备注名</span>
        <span class="value">{{ visitorData.wechatRemark }}</span>
      </div>

      <!-- 当前跟进人 -->
      <div class="info-item">
        <span class="label">当前跟进人</span>
        <span class="value">{{ visitorData.follower }}</span>
      </div>

      <!-- 加微/群聊状态 -->
      <div class="info-item">
        <span class="label">已加企微</span>
        <span class="value">{{ visitorData.wechatStatus }}</span>
        <span class="label ml-20">所在群聊</span>
        <span class="value">{{ visitorData.groupStatus }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisitorInfo",
  props: {
    // 访客信息数据
    visitorData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" scoped>
.visitor-info-container {
  width: 280px;

  padding: 16px;
  border-radius: 4px;

  .top-info {
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;

    .top-section {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;

      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        object-fit: cover;
      }

      .name-group {
        .name {
          font-size: 16px;
          font-weight: 500;
          color: #1A2B3E;
        }

        .sub-name {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }

        .status-tag {
          font-size: 12px;
          color: #999;
        }
      }
    }

    // 标签组
    .tags-group {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      transform: scale(0.8);
      transform-origin: top left;

      ::v-deep .el-tag {
      }

      .tags-edit-btn {
        padding: 0;
        color: #999;
      }
    }
  }


  // 信息列表
  .info-list {
    background: #fff;
    padding: 20px;
    border-radius: 8px;

    .info-item {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin-bottom: 16px;
      line-height: 24px;

      .label {
        font-weight: 400;
        font-size: 12px;
        color: #A7B1BC;
      }

      .value {
        font-size: 14px;
        color: #1A2B3E;
      }

      .value-group {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
      }

      .item-edit-btn, .item-action-btn {
        padding: 0;
        color: #999;
      }

      .ml-20 {
        margin-left: 20px;
      }
    }
  }
}
</style>
