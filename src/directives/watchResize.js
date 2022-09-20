/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-09-19 18:10:08
 * @FilePath: /vue-shelf/src/directives/watchResize.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-09-19 20:59:55
 */


export default {
  bind(el, binding) {
    let timer = null;
    const resizeObserver = new ResizeObserver(entries => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        binding.value && binding.value(entries[0].contentRect);
      }, 300);
    });
    resizeObserver.observe(el);
  },
}