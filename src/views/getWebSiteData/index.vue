<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2023/9/8 9:59 AM
 * @FilePath: src/views/getWebSiteData/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023/9/8 9:59 AM
-->
<template>
  <div class=""></div>
</template>

<script>
import {list} from './list';
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  computed: {},
  data() {
    return {
      treeData: []
    };
  },
  watch: {
  // temObj: {
  //   handler(newVal, oldVal) {},
  //   deep: true, // 深度
  //   immediate: true, // 立即执行
  // },
  },
  beforeCreate() {},
  created() {

  },
  beforeMount() {},
  mounted() {
    // JSON.stringify(Array.from(document.getElementsByClassName('pinpailist')).map(item => {
    //   console.log()
    //   return {
    //     id: item.getAttribute('id') || '无',
    //     name: item.innerText
    //   }
    // }))
    let obj = {
      name: '李大玄',
      age: 28,
      sex: '男'
    }
    let str = this.wri`你好, ${obj.name}, 年龄: ${obj.age}, 性别: ${obj.sex}`
    console.log(str)
  },
  methods: {
    wri(){
      // console.log(arguments);
      return arguments[1]=  '李四'
    },
    async fetchTwo() {
      this.treeData = [];
      for (let i = 0; i < list.length; i++) {
        let item = Object.assign({}, list[i], {children: []})
        // this.treeData.
        const res = await this.$viewBase.seriesListAll({brand_id: item.id})
        item.children = [].concat(res.data.list || [])
        for (let j = 0; j < item.children.length; j++) {
          const res = await this.$viewBase.modelListAll({series_id: item.children[j].series_id})
          item.children[j].children = [].concat(res.data.list || [])
        }
        this.treeData.push(item);
      }

      this.saveFile(JSON.stringify(this.treeData))
    },
    saveFile(data) {

      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = '数据.txt';
      save_link.click();
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
