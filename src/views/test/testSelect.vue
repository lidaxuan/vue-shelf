<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-07-15 14:03:05
 * @FilePath: /vue-shelf/src/views/test/testSelect.vue
-->

<template>
  <div class="">
    <div font="26">{{ form }}</div>
    <el-card>
      <el-select v-model="form.val1" placeholder="请选择" @change="val1Change" class="w300">
        <el-option v-for="item in list1" :key="item.id" :label="item.name" :value="item.id"> </el-option>
      </el-select>
      <el-select v-model="form.val2" placeholder="请选择" class="w300">
        <el-option v-for="item in list2" :key="item.id" :label="item.name" :value="item.id"> </el-option>
      </el-select>
      <el-select v-model="form.val3" placeholder="请选择" class="w300">
        <el-option v-for="item in list3" :key="item.id" :label="item.name" :value="item.id"> </el-option>
      </el-select>
      <el-select v-model="form.val4" placeholder="请选择" class="w300">
        <el-option v-for="item in list4" :key="item.id" :label="item.name" :value="item.id"> </el-option>
      </el-select>
    </el-card>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: '', // Pascal命名
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  //这里存放数据
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      form: {
        val1: '',
        val2: '',
        val3: '',
        val4: '',
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  created() {
    this.getlist(1);
    this.getlist(2);
    this.getlist(3);
    this.getlist(4);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {},
  //方法集合
  methods: {
    getlist(num) {
      let arr = [];
      for (let i = 1; i < 4; i++) {
        const obj = {
          id: i + num,
          name: `lidaxuan${i + num}`,
        };
        arr.push(obj);
      }
      this[`list${num}`] = arr;
    },
    val1Change(val) {
      this.form.val1 = val;
      this.form.val2 = '';
      this.form.val3 = '';
      this.form.val4 = '';
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