/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-04-27 17:09:44
 * @FilePath: /vue-shelf/src/components/IconFont/index.js
 */
import Load from './load';
import IconFont from './icon';

Load('//at.alicdn.com/t/font_2481220_2xx8kuodrwk.js');
Load('//at.alicdn.com/t/font_2481220_2xx8kuodrwk.css')
Load(`@font-face {
  font-family: 'iconfont';  /* Project id 1819494 */
  src: url('//at.alicdn.com/t/font_1819494_bzk6om4k8lj.woff2?t=1633760313146') format('woff2'),
       url('//at.alicdn.com/t/font_1819494_bzk6om4k8lj.woff?t=1633760313146') format('woff'),
       url('//at.alicdn.com/t/font_1819494_bzk6om4k8lj.ttf?t=1633760313146') format('truetype');
}`)

Load('//at.alicdn.com/t/font_2705060_m17nawa8o8.js')
Load('//at.alicdn.com/t/font_2705060_m17nawa8o8.css')
Load(`@font-face {
  font-family: 'iconfont';  /* Project id 2705060 */
  src: url('//at.alicdn.com/t/font_2705060_m17nawa8o8.woff2?t=1627541079386') format('woff2'),
       url('//at.alicdn.com/t/font_2705060_m17nawa8o8.woff?t=1627541079386') format('woff'),
       url('//at.alicdn.com/t/font_2705060_m17nawa8o8.ttf?t=1627541079386') format('truetype');
}`)
function install(Vue) {
  Vue.component('IconFont', IconFont);
}

export default {
  install
};

