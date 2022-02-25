<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-02-08 18:25:08
 * @FilePath: /vue-shelf/src/views/test/scrollView.vue
-->
<template>
  <div class="wmax hmax flex flex-aic flex-ccc">
    <!-- <div class="searchBar" ref="searchBar">
      
      <ul class=""  style="width: 300px; height: 300px; overflow: scroll">
        <li class="w400">区域区域区域区域区域区域区域区域区域区域区域区域区域区域区域区域区域</li>
        <li class="w400">价格价格价格价格价格价格价格价格价格价格价格价格价格价格价格价格价格</li>
        <li class="w400">房型房型房型房型房型房型房型房型房型房型房型房型房型房型房型房型房型</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400">更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多更多</li>
        <li class="w400 bar" style="overflow-x: scroll"></li>
      </ul>
    </div> -->
    <div class="mask"></div>
    <div class="box">
      <div class="header"></div>
      <div class="content"></div>
      <footer></footer>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mounted() {
    this.box = this.$refs.searchBar;
    var $this = this;
    // 监听这个dom的scroll事件
    this.box.onscroll = () => {
      console.log('on scroll');
      $this.handleScroll();
    };
    console.log(this.box.onscroll);
  },
  data() {
    return {
      searchBarFixed: false
    };
  },
  methods: {
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let box = this.$refs.searchBar;
      console.log('box.scrolltop:' + box.scrollTop + ' box.offsetTop:' + box.offsetTop);
    }
  }
};
</script>
<style lang="scss" scope>
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
}
.box {
  width: 300px;
  height: 300px;
  background: pink;
}
.bar {
  height: 30px;
  background: pink;
  // position: fixed;
  bottom: 0;
  left: 0;
}
</style>
