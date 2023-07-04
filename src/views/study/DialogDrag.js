/*
 * @Description:
 * @Author: 李大玄
 * @Date: 2022-05-09 16:22:24
 * @FilePath: /eachbot-mgrai6-web-view/src/directive/dialogDrag.js
 */
export default {
  name: 'dialogDrag',
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector(".head"); //获取头部元素
    const dragDom = el.querySelector(".modalOn"); //获取 dialog元素
    // cssText 属性用于设置或者返回元素声明的内联样式。
    //dialogHeaderEl.style.cursor = 'move';
    dialogHeaderEl.style.cssText += ";cursor:move;";
    // dragDom.style.cssText += ";top:100px;";

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function() {
      // 判断原生当前style
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr];
      }
      return (dom, attr) => getComputedStyle(dom, false)[attr];

    })();

    dialogHeaderEl.onmousedown = (e) => {
      e.stopPropagation();
      // 鼠标按下，计算当前元素距离可视区的距离  x y轴
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      // body的
      const screenWidth = document.body.clientWidth; // body当前宽度
      const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)
      // 当前dom的
      const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
      const dragDomheight = dragDom.offsetHeight; // 对话框高度
      // 计算拖拽左右偏移距离
      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
      // 计算拖拽上下偏移距离
      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

      // 调用win原生属性进行兼容 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, "left");
      let styT = sty(dragDom, "top");

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes("%")) {
        styL = +document.body.clientWidth * (+styL.replace(/%/g, "") / 100);
        styT = +document.body.clientHeight * (+styT.replace(/%/g, "") / 100);
      } else {
        styL = +styL.replace(/px/g, "");
        styT = +styT.replace(/px/g, "");
      }
      document.onmousemove = function(e) {
        e.stopPropagation();
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft;
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop;
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }
        // dragDom.style.cssText += ';height:'+dragDomheight+'px'
        // console.log( dragDom.style.cssText )
        // 移动当前元素
        dragDom.style.cssText += `;left:${left-10 + styL}px;top:${top-10 + styT}px;`;
      };

      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
};