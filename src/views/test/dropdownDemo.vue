<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-22 17:27:53
 * @FilePath: /vue-shelf/src/views/test/dropdownDemo.vue
-->

<template>
  <div class="flex flex-aic flex-ccc hmax">
    {{ value }}
    <el-select v-model="value" v-el-select-loadmore:rangeNumber="loadMore()">
      <el-option v-for="item in getList" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>
 
<script>
import Vue from 'vue';
Vue.directive('el-select-loadmore', {
  bind(el, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
    SELECTWRAP_DOM.addEventListener('scroll', function () {
      /**
       * scrollHeight 获取元素内容高度(只读)
       * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
       * clientHeight 读取元素的可见高度(只读)
       * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
       * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
       */
      const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
      if (condition) binding.value();
    });
  }
});
export default {
  name: '',
  props: {},
  data() {
    return {
      rangeNumber: 10,
      value: 3000,
      optionList: []
    };
  },
  components: {},
  computed: {
    getList() {
      if (this.value) {
        const index = this.optionList.findIndex((item) => {
          return item.id == this.value;
        });
        console.log(this.rangeNumber , index);
        if (this.rangeNumber < index) {
          this.rangeNumber = index + 10;
        }``
      }
      console.log(this.rangeNumber);
      return this.optionList.slice(0, this.rangeNumber);
    }
  },
  created() {},
  mounted() {
    let arr = [];
    for (let i = 0; i < 5002; i++) {
      arr.push({ name: '李大玄' + i, id: i });
    }
    this.optionList = arr;
  },
  methods: {
    loadMore() {
      //n是默认初始展示的条数会在渲染的时候就可以获取,具体可以打log查看
      //if(n < 8) this.rangeNumber = 10 //elementui下拉超过7条才会出滚动条,如果初始不出滚动条无法触发loadMore方法
      return () => (this.rangeNumber += 5); //每次滚动到底部可以新增条数  可自定义
    }
  }
};
</script>
 
<style lang="scss" scoped>
.content {
  padding: 24px 24px;
  .el-input {
    width: 400px;
    margin: 20px;
  }
}
</style>