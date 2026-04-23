<template>
  <e-drawer-sp class="create-drawer" title="添加车型" :visible.sync="visible" :wrapperClosable="false" :size="800" append-to-body=true @close="close">
    <div class="retrieve-components flex" v-loading="loading" id="box">
      <el-form :model="queryForm" ref="queryForm" label-width="110px" label-position="top" :rules="rules">
        <el-form-item prop="cardTitle" label="配置名称">
          <el-input v-model="queryForm.cardTitle" class="w-500" placeholder="请输入"/>
        </el-form-item>

        <el-form-item prop="describe" label="渠道平台">
          <el-input v-model="queryForm.describe" class="w-500" placeholder="请输入"/>
        </el-form-item>
        <el-form-item prop="describe" label="介入方式">
          <el-input v-model="queryForm.describe" class="w-500" placeholder="请输入"/>
        </el-form-item>

        <el-form-item prop="describe" label="同步策略">
          <el-input v-model="queryForm.describe" class="w-500" placeholder="请输入"/>
        </el-form-item>

        <el-form-item prop="describe" label="标签">
          <div slot="label" style="color: #344563">
              标签
              <i class="el-icon-info"></i>
          </div>
          <el-input v-model="queryForm.describe" class="w-500" placeholder="请输入"/>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <div class="flex footer" width="100%">
        <div class="right">
          <el-button size="default" min-width @click="close">取消</el-button>
          <el-button size="default" :loading="confirmLoading" type="primary" @click="confirm">确认</el-button>
        </div>
      </div>
    </template>
  </e-drawer-sp>

</template>

<script>


export default {
  name: "CreateCar",
  data() {
    return {
      queryForm: {},
      searchVal: "",
      visible: false,
      loading: false,
      confirmLoading: false,
      dataKeyPosition: "sticky",
      searchResult: false, // 搜索是否有结果 false 有结果, true没结果
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    close() {
      this.visible = false;
    },
    async open() {
      this.loading = false;
      this.searchResult = false;
      this.visible = true;
      await this.getAddCarDictList();
    },
    // 接口请求
    async getAddCarDictList(pid = 0, depth = 1) {
      let params = {
        "aiUserId": this.$route.query.userId,
        "parentId": pid || 0,
        "depth": depth || 1,
      };
      this.loading = true;
      let res;
      try {
        res = await window.EWebPlat.platService(window.privateMessagerApiMap.eachbotKnowledgeWeb.companyGetAddCarDictList, params);
      } catch (error) {
        console.log(error);
        return;
      } finally {
        this.loading = false;
      }
      if (res.code) {
        this.$message.error(res.msg);
        return;
      }
      if (depth == 1) {
        this.treeObj = sortAlphabetically([].concat(res.data || []).reduce((pre, next) => {
          next.level = 1;
          next.leaf = false;
          pre[next.initial] = [].concat(pre[next.initial] || [], next);
          return pre;
        }, {}));

      }
      if (depth == 2) {
        return [].concat(res.data || []).map(item => {
          item.level = 2;
          item.leaf = false;
          return item;
        });
      }
      if (depth == 3) {
        return [].concat(res.data || []).map(item => {
          item.level = 3;
          item.leaf = true;
          item.disabled = item.pickOn;
          return item;
        });
      }
    },
    // 在点击确定的时候 校验
    async confirm() {
      const params = {
        carDictList: this.resultTree,
        "aiUserId": this.$route.query.userId,
      }
      let res;
      try {
        this.confirmLoading = true;
        res = await window.EWebPlat.platService(window.privateMessagerApiMap.eachbotKnowledgeWeb.companyAddCarDict, params);
        this.confirmLoading = false;
      } catch (error) {
        console.log(error);
      }
      if (res.code) {
        this.$message.error(res.msg);
        return;
      }
      this.close();
      this.$emit("loadData");
    },
  },
};
</script>

<style lang="scss" scoped>
.create-drawer {
  ::v-deep .e-drawer-sp-content {
    padding: 20px 24px;
  }

  ::v-deep .eDrawer__footer {
    width: 100%;

    .footer {
      justify-content: flex-end;

      .left {
        font-weight: 400;
        font-size: 14px;
        color: #2C3E50;
      }
    }
  }

  .tip {
    color: #7D8DBF;
    background: #F2F6FC;
    padding: 2px 10px;
    border-radius: 100px 100px 100px 0px;
  }

  .retrieve-components {
    width: 100%;
    height: calc(100% - 42px);
    background: #fff;
    overflow-y: auto;

  }

}

</style>
