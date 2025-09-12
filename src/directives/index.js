/* jshint esversion: 6 */
/*
 * @Description:
 * @Author: 李大玄
 * @Date: 2020-12-23 09:51:57
 * @FilePath: /vue-shelf/src/directives/index.vue
 */
// import copy from './copy';
// import longpress from './longpress';
// import debounce from './debounce';
// import emoji from './emoji';
// import LazyLoad from './lazyLoad';
// import waterMarker from './waterMarker';
// import draggable from './draggable';
// import Int from './int';
// import focus from './focus';
// import loadmore from './loadmore';
// import waves from './waves';
// import tableLoadmore from './tableLoadmore';

// const directives = {
//   copy,
//   longpress,
//   debounce,
//   emoji,
//   LazyLoad,
//   waterMarker,
//   draggable,
//   Int,
//   focus,
//   loadmore,
//   waves,
//   tableLoadmore
// };


let directives = {};

// 自动加载该目录下的所有文件
const files = require.context('./', true, /\.(vue|js)$/);

// 根据文件名组织模块对象
files.keys().map(src => {
  const match = src.match(/\/(.+)\./);
  if (match && match.length >= 1) {
    const name = match[1];
    const moduleValue = files(src);
    if (moduleValue.default) {
      directives[name] = moduleValue.default;
    }
  }
});
// console.log(directives);
export default {
  install(Vue) {
    Object.keys(directives || {}).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
}
