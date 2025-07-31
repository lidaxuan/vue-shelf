<template>
    <div class="role-box">
      <div v-for="item in roleList" class="role-item">
        <img :src="item.download_url" alt="">
      </div>
  </div>
</template>

<script>

export default {
  name: '',  // Pascal命名
  mixins: [],
  components: {},
  props: {},
  //import引入的组件需要注入到对象中才能使用
  //这里存放数据
  data() {
    return {
      roleList: [
        {"id": "10", "author": "Paul Jarvis", "width": 2500, "height": 1667, "url": "https://unsplash.com/photos/6J--NXulQCs", "download_url": "https://picsum.photos/id/10/2500/1667"},
        {"id": "11", "author": "Paul Jarvis", "width": 2500, "height": 1667, "url": "https://unsplash.com/photos/Cm7oKel-X2Q", "download_url": "https://picsum.photos/id/11/2500/1667"},
        {"id": "12", "author": "Paul Jarvis", "width": 2500, "height": 1667, "url": "https://unsplash.com/photos/I_9ILwtsl_k", "download_url": "https://picsum.photos/id/12/2500/1667"},
        {"id": "13", "author": "Paul Jarvis", "width": 2500, "height": 1667, "url": "https://unsplash.com/photos/3MtiSMdnoCo", "download_url": "https://picsum.photos/id/13/2500/1667"},
        {"id": "14", "author": "Paul Jarvis", "width": 2500, "height": 1667, "url": "https://unsplash.com/photos/IQ1kOQTJrOQ", "download_url": "https://picsum.photos/id/14/2500/1667"},
        {"id": "15", "author": "Paul Jarvis", "width": 2500, "height": 1667, "url": "https://unsplash.com/photos/NYDo21ssGao", "download_url": "https://picsum.photos/id/15/2500/1667"},
        {"id": "16", "author": "Paul Jarvis", "width": 2500, "height": 1667, "url": "https://unsplash.com/photos/gkT4FfgHO5o", "download_url": "https://picsum.photos/id/16/2500/1667"},
        {"id": "17", "author": "Paul Jarvis", "width": 2500, "height": 1667, "url": "https://unsplash.com/photos/Ven2CV8IJ5A", "download_url": "https://picsum.photos/id/17/2500/1667"},
        {"id": "18", "author": "Paul Jarvis", "width": 2500, "height": 1667, "url": "https://unsplash.com/photos/Ps2n0rShqaM", "download_url": "https://picsum.photos/id/18/2500/1667"},
        {"id": "19", "author": "Paul Jarvis", "width": 2500, "height": 1667, "url": "https://unsplash.com/photos/P7Lh0usGcuk", "download_url": "https://picsum.photos/id/19/2500/1667"}]
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
    // temStr(val) {
    // },
  },
  beforeCreate() {
  }, //生命周期 - 创建之前
  created() {

  },
  beforeMount() {
  }, //生命周期 - 挂载之前
  mounted() {
    this.fetchList();
  },
  //方法集合
  methods: {
    fetchList() {

    }
  },
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
.role-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 5px;

  .role-item {
    width: 32%;
    height: 100px;
    margin-bottom: 5px;

    &:not(:nth-child(3n)) {
      margin-right: 5px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
