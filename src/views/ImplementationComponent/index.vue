<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-02 15:46:23
 * @FilePath: /vue-shelf/src/views/ImplementationComponent/index.vue
-->

<template>
  <div class="p20">
    <el-button type="primary" class="mr20" @click="structCreate">创建页面</el-button>
    <el-button type="primary" class="mr20" @click="formatData">添加数据</el-button>
    <el-button type="primary" class="mr20" @click="dataQuery">删除数据</el-button>
    <hr />
    <hr />
    <hr />
    <hr />
    <hr />
    <br />
    <viewComp ref="viewComp" :structId="structId" v-if="structId">
      <template #handleBox></template>
    </viewComp>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import viewComp from './viewComp/viewComp.vue';
import config from './newPageConfig';
import { data } from './data';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: { viewComp },
  props: {},
  data() {
    return {
      structId: 18
    };
  },
  computed: {},
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {},
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    formatData() {
      const data = {
        structId: this.structId,
        attributes: []
      }
      for (let i = 0; i < data.length; i++) {
        let arr = [];
        for (const key in data[i]) {
          const obj = {
            structId: this.structId,
            mappingClassField: key,
            fieldValue: JSON.stringify(data[i][key])
          };
          arr.push(obj);
        }
        this.dataInsert(arr);
      }
    },
    async structDelete() {
      const res = await this.$structDemoClient.structDelete('', false, 11);
      console.log(res);
    },
    async getConfig() {
      const res = await this.$structDemoClient.structGet({ structId: 11 });
      console.log(res);
      this.config = Object.assign({}, res || {});
    },
    async structCreate() {
      const res = await this.$structDemoClient.structCreate(config);
      console.log(res);
    },

    async dataQuery() {
      const res = await this.$structDemoClient.dataQuery({ structId: this.structId });
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        this.dataDelete(res[i].id);
      }
    },
    async dataInsert(attributesDtos) {
      const res = await this.$structDemoClient.dataInsert({ attributesDtos });
      console.log(res);
    },
    async dataDelete(id) {
      const res = await this.$structDemoClient.dataDelete('', false, `${this.structId}/${id}`);
      console.log(res);
    }
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
