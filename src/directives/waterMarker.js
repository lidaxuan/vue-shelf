/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-27 14:58:17
 * @FilePath: /vue-shelf/src/directives/waterMarker.js
 */
function addWaterMarker(el, binding) {
  // console.log(el);
  const styleMap = el.getBoundingClientRect();
  // 水印文字，父元素，字体，文字颜色
  const width = parseInt(styleMap.width);
  const height = parseInt(styleMap.height);
  let size = '16px Microsoft JhengHei'; //  Microsoft JhengHei
  const bindSize = String(binding.value.size || '');
  if (bindSize && bindSize.indexOf('px') != -1) {
    size = `${bindSize} Microsoft JhengHei`;
  } else if (bindSize) {
    size = `${bindSize}px Microsoft JhengHei`;
  }
  const query = Object.assign({}, {
    text: '李大玄版权所有',
    size: '16px Microsoft JhengHei',
    color: 'rgba(180, 180, 180, 0.3)'
  }, binding.value || {}, { size });
  var can = document.createElement('canvas');
  // el.appendChild(can);
  can.width = width;
  can.height = height;
  // can.style.display = 'none';
  var ctx = can.getContext('2d');
  // ctx.rotate((-20 * Math.PI) / 180);
  ctx.font = query.size;
  const sizeNumber = Number(query.size.split(' ')[0].replace('px', ''));
  ctx.fillStyle = query.color;
  ctx.stokeStyle = 'pink';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'Middle';
  const contentWidth = query.text.length * sizeNumber; // 内容长度
  console.log(contentWidth);
  const contentOffset = 20; // 内容偏移量
  const defaultHeight = 10; // 默认高度
  const xmax = Math.floor(width / (contentWidth + contentOffset));
  console.log(xmax);
  const sizeMap = {
    16: 115,
    18: 120,
    20: 128,
    22: 135,
    24: 140,
    25: 145,
  }
  const ymax = Math.floor(height / defaultHeight);
  for (let i = 0; i < xmax; i++) {
    let edg = ((-20 * Math.PI) / 180).toFixed(2);
    // let edg = -1.57; // 
    if (i == 0) {
      ctx.rotate(edg); // 弧度 = (Math.PI/180)*角度
    } else {
      ctx.rotate(0); // 弧度 = (Math.PI/180)*角度
    }
    for (let j = 0; j < ymax; j++) {
      const XOffset = j % 2 == 1 ? (contentWidth + contentOffset) / 2 : 0;
      const x = ((contentWidth + contentOffset) * i + XOffset) - (j * 50);
      const y = (((contentWidth  + 0) * j + defaultHeight / 2) || defaultHeight / 2);
      ctx.fillText(`${query.text} ${i}${j}`, x + (100 * i), y + (0)); // defaultHeight * i
      // ctx.restore();
    }
  }
  el.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
}


const waterMarker = {
  bind: function (el, binding) {
    process.nextTick(() => addWaterMarker(el, binding));
  },
}

export default waterMarker
