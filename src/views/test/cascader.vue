<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-12-10 17:12:01
 * @FilePath: /vue-shelf/src/views/test/cascader.vue
-->
<template>
  <div class="hmax flex flex-aic flex-ccc">
    {{ asdasdasd }}****

    <customCas v-model="asdasdasd" label="匹配次数" :secondOptions="options" suffix="条"></customCas>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import customCas from '@/components/cascader.vue';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    customCas,
  },
  props: {},
  data() {
    return {
      asdasdasd: '',
      options: [
        {
          value: '2',
          label: '大于',
          // children: [{ value: 'kekong', label: '可控' }],
        },
        {
          value: '3',
          label: '小于',
          // children: [{ value: 'dingbudaohang', label: '顶部导航' }],
        },
      ],
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
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
