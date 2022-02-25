/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-04-23 16:24:10
 * @FilePath: /vue-shelf/src/directives/loadmore.js
 */
import Vue from 'vue';
Vue.directive('loadmore', {
  bind(el, binding) {
    let p = 0;
    let t = 0;
    let down = true;
    let selectWrap = el.querySelector('.el-table__body-wrapper') || el.querySelector('.infinite-list');
    // console.log(selectWrap.querySelector('tbody'));
    selectWrap.style.position = 'relative';
    
    selectWrap.addEventListener('scroll', function (e) {
      console.log(e);
      //判断是否向下滚动
      p = this.scrollTop;
      // if ( t < p){down=true}else{down=false}
      if (t < p) {
        down = true;
      } else {
        down = false;
      }
      t = p;
      selectWrap.querySelector('table').style.height = 500 + 'px'
  
      binding.value(this.scrollHeight, this.scrollTop, this.clientHeight, el);
      //判断是否到底
      const sign = 0;
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
     
    });
    // selectWrap.style.scrollTop = 200
  }
});
