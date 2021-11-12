<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-11 14:49:20
 * @FilePath: /vue-shelf/src/views/showComponents/showdigitroll.vue
-->
<template>
  <div class="">
    <ContextMenu class="right-menu" :target="contextMenuTarget" :show="contextMenuVisible" @update:show="(show) => (contextMenuVisible = show)">
      <template slot="trigger">
        <a href="javascript:;" @click="copyMsg">复制</a>
        <a href="javascript:;" @click="quoteMsg">引用</a>
        <a href="javascript:;" @click="deleteMsg">删除</a>
      </template>
      <!-- <button slot="reference">按钮</button> -->
    </ContextMenu>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import ContextMenu from '@/components/contextMenu/index.vue';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    ContextMenu,
  },
  props: {},
  data() {
    return {
      contextMenuTarget: document.body,
      contextMenuVisible: false,
    };
  },
  computed: {},
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {
    //   },
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    copyMsg() {
      alert('copy');
      this.contextMenuVisible = false;
    },
    quoteMsg() {
      alert('quote');
      this.contextMenuVisible = false;
    },
    deleteMsg() {
      alert('delete');
      this.contextMenuVisible = false;
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
//@import url(); 引入公共css类\

body {
  height: 100%;
  font-size: 14px;
}
#app {
  font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}

a {
  color: #333;
}

.right-menu a {
  width: 75px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  display: block;
  color: #1a1a1a;
}
.right-menu a:hover {
  background: #eee;
  color: #fff;
}
html,
body {
  height: 100%;
}
.right-menu {
  border: 1px solid #eee;
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
  border-radius: 1px;
}
a {
  text-decoration: none;
}
.right-menu a {
  padding: 2px;
}
.right-menu a:hover {
  background: #42b983;
}
</style>