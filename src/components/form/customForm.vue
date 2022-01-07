<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-12-09 14:29:17
 * @FilePath: /vue-shelf/src/components/form/customForm.vue
-->
<template>
  <div class="">
    <!-- <pre>{{ copyFormConfig }}</pre> -->
    <el-form :inline="copyFormConfig.inline" :model="copyFormConfig.model" class="demo-form-inline">
      <template v-for="(item, index) in copyFormConfig.formItem">
        <el-form-item :label="formConfig.label ? item.label : ''">
          <slot v-if="item.slotName" v-bind="item" :name="item.slotName"></slot>
          <el-input v-else v-model="model[item.model]" :placeholder="getItemPlaceholder(item)" v-bind="item"></el-input>
        </el-form-item>
      </template>

      <!-- <el-form-item label="活动区域">
        <el-select v-model="copyFormConfig.model.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {
    formConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      copyFormConfig: {
        inline: true,
        label: false,
      },
      
    };
  },
  computed: {
    diffTypePlaceholder: () => {
      return {
        input: '请输入',
        select: '请选择',
      };
    },
  },
  watch: {
    formConfig: {
      handler(newVal, oldVal) {
        this.copyFormConfig = Object.assign({}, this.copyFormConfig, newVal);
      },
      deep: true, // 深度
      immediate: true, // 立即执行
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    getItemPlaceholder(item) {
      if (item.placeholder) {
        return item.placeholder;
      }
      return `${this.diffTypePlaceholder[item.type] || ''}${item.label || ''}`;
    },
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>