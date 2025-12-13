<template>
  <el-dialog title="线索跟进备注" :visible.sync="dialogVisible" width="500px" class="clue-follow-remark" @close="handleClose">
    <!-- 学员信息区域 -->
    <div class="student-info">
      <div class="label">学员</div>
      <img class="avatar" src="https://kcall-test-oss.oss-cn-beijing.aliyuncs.com/material/1/2025/8/20/ba0610ec505a489c9074e5e7001c9dc2.jpg" alt="学员头像"/>
      <div class="student-name">
        <span>王二麻子</span>
        <span class="wechat-tag">@微信</span>
      </div>
    </div>

    <!-- 跟进备注区域 -->
    <div class="remark-area">
      <div class="label">跟进备注</div>
      <el-input resize="none" v-model="followRemark" type="textarea" placeholder="最多可输入200个字符" maxlength="200" show-word-limit rows="4"/>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "ClueFollowRemark",
  data() {
    return {
      dialogVisible: false,
      followRemark: "" // 跟进备注内容
    };
  },
  methods: {
    open() {
      this.followRemark = ""; // 打开时清空输入
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleSave() {
      if (!this.followRemark.trim()) {
        this.$message.warning("请输入跟进备注内容");
        return;
      }
      // 触发保存事件，传递备注内容
      this.$emit("on-save", this.followRemark.trim());
      this.handleClose();
    }
  }
};
</script>

<style lang="scss" scoped>
.clue-follow-remark {
  ::v-deep .el-dialog__header {
    background: #F4F5F8;
  }

  .label {
    font-size: 14px;
    color: #666;
    width: 70px;
    text-align: right;
  }


  // 学员信息区域
  .student-info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    margin-bottom: 16px;


    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      object-fit: cover;
    }

    .student-name {
      font-size: 14px;
      color: #1A2B3E;

      .wechat-tag {
        color: #00C800; // 微信标识的绿色
        margin-left: 4px;
      }
    }
  }

  // 跟进备注区域
  .remark-area {
    display: flex;
    align-items: start;
    gap: 8px;

    ::v-deep .el-textarea {
      width: 394px;
      height: 88px;
    }
  }
}
</style>
