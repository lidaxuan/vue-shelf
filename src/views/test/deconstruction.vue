<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-07-15 14:27:36
 * @FilePath: /vue-shelf/src/views/test/deconstruction.vue
-->
<template>
  <div class="">
    <el-card>
      <pre>
        {{a}}
      </pre>
    </el-card>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import safeSet from '@lijixuan/safe-set';
import safeGet from '@lijixuan/safe-get';
export default {
  name: '', // Pascal命名
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  //这里存放数据
  data() {
    return {
      a: {
        b: {
          c: {
            d: [{}, {}, {
              e: '我是李大玄'
            }]
          }
        }
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
    this.test();
    const data = safeGet(this.a, `b.c[d][2].e[${this.name}]`);
    console.log(data);
    safeSet(this.a, 'b.z.d[2].e', '八嘎1111')
    const newName = safeGet(this.a, 'b.c[d][2].e');
    console.log(newName);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {},
  //方法集合
  methods: {
    fetchData() {
      return new Promise((resolve, reject) => {
        const obj = {
          data: null,
          unde: undefined,
          str: '',
          asda: void 0,
        }
        setTimeout(() => {
          resolve(obj)
        }, 500);
      })
    },





    
    async test() {
      // A variable can be assigned a default, in the case that the value unpacked from the object/array is undefined.
      let {data = [], unde = [], str = [],} = await this.fetchData();
      console.log(data, unde, str); // [] [] []  null [] ''
      data = [].concat(data || []);
      Object.assign({}, this.form)
    }
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