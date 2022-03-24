<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-22 17:27:53
 * @FilePath: /vue-shelf/src/components/select/index.vue
-->

<template>
  <div>
    {{getList()}}
    <Select :value="value" @change="selectChange" @input="onChange" v-bind="$attrs" v-el-select-loadmore:rangeNumber="loadMore()">
      <template v-for="(item, index) in getList()">
        <slot v-bind="item" name="option"></slot>
      </template>
    </Select>
  </div>
</template>
 
<script>
import Vue from 'vue';
import { Select } from 'element-ui';
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
  name: 'ElSelect',
  props: {
    value: {
      type: [String, Number, Array]
    },
    list: Array
  },
  data() {
    return {
      rangeNumber: 10
    };
  },
  components: {
    Select
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      console.log(this.$scopedSlots.option());
    });
  },
  methods: {
    getList() {
      return this.list.slice(0, this.rangeNumber);
    },
    loadMore() {
      //n是默认初始展示的条数会在渲染的时候就可以获取,具体可以打log查看
      //if(n < 8) this.rangeNumber = 10 //elementui下拉超过7条才会出滚动条,如果初始不出滚动条无法触发loadMore方法
      return () => (this.rangeNumber += 5); //每次滚动到底部可以新增条数  可自定义
    },
    onChange(val) {
      // if (_.isArray(val) && !val.length) {
      //   val = '';
      // }
      this.$emit('input', val);
    },
    selectChange(val) {
      this.$emit('change', val);
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