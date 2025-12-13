<!--
 * @Description:
 * @Author: lidaxuan
 * @Date: 2025-12-13 14:25:23
 * @FilePath: src/views/saiyoudemo/BatchWechatRemark.vue
 * @LastEditors: lijixuan
 * @LastEditTime: 2025-12-13 14:25:23
-->
<template>
  <el-dialog title="批量改微信备注" :visible.sync="dialogVisible" width="500px" class="batch-wechat-remark" @close="handleClose">
    <div class="remark-container">
      <div class="input-group">
        <el-input v-model="inputContent" placeholder="请输入">
          <div slot="suffix" class="current-btn">当前微信备注名</div>
        </el-input>
      </div>
      <div class="tips-text">
        在当前学员的微信备注名前，增加本次输入的内容，备注最大20字超出会被截断
      </div>
    </div>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "BatchWechatRemark",
  props: {
  },
  data() {
    return {
      inputContent: "", // 输入的备注内容
      dialogVisible: false
    };
  },
  computed: {},
  methods: {
    open() {
      this.inputContent = ""; // 关闭时清空输入
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleSave() {
      if (!this.inputContent.trim()) {
        this.$message.warning("请输入要添加的备注内容");
        return;
      }
      // 触发保存事件，传递输入内容
      this.$emit("on-save", this.inputContent.trim());
      this.handleClose();
    },
  },
};
</script>

<style lang="scss" scoped>
.batch-wechat-remark {
  ::v-deep .el-dialog__header {
    background: #F4F5F8;
  }

  .remark-container {
    padding: 10px 0;

    .input-group {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;

      ::v-deep .el-input__suffix {
        right: 0;
      }

      .current-btn {
        width: 120px; // 按钮固定宽度
        height: 32px; // 与输入框高度一致
        line-height: 34px; // 与输入框高度一致
        background: #F2F2F2;
        border-radius: 0px 4px 4px 0px;
        font-weight: 500;
        font-size: 14px;
        color: #1A2B3E;
      }
    }

    .tips-text {
      font-size: 12px;
      color: #666;
      line-height: 1.5;
    }
  }
}
</style>
