/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-10-26 17:41:01
 * @FilePath: /vue-shelf/src/directives/waves.js
 */
import './waves.css'

export default {
  bind(el, binding) {
    el.addEventListener('click', e => {
      const customOpts = Object.assign({}, binding.value)
      const opts = Object.assign({}, {
        ele: el, // 波纹作用元素
        type: 'center', // hit点击位置扩散center中心点扩展
        color: 'rgba(0, 0, 0, 0.8)', // 波纹颜色
        duration: 1200
      }, customOpts)
      const target = opts.ele
      if (target) {
        target.style.position = 'relative'
        target.style.overflow = 'hidden'
        const rect = target.getBoundingClientRect()
        let ripple = target.querySelector('.waves-ripple')
        if (!ripple) {
          ripple = document.createElement('span')
          ripple.className = 'waves-ripple'
          ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
          target.appendChild(ripple)
        } else {
          ripple.className = 'waves-ripple'
        }
        // console.log('e.clientX,e.clientY: ' + e.clientX, e.clientY);
        // console.log('e.offsetX,e.offsetY: ' + e.offsetX, e.offsetY);
        // console.log('e.pageX,e.pageY: ' + e.pageX, e.pageY);
        // console.log('e.screenX,e.screenY: ' + e.screenX, e.screenY);
        // console.log('e.layerX,e.layerY: ' + e.layerX, e.layerY);

        switch (opts.type) {
          case 'center':
            ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px'
            ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px'
            break
          default:
            ripple.style.top =
              (e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop ||
                document.body.scrollTop) + 'px'
            ripple.style.left =
              (e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft ||
                document.body.scrollLeft) + 'px'
            ripple.style['transition-duration'] = `${customOpts.duration}ms`;
        }
        ripple.style.backgroundColor = opts.color
        ripple.className = 'waves-ripple z-active'
        setTimeout(() => {
          target.removeChild(ripple);
        }, customOpts.duration || 1200);
        return false
      }
    }, false)
  }
}
