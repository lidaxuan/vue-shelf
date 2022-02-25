<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-12-10 17:12:01
 * @FilePath: /vue-shelf/src/views/test/cascader.vue
-->
<template>
  <div class="hmax">
    {{ asdasdasd }}****
    <br>
    <el-cascader v-model="asdasdasd" :options="options" :props="props"></el-cascader>
    <br>
    
    {{ options }}

    <!-- <customCas v-model="asdasdasd" label="匹配次数" :secondOptions="options" suffix="条"></customCas> -->

  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import customCas from '@/components/cascader.vue';
let list = [];

for (let a = 0; a < 3; a++) {
  let obj1 = {
    value: `第一层${a}`,
    label: `第一层${a}`,
    children: []
  };
  list.push(obj1);
  for (let b = 0; b < 10; b++) {
    let obj2 = {
      value: `第二层${a}-${b}`,
      label: `第二层${a}-${b}`,
      children: []
    };
    list[a].children.push(obj2);
    for (let c = 0; c < 10; c++) {
      let obj3 = {
        value: `第三层${a}-${b}-${c}`,
        label: `第三层${a}-${b}-${c}`,
        children: []
      };
      list[a].children[b].children.push(obj3);
      for (let d = 0; d < 10; d++) {
        let obj4 = {
          value: `第四层${a}-${b}-${c}-${d}`,
          label: `第四层${a}-${b}-${c}-${d}`,
          children: []
        };
        list[a].children[b].children[c].children.push(obj4);
        for (let e = 0; e < 5; e++) {
          let obj5 = {
            value: `第五层${a}-${b}-${c}-${d}-${e}`,
            label: `第五层${a}-${b}-${c}-${d}-${e}`,
            children: []
          };
          list[a].children[b].children[c].children[d].children.push(obj5);
        }
      }
    }
  }
}

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    customCas
  },
  props: {},
  data() {
    return {
      asdasdasd: [],
      // options: [
      //   {
      //     value: '2',
      //     label: '大于'
      //     // children: [{ value: 'kekong', label: '可控' }],
      //   },
      //   {
      //     value: '3',
      //     label: '小于'
      //     // children: [{ value: 'dingbudaohang', label: '顶部导航' }],
      //   }
      // ],
      props: { multiple: true }
    };
  },
  computed: {
    options: () => list
  },
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
  methods: {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
