<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-12-03 10:38:48
 * @FilePath: /vue-shelf/src/views/regtest.vue
-->
<template>
  <div class="">"asdasd,asd,,ads"</div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      list: ['asdasd,asd,,ads', 'asdvebte，，，阿斯顿氛围，，，,,', 'ad', '我草,，', 'asd,', 'asfgrwts，', '喔喔我我', 'asdaddddd,.'],
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
  created() {
    this.test();
  },
  beforeMount() {},
  mounted() {},
  methods: {
    test() {
      let list = this.list;
      for (let i = 0; i < list.length; i++) {
        const reg = /[,，，,]{2,}/g;
        console.log(list[i], reg.test(list[i]));
      }
    },
    // :rules="[{ required: true, validator: validateKeywords, trigger: ['blur', 'change'] }]"
    validateKeywords(rule, value, callback) {
      if (!value) {
        callback(new Error('关键词不能为空'));
      } else {
        const reg = /[,，，,]{2,}/g;
        if (reg.test(value)) {
          callback(new Error('关键词中不能连续出现中英文逗号'));
        } else {
          callback();
        }
      }
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