/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2020-12-23 09:51:57
 * @FilePath: /vue-shelf/src/directives/index.js
 */
import copy from './copy';
import longpress from './longpress';
import debounce from './debounce';
import emoji from './emoji';
import LazyLoad from './lazyLoad';
import waterMarker from './waterMarker';
import draggable from './draggable';
import Int from './int';
import focus from './focus';
import loadmore from './loadmore';

const directives = {
  copy,
  longpress,
  debounce,
  emoji,
  LazyLoad,
  waterMarker,
  draggable,
  Int,
  focus,
  loadmore
};

export default {
  install(Vue) {
    Object.keys(directives || {}).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
}