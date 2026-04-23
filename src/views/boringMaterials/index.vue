<template>
  <div class="boring-materials">
    <div class="topbar">
      <div class="topbar__left">
        <div class="brand-dot"></div>
        <div class="brand-title">呆页面</div>
        <div class="brand-sub">Placeholder UI (dumb)</div>
      </div>
      <div class="topbar__right">
        <div class="topbar__chip">时间: {{ nowText }}</div>
      </div>
    </div>

    <el-row :gutter="14" class="main">
      <el-col :span="6">
        <el-card shadow="never" class="side-card">
          <div class="side-title">固定栏(呆)</div>
          <div class="dumb-list">
            <div v-for="n in 10" :key="n" class="dumb-item">
              <div class="dumb-item__bar"></div>
              <div class="dumb-item__txt">呆呆块 #{{ n }}</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="18">
        <el-card shadow="never" class="content-card">
          <div class="canvas">
            <div class="canvas-title">呆画布</div>
            <div class="canvas-sub">先占位，不做筛选和统计</div>

            <div class="canvas-grid">
              <div v-for="n in 18" :key="n" class="canvas-tile">
                <div class="canvas-tile__bar"></div>
                <div class="canvas-tile__txt">重复行 {{ n }}</div>
              </div>
            </div>

            <div class="canvas-lines">
              <div v-for="k in 4" :key="k" class="canvas-line"></div>
            </div>
          </div>

          <div class="bottom-row">
            <el-row :gutter="14">
              <el-col :span="12">
                <el-card shadow="never" class="detail-card">
                  <div slot="header" class="detail-header">
                    <span>预览占位</span>
                    <el-tag size="mini" type="info" style="margin-left:10px;">替换成视频组件</el-tag>
                  </div>
                  <div class="detail-body">
                    <div class="fake-image"></div>
                    <div class="fake-paragraph">
                      <div class="line"></div>
                      <div class="line w90"></div>
                      <div class="line w75"></div>
                    </div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card shadow="never" class="detail-card">
                  <div slot="header" class="detail-header">
                    <span>操作区</span>
                  </div>
                  <div class="action-grid">
                    <el-button plain size="mini" disabled>取消</el-button>
                    <el-button type="primary" size="mini" disabled>保存</el-button>
                    <el-button type="success" size="mini" disabled>发布</el-button>
                  </div>
                  <div class="tips">
                    把短视频发我：我再把这里按视频的布局改成真实交互。
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
function pad2(n) {
  return n < 10 ? "0" + n : String(n);
}

export default {
  name: "boringMaterials",
  data() {
    return {
      nowText: ""
    };
  },
  created() {
    this.nowText = this.formatNow();
  },
  methods: {
    formatNow() {
      const d = new Date();
      return (
        d.getFullYear() +
        "-" +
        pad2(d.getMonth() + 1) +
        "-" +
        pad2(d.getDate()) +
        " " +
        pad2(d.getHours()) +
        ":" +
        pad2(d.getMinutes())
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.boring-materials {
  padding: 14px;
  background: #f5f7fa;
  min-height: 100vh;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 12px 14px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  margin-bottom: 14px;
}

.topbar__left {
  display: flex;
  align-items: center;
}

.brand-dot {
  width: 10px;
  height: 10px;
  background: #42b983;
  border-radius: 50%;
  margin-right: 10px;
}

.brand-title {
  font-weight: 600;
}

.brand-sub {
  margin-left: 14px;
  color: #909399;
  font-size: 12px;
}

.topbar__chip {
  background: #f0f9eb;
  color: #67c23a;
  padding: 6px 10px;
  border-radius: 16px;
  border: 1px solid #e1f3d8;
  font-size: 12px;
}

.side-card,
.content-card {
  background: #ffffff;
}

.side-title {
  font-weight: 600;
  margin-bottom: 10px;
}

.side-divider {
  height: 1px;
  background: #ebeef5;
  margin: 14px 0;
}

.poster-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.poster {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  padding: 8px;
  background: #fafafa;
}

.poster__img {
  height: 50px;
  border-radius: 4px;
  background: linear-gradient(135deg, #e6f7ff, #f0f9ff);
  margin-bottom: 8px;
  border: 1px solid #edf2f7;
}

.poster__txt {
  font-size: 12px;
  color: #606266;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.search-input {
  width: 260px;
}

.stat-row {
  margin-bottom: 14px;
}

.stat-tile {
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  background: #ffffff;
}

.stat-label {
  color: #909399;
  font-size: 12px;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  margin-top: 6px;
  color: #303133;
}

.stat-foot {
  color: #c0c4cc;
  font-size: 12px;
  margin-top: 6px;
}

.pagination-row {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.bottom-row {
  margin-top: 14px;
}

.detail-header {
  display: flex;
  align-items: center;
}

.detail-body {
  display: flex;
  gap: 12px;
  padding: 10px 0;
}

.fake-image {
  width: 140px;
  height: 90px;
  border-radius: 6px;
  background: linear-gradient(135deg, #fff1f0, #f9f9ff);
  border: 1px solid #ebeef5;
}

.fake-paragraph {
  flex: 1;
  padding-top: 8px;
}

.line {
  height: 10px;
  border-radius: 6px;
  background: #f2f2f2;
  margin-bottom: 10px;
}

.line.w90 {
  width: 90%;
}

.line.w75 {
  width: 75%;
}

.action-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 4px 0;
}

.tips {
  margin-top: 10px;
  color: #909399;
  font-size: 12px;
  line-height: 1.6;
}

.dumb-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dumb-item {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  background: #ffffff;
  padding: 10px;
}

.dumb-item__bar {
  height: 10px;
  border-radius: 6px;
  background: #f2f2f2;
  margin-bottom: 10px;
}

.dumb-item__txt {
  color: #606266;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.canvas {
  padding: 4px 4px 12px 4px;
}

.canvas-title {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 6px;
}

.canvas-sub {
  color: #909399;
  font-size: 12px;
  margin-bottom: 12px;
}

.canvas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.canvas-tile {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  padding: 10px;
  background: #fafafa;
}

.canvas-tile__bar {
  height: 10px;
  border-radius: 6px;
  background: #f2f2f2;
  margin-bottom: 10px;
}

.canvas-tile__txt {
  font-size: 12px;
  color: #606266;
}

.canvas-lines {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.canvas-line {
  height: 10px;
  border-radius: 6px;
  background: #f2f2f2;
}
</style>

