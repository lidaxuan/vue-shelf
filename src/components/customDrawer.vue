<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-03 18:19:44
 * @FilePath: /vue-shelf/src/components/customDrawer.vue
-->
<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-26 09:41:14
 * @FilePath: /textbot-web-view/src/components/customDrawer/index.vue
-->
<template>
  <!-- <div class="custom-drawer"> -->
    <Drawer
      ref="drawer"
      :visible.sync="visible"
      :with-header="withHeader"
      :wrapper-closable="wrapperClosable"
      :direction="direction"
      :size="size"
      v-bind="$attrs"
      :append-to-body="true"
    >
    <slot v-bind="$attrs"></slot>
      <div ref="close" class="close-icon" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div v-if="$slots && $slots.content" class="content hmax">
        <slot name="content"></slot>
      </div>
    </Drawer>
  <!-- </div> -->
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import { Drawer } from 'element-ui';

export default {
  name: 'ElDrawer', // Pascal命名
  inheritAttrs: false,
  mixins: [],
  components: { Drawer },
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    visibleName: String,
    direction: {
      type: String,
      default: () => 'rtl',
    },
    primaryText: {
      type: String,
      default: () => '确定',
    },
    iconFont: String,
    name: String,
    size: {
      type: String | Number,
      default: () => 500 + 'px',
    },
    withHeader: {
      type: Boolean,
      default() {
        return false;
      },
    },
    submit: {
      type: Boolean,
      default() {
        return true;
      },
    },
    wrapperClosable: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    // this.$nextTick(() => {
    //   // const width = document.getElementsByClassName('el-drawer')[0].style.width;
    //   if (this.direction == 'rtl') {
    //     this.$refs.close.style.left = '-30px';
    //   } else if (this.direction == 'ltr') {
    //     const dom = this.$refs.close;
    //     dom.style.right = '-30px';
    //     dom.style.transform = 'rotate(180deg)';
    //   }
    // });
  },
  methods: {
    close() {
      this.$parent.$parent[this.visibleName] = false;
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
// .custom-drawer {
  ::v-deep .el-drawer {
    overflow: inherit;
  }
  // ::v-deep .el-drawer__body {
  //   height: 100%;
  // }
  .content {
    height: 100%;
    overflow: auto;
    margin-bottom: 80px;
    z-index: 9999999;
  }
  .close-icon {
    position: absolute;
    top: 30%;
    width: 30px;
    height: 30px;
    background: #409eff;
    border-radius: 5px 0px 0px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    z-index: 99;
  }
// }
</style>