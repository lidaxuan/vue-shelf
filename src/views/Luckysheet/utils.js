/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-04-06 15:09:51
 * @FilePath: /vue-shelf/src/views/Luckysheet/utils.js
 */

// Features specially written for demo


// language
function language(params) {
  var lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
  lang = lang.substr(0, 2); //截取lang前2位字符
  return lang;
}
// Tencent Forum Link Button
function supportButton() {
  const text = language() === 'zh' ? '反馈' : 'Forum';
  const link = language() === 'zh' ? 'https://support.qq.com/product/288322' : 'https://groups.google.com/g/luckysheet';
  // document.querySelector("body").insertAdjacentHTML('beforeend', '<a id="container" href="' + link + '" target="_blank" style="z-index:2;width:50px;height:50px;line-height:50px;position:fixed;right:40px;bottom:86px;border-radius:50px;cursor:pointer;background:rgb(71,133,249);color:#fff;text-align:center;text-decoration:none;">' + text + '</a>');
  document.querySelector("body").insertAdjacentHTML('beforeend', '');
}

supportButton()

/**
 * Get url parameters
 */
function getRequest() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    });
  return vars;
}



let filesObj = {};
const files = require.context('./demoData', false, /\.(vue|js)$/);
// 根据文件名组织模块对象
files.keys().map(src => {
  const match = src.match(/\/(.+)\./);
  if (match && match.length >= 1) {
    const name = match[1];
    const moduleValue = files(src);
    if (moduleValue.default) {
      filesObj[name] = moduleValue.default;
    }
  }
});

function isObjArr(value) {
  if (Object.prototype.toString.call(value) === "[object Array]") {
    return 'Array';
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    return 'Object';
  }
  return false;
}

function getFiles(type) {
  if (isObjArr(type) == 'Array') {
    return Object.values(filesObj)
  } else if (isObjArr(type) == 'Object') {
    return filesObj;
  }
  return {}
}

export default {
  language,
  getRequest,
  getFiles
}