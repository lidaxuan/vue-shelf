const horizontalScroll = {
  bind(el, { value }) {
    el.addEventListener('wheel', (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    });
    // const { speed = 5 } = value || {};
    // el.addEventListener('wheel', (e) => {
    //   if (e.deltaY === 0) return;
    //   e.preventDefault();
    //   const delta = Math.sign(e.deltaY) * speed;
    //   el.scrollLeft += delta * 10;
    //   // Boundary detection
    //   if (el.scrollLeft < 0) {
    //     el.scrollLeft = 0;
    //   } else if (el.scrollLeft > el.scrollWidth - el.clientWidth) {
    //     el.scrollLeft = el.scrollWidth - el.clientWidth;
    //   }
    // });
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
  },
};

export default horizontalScroll