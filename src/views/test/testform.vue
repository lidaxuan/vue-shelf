<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-12-09 14:28:41
 * @FilePath: /vue-shelf/src/views/testform.vue
-->
<template>
  <div class="wamx hmax" :key="Object.keys(query).join('')" v-waterMarker="query">
    <pre>{{ formConfig }}</pre>
    <hr />
    <pre> {{ model }} </pre>
    <hr />
    <customForm :formConfig="formConfig" :model="model">
      <template #asdasd="item">111{{ item }} </template>
    </customForm>
    <table></table>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

import customForm from '@/components/form/customForm.vue';

export default {
  name: '', // Pascal命名ˇ
  mixins: [],
  components: {
    customForm,
  },
  props: {},
  data() {
    return {
      query: {
        text: '李大玄你好我草的',
        size: '16px',
        color: 'red',
      },
      model: {
        name: '',
        sex: '',
      },
      formConfig: {
        inline: !false,
        label: !false,
        clearable: true,
        formItem: [
          {
            type: 'input',
            model: 'name',
            label: '姓名',
            placeholder: '请输入姓名',
          },
          {
            type: 'input',
            model: 'name',
            label: '姓名',
            // placeholder: '请输入姓名',
          },
          {
            type: 'select',
            model: 'name',
            label: '性别',
            clearable: false,
            slotName: 'asdasd',
            // placeholder: '请输入姓名',
          },
        ],
      },
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
  methods: {},
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