/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-11-12 17:44:02
 * @FilePath: /vue-shelf/src/views/testLoading/loading/eLoading/index.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-12 20:40:46
 */
let BUTTONNDOM = null;
let context = '';
function getNode(event) {
  let domlist = Array.from(event.path);
  for (let i = 0; i < domlist.length; i++) {
    if (domlist[i].tagName == "BUTTON") {
      return domlist[i]
    }
  }
}

// .el-button.is-loading:before {
//   pointer-events: none;
//   content: '';
//   position: absolute;
//   left: -1px;
//   top: -1px;
//   right: -1px;
//   bottom: -1px;
//   border-radius: inherit;
//   background-color: rgba(255, 255, 255, 0.35);
// }
const show = (params) => {
  BUTTONNDOM.setAttribute("style", "cursor: default; pointer-events: none;position: relative;");
  BUTTONNDOM.blur();
  BUTTONNDOM.className += ' is-loading';
  context = BUTTONNDOM.innerHTML;
  BUTTONNDOM.innerHTML = '<i class="el-icon-loading"></i>' + context;
}

const close = (params) => {
  BUTTONNDOM.setAttribute("style", "cursor: pointer; pointer-events: auto;position: relative;");
  BUTTONNDOM.classList.remove("is-loading");
  BUTTONNDOM.innerHTML = context;
  BUTTONNDOM = null;
  context = '';
}

export const eloading = (event) => {
  if (!BUTTONNDOM) {
    BUTTONNDOM = getNode(event);
    show();
  } else {
    close();
  }
}