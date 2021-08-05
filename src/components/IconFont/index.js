/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-04-27 17:09:44
 * @FilePath: /vue-shelf/src/components/IconFont/index.js
 */
import Load from './load';
import IconFont from './icon';

Load('//at.alicdn.com/t/font_2705060_m17nawa8o8.js');

function install(Vue) {
  Vue.component('IconFont', IconFont);
}

export default {
  install
};

