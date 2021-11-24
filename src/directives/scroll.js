/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-03 17:57:34
 * @FilePath: /vue-shelf/src/directives/scroll.js
 */

function handleScroll() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  let i = scrollTop;
  let scroll = scrollTop - i;

  if (scrollTop === 0) {
    return;
  }
  console.log({ scroll });
  // 鼠标向上滚动
  if (scroll < 0) {
    console.log('向上');
    // this.heighttop = 70;
  } else { // 鼠标向下滚动
    console.log('向下');
    // this.heighttop = 0;
  }
}

const scroll = {

  bind(el, binding) {
    let i = 0;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    window.addEventListener('scroll', () => {
      let scroll = scrollTop - i;
      i = scrollTop;
      if (scrollTop === 0) {
        return;
      }
      console.log({ scroll });
      // 鼠标向上滚动
      if (scroll < 0) {
        console.log('向上');
        // this.heighttop = 70;
      } else { // 鼠标向下滚动
        console.log('向下');
        // this.heighttop = 0;
      }
    }, true);
  },
  // unbind: function (el) {
  //   window.removeEventListener('scroll', handleScroll)
  // },
}
export default scroll;