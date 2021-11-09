/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-02 16:21:15
 * @FilePath: /vue-shelf/src/directives/tableLoadmore.js
 */
const tableLoadmore = {
  bind(el, binding) {
    let p = 0;
    let t = 0;
    let down = true;
    console.log(el);
    el.addEventListener('scroll', function () {
      console.log(11);
      //判断是否向下滚动
      p = this.scrollTop;
      // if ( t < p){down=true}else{down=false}
      if (t < p) {
        down = true;
      } else {
        down = false;
      }
      t = p;
      //判断是否到底
      console.log(down);
      const sign = 0;
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
      if (scrollDistance <= sign && down) {
        binding.value('down');
      } else if (p == 0) {
        binding.value('up');
      }
    });
  }
}
export default tableLoadmore;
// Vue.directive('loadmore',);
