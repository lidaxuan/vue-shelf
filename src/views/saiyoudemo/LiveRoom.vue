<template>
  <el-dialog title="直播间" :visible.sync="dialogVisible" width="920px" class="live-room-dialog" @close="handleClose">
    <div class="live-room-list">
      <div class="live-item" v-for="(item, index) in liveRoomList" :key="index">
        <div class="live-item-left">
          <div class="live-placeholder"></div>
        </div>
        <div class="live-item-right">
          <div class="live-tag-group">
            <el-tag size="mini" :type="item.tagType">{{ item.tagText }}</el-tag>
            <span class="live-title">{{ item.title }}</span>
          </div>
          <div class="live-meta-group">
            <el-tag size="mini" :type="item.statusType">{{ item.statusText }}</el-tag>
            <span class="live-meta">{{ item.classType }}</span>
            <span class="live-meta">{{ item.teacher }}</span>
            <span class="live-meta">{{ item.time }}</span>
            <span class="live-meta">{{ item.originCourse }}</span>

            <div class="live-operate" v-if="item.showOperate">
              <el-button type="text" size="mini" icon="el-icon-share">分享课节</el-button>
              <el-button type="text" size="mini" icon="el-icon-setting">直播中控</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "LiveRoom",
  data() {
    return {
      dialogVisible: false,
      liveRoomList: [
        {
          tagType: "primary",
          tagText: "录播直播",
          title: "家庭教育三天入门训练营-第1天",
          statusType: "success",
          statusText: "已结课",
          classType: "学员不特",
          teacher: "丁丽莹",
          time: "2025-11-01 19:00",
          originCourse: "1101期家庭教育指导三天入门训练营",
          showOperate: false
        },
        {
          tagType: "primary",
          tagText: "录播直播",
          title: "家庭教育三天入门训练营-第2天",
          statusType: "danger",
          statusText: "上课中",
          classType: "学员不特",
          teacher: "丁丽莹",
          time: "2025-11-01 19:00",
          originCourse: "1101期家庭教育指导三天入门训练营",
          showOperate: false
        },
        {
          tagType: "primary",
          tagText: "录播直播",
          title: "家庭教育三天入门训练营-第3天",
          statusType: "info",
          statusText: "未开课",
          classType: "学员不特",
          teacher: "丁丽莹",
          time: "2025-11-01 19:00",
          originCourse: "1101期家庭教育指导三天入门训练营",
          showOperate: true // 显示操作按钮
        }
      ]
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.live-room-dialog {
  ::v-deep .el-dialog__header {
    background: #F4F5F8;
  }

  .live-room-list {
    padding: 10px 0;
  }

  // 列表项
  .live-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #F2F2F2;

    &:last-child {
      border-bottom: none;
    }

    // 左侧占位图
    .live-item-left {
      margin-right: 12px;

      .live-placeholder {
        width: 160px;
        height: 90px;
        background: #E8E8E8;
        border-radius: 4px;
      }
    }

    .live-item-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .live-tag-group {
      display: flex;
      align-items: center;
      gap: 8px;

      .live-title {
        font-size: 14px;
        color: #1A2B3E;
        line-height: 20px;
      }
    }

    .live-meta-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 12px;
      color: #666;

      .live-meta {
        white-space: nowrap;
      }

      .live-operate {
        margin-left: auto;
        display: flex;
        gap: 8px;

        ::v-deep .el-button {
          padding: 0;
          color: #FF7D00;
        }
      }
    }
  }
}
</style>
